import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk';
import { createIntegrationEntity, Entity } from '@jupiterone/integration-sdk';
import listPackages from '../../api/listPackages';
import { Packages, PackageAccess } from '../../types';

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
          _class: 'Repository',
          id: packageName,
          name: packageName,
          displayName: packageName,
          access,
        },
      },
    });
  });

const fetchPackages: IntegrationStep = {
  id: 'fetch-org-packages',
  name: 'Fetch Organization Packages',
  types: ['npm_package'],
  async executionHandler({
    instance,
    jobState,
  }: IntegrationStepExecutionContext) {
    const packages = await listPackages(instance);
    await jobState.addEntities(convertPackages(packages));
  },
};

export default fetchPackages;
