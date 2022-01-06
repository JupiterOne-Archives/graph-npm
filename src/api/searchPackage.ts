import libnpm from 'libnpm';

import { IntegrationProviderAPIError } from '@jupiterone/integration-sdk-core';
import { retry as attemptRetry, sleep } from '@lifeomic/attempt';

import { Package } from '../types';

type PackageSearchResult = {
  packages: Package[] | undefined;
  err: Error | undefined;
};

type HttpErrorGeneral = Error & {
  headers: Record<string, string[]> & { 'retry-after': string };
  statusCode: number; // 429
  code: string; // "E429"
  method: string;
  uri: string;
};

/**
 * Fetch package metadata details using the NPM registry `GET /-/v1/search`
 * endpoint.
 *
 * The `retry-after` header provides the number of seconds to wait.
 *
 * @see https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md
 */
export async function searchPackage(
  packageName: string,
): Promise<PackageSearchResult> {
  try {
    return await attemptRetry(
      async (): Promise<PackageSearchResult> => {
        const packages = await libnpm.search(packageName);
        return { packages, err: undefined };
      },
      {
        timeout: 60 * 3 * 1000,
        maxAttempts: 1,

        handleError: async (err, context, options) => {
          if (isHttpError(err)) {
            if (err.statusCode === 429) {
              const retryAfterSeconds = Number(err.headers['retry-after']);
              if (retryAfterSeconds) {
                await sleep(retryAfterSeconds * 1000);
                return;
              }
            } else {
              throw new IntegrationProviderAPIError({
                cause: err,
                endpoint: err.uri,
                status: err.statusCode,
                statusText: err.code,
              });
            }
          }
          throw err;
        },
      },
    );
  } catch (err) {
    return { packages: undefined, err };
  }
}

function isHttpError(err: Error | HttpErrorGeneral): err is HttpErrorGeneral {
  return (err as HttpErrorGeneral).statusCode !== undefined;
}
