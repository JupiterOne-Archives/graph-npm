import {
  Recording,
  executeStepWithDependencies,
  setupRecording,
} from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfig } from '../../../test';

describe('fetch-org-packages', () => {
  let recording: Recording;
  afterEach(async () => {
    if (recording) await recording.stop();
  });

  jest.setTimeout(999999);

  test('fetch-org-packages', async () => {
    recording = setupRecording({
      name: 'packages',
      directory: __dirname,
      redactedRequestHeaders: ['api-key'],
      options: {
        recordFailedRequests: true,
        matchRequestsBy: {
          url: {
            query: false,
          },
        },
      },
    });

    const stepTestConfig = buildStepTestConfig('fetch-org-packages');

    const stepResults = await executeStepWithDependencies(stepTestConfig);
    expect(stepResults.collectedRelationships.length).toBeGreaterThan(0);
  }, 500_000);
});
