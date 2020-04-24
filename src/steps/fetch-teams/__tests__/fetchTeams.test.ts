import { Polly, setupPolly, createStepContext } from 'test';
import fetchTeams from '../fetchTeams';

let polly: Polly;

afterEach(async () => {
  await polly.stop();
});

test('should fetch teams belonging to an organization', async () => {
  polly = setupPolly(__dirname, 'teams');

  const context = createStepContext();
  await fetchTeams.executionHandler(context);
  expect(context.jobState.collectedEntities).toHaveLength(1);

  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['Group'],
        _type: 'npm_team',
        _key: 'npm-team:lifeomic:readonly-developers',
        name: 'lifeomic:readonly-developers',
        displayName: 'lifeomic:readonly-developers',
        id: 'lifeomic:readonly-developers',
      }),
    ]),
  );
});
