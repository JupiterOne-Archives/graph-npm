export type OrganizationRole = 'developer' | 'admin' | 'owner';

export type Roster = {
  [key: string]: OrganizationRole;
};

export type Teams = string[];

export type PackageAccess = 'read-only' | 'read-write';

export type Packages = {
  [key: string]: PackageAccess;
}