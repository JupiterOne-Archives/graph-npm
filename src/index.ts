import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';

import validateInvocation from './validateInvocation';

import fetchPackages from './steps/fetch-packages';
import fetchTeams from './steps/fetch-teams';
import fetchUserRoster from './steps/fetch-user-roster';
import { NpmIntegrationConfig } from './types';

export const invocationConfig: IntegrationInvocationConfig<NpmIntegrationConfig> =
  {
    instanceConfigFields: {
      accessToken: {
        type: 'string',
        mask: true,
      },
      organization: {
        type: 'string',
        mask: false,
      },
    },
    validateInvocation,
    integrationSteps: [fetchPackages, fetchTeams, fetchUserRoster],
  };
