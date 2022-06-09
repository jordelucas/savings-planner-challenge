import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Serie {
    name: String,
    data: [Float],
  }

  type Simulation {
    initialInvestment: Float,
    installmentValue: Float,
    period: Int,
    interestRate: Float,
    investedValue: Float,
    accumulatedValue: Float,
    dataSeries: [Serie]
  }

  type Participation {
    description: String
    percentage: Float
    value: Float
  }

  type ParticipationPercentages {
    participation: [Participation]
    accumulatedValue: Float,
    savedValue: Float
  }

  type Query {
    getFinancialProjection: [Serie]
    getParticipationPercentages: ParticipationPercentages
  }

  type Mutation {
    generateSimulation(
      initialInvestment: Float!,
      installmentValue: Float!,
      period: Int!,
      interestRate: Float!
    ): Simulation
  }
`;
