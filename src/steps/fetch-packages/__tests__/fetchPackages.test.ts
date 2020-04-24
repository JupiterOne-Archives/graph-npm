import { Polly, setupPolly, createStepContext } from 'test';
import fetchPackages from '../fetchPackages';

let polly: Polly;

afterEach(async () => {
  await polly.stop();
});

test('should fetch teams belonging to an organization', async () => {
  polly = setupPolly(__dirname, 'teams');

  const context = createStepContext();
  await fetchPackages.executionHandler(context);
  expect(context.jobState.collectedEntities).toHaveLength(140);
  expect(context.jobState.collectedEntities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _class: ['Repository'],
        _type: 'npm_package',
        _key: 'npm-package:@lifeomic/snyk',
        name: '@lifeomic/snyk',
        displayName: '@lifeomic/snyk',
        id: '@lifeomic/snyk',
        access: 'read-write'
      }),
    ]),
  );
});
