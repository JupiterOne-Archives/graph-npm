import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';

import instanceConfigFields from './instanceConfigFields';
import validateInvocation from './validateInvocation';

import fetchPackages from './steps/fetch-packages';
import fetchTeams from './steps/fetch-teams';
import fetchUserRoster from './steps/fetch-user-roster';
import { NpmIntegrationConfig } from './types';

export const invocationConfig: IntegrationInvocationConfig<NpmIntegrationConfig> = {
  instanceConfigFields,
  validateInvocation,
  integrationSteps: [fetchPackages, fetchTeams, fetchUserRoster],
};
