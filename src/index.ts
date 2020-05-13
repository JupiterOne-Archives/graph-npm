import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk';

import instanceConfigFields from './instanceConfigFields';
import validateInvocation from './validateInvocation';

import fetchPackages from './steps/fetch-packages';
import fetchTeams from './steps/fetch-teams';
import fetchUserRoster from './steps/fetch-user-roster';

export const invocationConfig: IntegrationInvocationConfig = {
  instanceConfigFields,
  validateInvocation,
  integrationSteps: [fetchPackages, fetchTeams, fetchUserRoster],
};
