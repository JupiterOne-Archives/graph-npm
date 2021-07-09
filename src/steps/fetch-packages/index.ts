import {
  IntegrationStep,
  convertProperties,
  RelationshipDirection,
  Relationship,
  RelationshipClass,
  createMappedRelationship,
} from '@jupiterone/integration-sdk-core';
import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import listPackages from '../../api/listPackages';
import searchPackage from '../../api/searchPackage';
import { Packages, PackageAccess, NpmIntegrationConfig } from '../../types';

type Package = {
  name: string;
  access: PackageAccess;
};

const convertPackages = (packages: Packages): Entity[] =>
  Object.keys(packages).map((packageName) => {
    const access = packages[packageName];
    const npmPackage: Package = {
      name: packageName,
      access,
    };

    return createIntegrationEntity({
      entityData: {
        source: npmPackage,
        assign: {
          _key: `npm-package:${packageName}`,
          _type: 'npm_package',
          _class: 'CodeModule',
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
      _class: 'CodeModule',
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
  async executionHandler({ instance, jobState }) {
    const packages = await listPackages(instance);
    const packageEntities = convertPackages(packages);
    const packageRepoRelationships: Relationship[] = [];

    for (const p of packageEntities) {
      // Search for package via public search endpoint by package name.
      // If found, the package is public.
      const searchResults = await searchPackage(p.displayName as string);
      const found = searchResults.find((pkg) => pkg.name === p.displayName);
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

      packageRepoRelationships.push(
        createMappedRelationship({
          _class: RelationshipClass.PUBLISHED,
          _mapping: {
            relationshipDirection: RelationshipDirection.REVERSE,
            sourceEntityKey: p._key,
            targetFilterKeys: [['_class', 'name', 'owner']],
            targetEntity: {
              _class: 'CodeRepo',
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

    await jobState.addEntities(packageEntities);
    await jobState.addRelationships(packageRepoRelationships);
  },
};

export default fetchPackages;
