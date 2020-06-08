import { IntegrationInstance } from '@jupiterone/integration-sdk-core';
import getInstanceConfig from './helpers/getInstanceConfig';
import libnpm from 'libnpm';

const listTeamUsers = (
  team: string,
  instance: IntegrationInstance,
): Promise<string[]> => {
  const { accessToken } = getInstanceConfig(instance);
  return libnpm.team.lsUsers(team, { token: accessToken });
};

export default listTeamUsers;
