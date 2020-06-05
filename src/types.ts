export type OrganizationRole = 'developer' | 'admin' | 'owner';

export type Roster = {
  [key: string]: OrganizationRole;
};

export type User = {
  username: string;
  email: string;
};

export type Teams = string[];

export type PackageAccess = 'read-only' | 'read-write';

export type Packages = {
  [key: string]: PackageAccess;
};

export type Package = {
  name: string;
  scope: string;
  version: string;
  description: string;
  date: string;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  publisher: User;
  maintainers: User[];
};

export interface NpmIntegrationConfig {
  accessToken: string;
  organization: string;
}
