import { gql } from '@apollo/client';

export const GET_FINANCIAL_PROJECTION = gql`
  query {
    getFinancialProjection {
      name
      data
    }
  }
`;

export const GET_PARTICIPATION_PERCENTAGES = gql`
  query {
    getParticipationPercentages {
      accumulatedValue
      savedValue
      participation {
        description
        percentage
        value
      }
    }
  }
`;