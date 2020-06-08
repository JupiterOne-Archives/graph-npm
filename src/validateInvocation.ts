import {
  IntegrationExecutionContext,
  IntegrationInstance,
} from '@jupiterone/integration-sdk-core';
import getInstanceConfig from './api/helpers/getInstanceConfig';
import listTeams from './api/listTeams';

export default async function validateInvocation(
  context: IntegrationExecutionContext,
): Promise<void> {
  context.logger.info(
    {
      instance: context.instance,
    },
    'Validating integration config...',
  );
  await isConfigurationValid(context.instance);
  context.logger.info('Integration instance is valid!');
}

async function isConfigurationValid(
  instance: IntegrationInstance,
): Promise<boolean> {
  // perform test api call. This will fail if we do not have access.
  getInstanceConfig(instance);
  try {
    await listTeams(instance);
    return true;
  } catch (error) {
    throw new Error('NPM provider API endpoint is unresponsive');
  }
}
