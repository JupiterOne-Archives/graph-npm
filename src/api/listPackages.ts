
import { IntegrationInstance } from '@jupiterone/integration-sdk';
import getInstanceConfig from './helpers/getInstanceConfig';
import libnpm from 'libnpm';
import { Packages } from '../types';

const listPackages = (instance: IntegrationInstance): Promise<Packages> => {
  const { accessToken, organization } = getInstanceConfig(instance);
  return libnpm.access.lsPackages(organization, { token: accessToken });
};

export default listPackages;
