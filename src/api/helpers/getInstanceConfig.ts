import { IntegrationInstance } from '@jupiterone/integration-sdk-core';

type InstanceConfig = {
  accessToken?: string;
  organization?: string;
};

function getInstanceConfig(instance: IntegrationInstance): InstanceConfig {
  const { accessToken, organization }: InstanceConfig = instance.config || {};

  if (!accessToken) {
    throw new Error(
      'Configuration option "accessToken" is missing on the integration instance config',
    );
  }
  if (!organization) {
    throw new Error(
      'Configuration option "organization" is missing on the integration instance config',
    );
  }
  return { accessToken, organization };
}

export default getInstanceConfig;
