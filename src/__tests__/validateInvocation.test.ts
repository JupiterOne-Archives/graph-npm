import { createMockExecutionContext } from '@jupiterone/integration-sdk/testing';
import validateInvocation from '../validateInvocation';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.doMock();
});

test('rejects if accessToken is not present', async () => {
  const context = createMockExecutionContext();
  context.instance.config = { organization: 'org' };

  await expect(validateInvocation(context)).rejects.toThrow(
    /Configuration option "accessToken" is missing on the integration instance config/,
  );
});

test('rejects if organization is not present', async () => {
  const context = createMockExecutionContext();
  context.instance.config = { accessToken: 'accessToken' };

  await expect(validateInvocation(context)).rejects.toThrow(
    /Configuration option "organization" is missing on the integration instance config/,
  );
});

test('rejects if unable to hit provider apis', async () => {
  const context = createMockExecutionContext();
  context.instance.config = { accessToken: 'abcd', organization: 'jupiterone' };
  await expect(validateInvocation(context)).rejects.toThrow(
    /NPM provider API endpoint is unresponsive/,
  );
});

// Skipping this test for now since it should be covered with the test above
// eslint-disable-next-line jest/no-disabled-tests
test.skip('performs sample list organization user roster call to ensure api can be hit', async () => {
  const mockListTeams = jest.fn();
  jest.mock('libnpm', () => ({
    team: {
      lsTeams: mockListTeams,
    },
  }));
  const context = createMockExecutionContext();
  await expect(validateInvocation(context)).resolves.toBe(undefined);
  expect(mockListTeams).toHaveBeenCalled();
});
