import * as dotenv from 'dotenv';
import path from 'path';
import { invocationConfig } from '../src';
import { NpmIntegrationConfig } from '../src/types';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

export const testingConfig = {
  accessToken: process.env.ACCESS_TOKEN || 'accessToken',
  organization: process.env.ORGANIZATION || 'jupiterone',
} as NpmIntegrationConfig;

export function buildStepTestConfig(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: testingConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
