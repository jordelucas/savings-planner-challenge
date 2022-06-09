import { gql } from '@apollo/client';

export const GENERATE_SIMULATION = gql`
  mutation (
    $period: Int!,
    $interestRate: Float!,
    $installmentValue: Float!,
    $initialInvestment: Float!,
  ) {
    generateSimulation(
      initialInvestment: $initialInvestment,
      installmentValue: $installmentValue,
      period: $period,
      interestRate: $interestRate
    ) {
      initialInvestment
      installmentValue
      period
      interestRate
      investedValue
      accumulatedValue
      dataSeries {
        name
        data
      }
    }
  }
`;