import { createStepContext } from 'test';
import { Recording, setupRecording } from '@jupiterone/integration-sdk/testing';
import step from '..';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test('should fetch packages belonging to an organization', async () => {
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

  const context = createStepContext();
  await step.executionHandler(context);
  expect(context.jobState.collectedEntities).toHaveLength(55);
  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['CodeModule'],
        _type: 'npm_package',
        _key: 'npm-package:@jupiterone/data-model',
        name: '@jupiterone/data-model',
        displayName: '@jupiterone/data-model',
        id: '@jupiterone/data-model',
        access: 'read-write',
        scope: 'jupiterone',
        public: true,
      }),
    ]),
  );
});
