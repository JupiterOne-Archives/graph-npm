import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk';
import listTeams from '../../api/listTeams';
import { createIntegrationEntity, Entity } from '@jupiterone/integration-sdk';
import { Teams } from '../../types';

const convertTeams = (teams: Teams): Entity[] =>
  teams.map((team) => {
    return createIntegrationEntity({
      entityData: {
        source: { team },
        assign: {
          _key: `npm-team:${team}`,
          _type: 'npm_team',
          _class: ['UserGroup'],
          id: team,
          name: team,
          displayName: team,
        },
      },
    });
  });

const fetchTeams: IntegrationStep = {
  id: 'fetch-org-teams',
  name: 'Fetch Organization Teams',
  types: ['npm_team'],
  async executionHandler({
    instance,
    jobState,
  }: IntegrationStepExecutionContext) {
    const teams = await listTeams(instance);
    await jobState.addEntities(convertTeams(teams));
  },
};

export default fetchTeams;
