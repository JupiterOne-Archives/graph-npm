import { Polly, setupPolly, createStepContext } from 'test';
import fetchUserRoster from '../fetchUserRoster';

let polly: Polly;

afterEach(async () => {
  await polly.stop();
});

test('should fetch user roster belonging to an organization', async () => {
  polly = setupPolly(__dirname, 'user_roster');

  const context = createStepContext();
  await fetchUserRoster.executionHandler(context);
  expect(context.jobState.collectedEntities).toHaveLength(81);

  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['User'],
        _type: 'npm_user',
        _key: 'npm-user:bbrewer',
        name: 'bbrewer',
        displayName: 'bbrewer',
        id: 'bbrewer',
        role: 'developer',
        isAdmin: false,
      }),
    ]),
  );
});
