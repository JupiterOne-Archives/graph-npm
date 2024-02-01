import { buildStepTestConfig } from '../../../test';
import {
  Recording,
  executeStepWithDependencies,
  setupRecording,
} from '@jupiterone/integration-sdk-testing';

describe('fetch-org-teams', () => {
  let recording: Recording;

  afterEach(async () => {
    if (recording) await recording.stop();
  });

  test('fetch-org-teams', async () => {
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

    const stepTestConfig = buildStepTestConfig('fetch-org-teams');

    const result = await executeStepWithDependencies(stepTestConfig);
    expect(result).toMatchStepMetadata(stepTestConfig);
  });
});
