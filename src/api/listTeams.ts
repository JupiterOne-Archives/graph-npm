import { IntegrationInstance } from '@jupiterone/integration-sdk';
import getInstanceConfig from './helpers/getInstanceConfig';
import libnpm from 'libnpm';
import { Teams } from '../types';

const listTeams = (instance: IntegrationInstance): Promise<Teams> => {
  const { accessToken, organization } = getInstanceConfig(instance);
  return libnpm.team.lsTeams(organization, { token: accessToken });
};

export default listTeams;
