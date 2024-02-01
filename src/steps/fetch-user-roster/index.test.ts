import { buildStepTestConfig } from '../../../test';
import {
  Recording,
  executeStepWithDependencies,
  setupRecording,
} from '@jupiterone/integration-sdk-testing';

describe('fetch-org-users', () => {
  let recording: Recording;

  afterEach(async () => {
    if (recording) await recording.stop();
  });

  test('fetch-org-users', async () => {
    recording = setupRecording({
      name: 'packages',
      directory: __dirname,
      redactedRequestHeaders: ['api-key'],
      options: {
        recordFailedRequests: false,
        matchRequestsBy: {
          url: {
            query: false,
          },
        },
      },
    });

    const stepTestConfig = buildStepTestConfig('fetch-org-users');

    const result = await executeStepWithDependencies(stepTestConfig);
    expect(result).toMatchStepMetadata(stepTestConfig);
  });
});
