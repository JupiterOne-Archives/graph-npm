import {
  createMockStepExecutionContext,
  MockIntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-testing';
import { NpmIntegrationConfig } from '../src/types';

export function createStepContext(): MockIntegrationStepExecutionContext<
  NpmIntegrationConfig
> {
  return createMockStepExecutionContext<NpmIntegrationConfig>({
    instanceConfig: {
      accessToken: process.env.ACCESS_TOKEN || 'accessToken',
      organization: process.env.ORGANIZATION || 'jupiterone',
    },
  });
}
