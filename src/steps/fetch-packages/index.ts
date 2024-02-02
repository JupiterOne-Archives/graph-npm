import {
  convertProperties,
  createIntegrationEntity,
  createMappedRelationship,
  Entity,
  IntegrationError,
  IntegrationStep,
  RelationshipClass,
  RelationshipDirection,
} from '@jupiterone/integration-sdk-core';

import listPackages from '../../api/listPackages';
import { searchPackage } from '../../api/searchPackage';
import { NpmIntegrationConfig, Packages } from '../../types';

const convertPackages = (packages: Packages): Entity[] =>
  Object.keys(packages).map((packageName) => {
    const access = packages[packageName];

    return createIntegrationEntity({
      entityData: {
        source: {
          name: packageName,
          access,
        },
        assign: {
          _key: `npm-package:${packageName}`,
          _type: 'npm_package',
          _class: ['CodeModule'],
          id: packageName,
          name: packageName.slice(packageName.indexOf('/') + 1),
          scope: packageName.startsWith('@')
            ? packageName.slice(1, packageName.indexOf('/'))
            : undefined,
          displayName: packageName,
          access,
        },
      },
    });
  });

const fetchPackages: IntegrationStep<NpmIntegrationConfig> = {
  id: 'fetch-org-packages',
  name: 'Fetch Organization Packages',
  entities: [
    {
      resourceName: 'Package',
      _type: 'npm_package',
      _class: ['CodeModule'],
    },
  ],
  relationships: [
    {
      _type: 'repo_published_npm_package',
      sourceType: 'CodeRepo',
      _class: RelationshipClass.PUBLISHED,
      targetType: 'npm_package',
    },
  ],
  async executionHandler({ instance, jobState, logger }) {
    const packages = await listPackages(instance);
    const packageEntities = convertPackages(packages);

    const searchErrors: Error[] = [];
    for (const p of packageEntities) {
      const searchResults = await searchPackage(p.displayName as string);
      if (searchResults.err) {
        logger.error(
          { package: p, err: searchResults.err },
          'Error fetching package details',
        );
        searchErrors.push(searchResults.err);
      }

      const found = searchResults.packages?.find(
        (pkg) => pkg.name === p.displayName,
      );

      if (found) {
        Object.assign(p, {
          ...convertProperties(found),
          name: found.name.slice(found.name.indexOf('/') + 1),
          public: true,
          publisher: found.publisher.username,
          publisherEmail: found.publisher.email,
          maintainers: found.maintainers.map((m) => m.username),
          maintainerEmails: found.maintainers.map((m) => m.email),
        });
      }

      await jobState.addEntity(p);
      await jobState.addRelationship(
        createMappedRelationship({
          _class: RelationshipClass.PUBLISHED,
          _mapping: {
            relationshipDirection: RelationshipDirection.REVERSE,
            sourceEntityKey: p._key,
            targetFilterKeys: [['_class', 'name', 'owner']],
            targetEntity: {
              _class: ['CodeRepo'],
              name: p.name as string,
              owner: instance.config.organization,
            },
            skipTargetCreation: true,
          },
          properties: {
            _type: 'repo_published_npm_package',
            _key: `repo:published:${p._key}`,
          },
        }),
      );
    }

    if (searchErrors.length) {
      throw new IntegrationError({
        code: 'NPM_API_ERROR',
        message: `Completed processing ${packageEntities.length} total packages; ${searchErrors.length} errors occurred (cause is first one)`,
        cause: searchErrors[0],
        fatal: false,
      });
    }
  },
};

export default fetchPackages;
