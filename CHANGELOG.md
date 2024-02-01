# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.4.3 - 2024-02-01

### Changed

- Add missing package

## 2.4.2 - 2024-02-01

### Changed

- Format code

## 2.4.1 - 2024-02-01

### Changed

- Upgraded integration

## 2.3.1 - 2022-01-06

### Fixed

- Fixed release build

## 2.3.0 - 2022-01-06

### Added

- Added `429` response handling in NPM registry API calls to fetch package
  metadata details

## 2.2.0 - 2021-07-09

### Changed

- Upgraded `@jupiterone/integration-sdk-*@6.10.0"`

## 1.3.0 - 2020-05-05

### Added

- `npm_team` `HAS` `npm_user` relationships

## 1.2.3 - 2020-05-02

### Changed

- Use `admin` boolean property instead of `isAdmin` on `npm_user` entities

## 1.2.1 - 2020-05-02

### Changed

- Use unscoped name as package `name` so that mapping to code repo will work

## 1.1.1 - 2020-05-01

### Added

- Added `scope` property to `npm_package` entities

## 1.0.0 - 2020-04-27

### Added

- Collection of users from organization user roster.
- Collection of teams from organization.
- Collection of packages from organization.

### Changed

- `instanceConfigFields.json` now specifies an `accessToken` config field.
- `instanceConfigFields.json` now specifies an `organization` config field.
