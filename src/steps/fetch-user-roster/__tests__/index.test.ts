import { createStepContext } from 'test';
import { Recording, setupRecording } from '@jupiterone/integration-sdk/testing';
import step from '..';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test('should fetch user roster belonging to an organization', async () => {
  recording = setupRecording({
    name: 'user_roster',
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
  expect(context.jobState.collectedEntities).toHaveLength(10);

  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['User'],
        _type: 'npm_user',
        _key: 'npm-user:aiwilliams',
        name: 'aiwilliams',
        displayName: 'aiwilliams',
        id: 'aiwilliams',
        role: 'owner',
        isAdmin: true,
      }),
    ]),
  );
});
