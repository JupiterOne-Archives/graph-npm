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
  await expect(validateInvocation(context)).rejects.toThrow(
    /NPM provider API endpoint is unresponsive/,
  );
});

test('performs sample list organization user roster call to ensure api can be hit', async () => {
  const mockListUserRoster = jest.fn();
  jest.mock('libnpm', () => ({
    org: {
      ls: mockListUserRoster,
    },
  }));
  const context = createMockExecutionContext();
  await expect(validateInvocation(context)).resolves.toBe(undefined);
  expect(mockListUserRoster).toHaveBeenCalled();
});
