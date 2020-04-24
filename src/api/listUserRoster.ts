import { IntegrationInstance } from '@jupiterone/integration-sdk';
import getInstanceConfig from './helpers/getInstanceConfig';
import libnpm from 'libnpm';
import { Roster } from '../types';

const listUserRoster = (instance: IntegrationInstance): Promise<Roster> => {
  const { accessToken, organization } = getInstanceConfig(instance);
  return libnpm.org.ls(organization, { token: accessToken });
};

export default listUserRoster;
