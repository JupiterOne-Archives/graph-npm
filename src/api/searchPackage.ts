import libnpm from 'libnpm';
import { Package } from '../types';

const searchPackage = (packageName: string): Promise<Package[]> => {
  return libnpm.search(packageName);
};

export default searchPackage;
