import { IntegrationInstanceConfigFieldMap } from '@jupiterone/integration-sdk';

const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  accessToken: {
    type: 'string',
    mask: true,
  },
  organization: {
    type: 'string',
    mask: false,
  },
};

export default instanceConfigFields;
