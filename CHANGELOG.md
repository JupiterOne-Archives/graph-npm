# v2.4.5 (Fri Feb 02 2024)

#### 🐛 Bug Fix

- INT-10226: upgrade integration [#55](https://github.com/JupiterOne/graph-npm/pull/55) ([@gastonyelmini](https://github.com/gastonyelmini))
- Merged via j1-codeowners-automation-v1.0.0 [#49](https://github.com/JupiterOne/graph-npm/pull/49) ([@erichs](https://github.com/erichs))
- Merged via j1-codeowners-automation-v1.0.0 [#46](https://github.com/JupiterOne/graph-npm/pull/46) ([@erichs](https://github.com/erichs))
- Chore fix build release [#40](https://github.com/JupiterOne/graph-npm/pull/40) ([@aiwilliams](https://github.com/aiwilliams))
- v2.3.0 [#39](https://github.com/JupiterOne/graph-npm/pull/39) ([@aiwilliams](https://github.com/aiwilliams))
- Handle rate limit error and retry [#35](https://github.com/JupiterOne/graph-npm/pull/35) ([@aiwilliams](https://github.com/aiwilliams))
- Upgrade @jupiterone/integration-sdk-*@6.10.0 [#20](https://github.com/JupiterOne/graph-npm/pull/20) ([@ndowmon](https://github.com/ndowmon))
- Add template sections [#18](https://github.com/JupiterOne/graph-npm/pull/18) ([@jayson-jensen-pro](https://github.com/jayson-jensen-pro))
- deprecate set-env [#17](https://github.com/JupiterOne/graph-npm/pull/17) ([@mknoedel](https://github.com/mknoedel))
- Upgrade to 2.2.0 [#15](https://github.com/JupiterOne/graph-npm/pull/15) ([@ctdio](https://github.com/ctdio))
- Upgrading to latest integration sdk [#14](https://github.com/JupiterOne/graph-npm/pull/14) (darrius.wright@lifeomic.com)
- Add index file and upgrade to sdk 1.0.0 [#13](https://github.com/JupiterOne/graph-npm/pull/13) ([@ctdio](https://github.com/ctdio))
- fix types [#12](https://github.com/JupiterOne/graph-npm/pull/12) ([@erkangz](https://github.com/erkangz))
- Add npm team-has->user relationships [#11](https://github.com/JupiterOne/graph-npm/pull/11) ([@erkangz](https://github.com/erkangz))
- use "admin" boolean instead of "isAdmin" [#10](https://github.com/JupiterOne/graph-npm/pull/10) ([@erkangz](https://github.com/erkangz))
- use unscoped name as package name so that mapping to code repo will work [#9](https://github.com/JupiterOne/graph-npm/pull/9) ([@erkangz](https://github.com/erkangz))
- fix exec steps [#8](https://github.com/JupiterOne/graph-npm/pull/8) ([@erkangz](https://github.com/erkangz))
- Upgrade sdk [#7](https://github.com/JupiterOne/graph-npm/pull/7) ([@erkangz](https://github.com/erkangz))
- Pkg owner [#6](https://github.com/JupiterOne/graph-npm/pull/6) ([@erkangz](https://github.com/erkangz))
- Add deploy action [#5](https://github.com/JupiterOne/graph-npm/pull/5) ([@aiwilliams](https://github.com/aiwilliams))
- Publish public [#4](https://github.com/JupiterOne/graph-npm/pull/4) ([@aiwilliams](https://github.com/aiwilliams))
- Publish v1.0.0 [#3](https://github.com/JupiterOne/graph-npm/pull/3) ([@ctdio](https://github.com/ctdio))
- search for public npm package; create mapped relationship to code repo; add docs [#2](https://github.com/JupiterOne/graph-npm/pull/2) ([@erkangz](https://github.com/erkangz))

#### ⚠️ Pushed to `main`

- Fix x-cortex-service-groups where tier-4 was set incorrectly ([@jablonnc](https://github.com/jablonnc))
- Populate CODEOWENRS, baseline package.json and baseline cortex.yaml ([@jablonnc](https://github.com/jablonnc))
- v0.1.0 ([@erkangz](https://github.com/erkangz))
- update gitleaks config ([@erkangz](https://github.com/erkangz))
- add .gitleaks.toml custom config ([@erkangz](https://github.com/erkangz))
- revert replay mode ([@erkangz](https://github.com/erkangz))
- fix CI test ([@erkangz](https://github.com/erkangz))
- fix tests ([@erkangz](https://github.com/erkangz))
- fix type reference in sync steps ([@erkangz](https://github.com/erkangz))
- update to sdk 0.11, added gitleaks ([@BenBrewerBowman](https://github.com/BenBrewerBowman))
- npm integration consume users, groups, packages ([@BenBrewerBowman](https://github.com/BenBrewerBowman))

#### Authors: 11

- Adam Williams ([@aiwilliams](https://github.com/aiwilliams))
- Ben Brewer ([@BenBrewerBowman](https://github.com/BenBrewerBowman))
- Charlie Duong ([@ctdio](https://github.com/ctdio))
- Darrius Wright ([@softwarewright](https://github.com/softwarewright))
- Erich Smith ([@erichs](https://github.com/erichs))
- Erkang Zheng ([@erkangz](https://github.com/erkangz))
- Gaston Yelmini ([@gastonyelmini](https://github.com/gastonyelmini))
- Jayson Jensen ([@jayson-jensen-pro](https://github.com/jayson-jensen-pro))
- Michael Knoedel ([@mknoedel](https://github.com/mknoedel))
- Nick Dowmon ([@ndowmon](https://github.com/ndowmon))
- Noah Jablonski ([@jablonnc](https://github.com/jablonnc))

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.4.4 - 2024-02-02

### Changed

- Fix build

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
