import { createStepContext } from 'test';
import { Recording, setupRecording } from '@jupiterone/integration-sdk/testing';
import fetchTeams from '../fetchTeams';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test('should fetch teams belonging to an organization', async () => {
  recording = setupRecording({
    name: 'teams',
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
  await fetchTeams.executionHandler(context);
  expect(context.jobState.collectedEntities).toHaveLength(2);

  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['UserGroup', 'Team'],
        _type: 'npm_team',
        _key: 'npm-team:jupiterone:developers',
        name: 'jupiterone:developers',
        displayName: 'jupiterone:developers',
        id: 'jupiterone:developers',
      }),
      expect.objectContaining({
        _class: ['UserGroup', 'Team'],
        _type: 'npm_team',
        _key: 'npm-team:jupiterone:readonly-integration-developers',
        name: 'jupiterone:readonly-integration-developers',
        displayName: 'jupiterone:readonly-integration-developers',
        id: 'jupiterone:readonly-integration-developers',
      }),
    ]),
  );
});
