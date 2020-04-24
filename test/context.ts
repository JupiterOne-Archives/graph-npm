import { createMockStepExecutionContext } from '@jupiterone/integration-sdk/testing';

export function createStepContext(): ReturnType<
  typeof createMockStepExecutionContext
> {
  return createMockStepExecutionContext({
    instanceConfig: {
      accessToken: process.env.ACCESS_TOKEN || 'accessToken',
      organization: process.env.ORGANIZATION || 'myOrg',
    },
  });
}
