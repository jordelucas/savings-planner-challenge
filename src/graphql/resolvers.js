import {
  annualToMonthlyInterestRate
} from '../utils/annualToMonthlyInterestRate';
import {
  sortParticipationByPercentage
} from '../utils/sortParticipationByPercentage';

function getAccumulatedMonthlyInvestmentData() {
  const { investedValue, initialInvestment, accumulatedValue } = data;

  const accumulatedMonthlyInvestmentValue = investedValue - initialInvestment;

  return {
    description: 'Investimento Mensal Acumulado',
    percentage: accumulatedValue ? (accumulatedMonthlyInvestmentValue/accumulatedValue).toFixed(4) : 0,
    value: accumulatedMonthlyInvestmentValue.toFixed(2),
  }
};

function getCompoundInterestData() {
  const { accumulatedValue, investedValue } = data;

  const compoundInterestValue = accumulatedValue - investedValue;

  return {
    description: 'Juros',
    percentage: accumulatedValue ? (compoundInterestValue/accumulatedValue).toFixed(4) : 0,
    value: compoundInterestValue.toFixed(2),
  }
}

function getInitialInvestmentData() {
  const { initialInvestment, accumulatedValue } = data;

  return {
    description: 'Investimento Inicial',
    percentage: accumulatedValue ? (initialInvestment/accumulatedValue).toFixed(4) : 0,
    value: initialInvestment.toFixed(2),
  }
}

function getSavedValue() {
  const { initialInvestment, installmentValue, period } = data;

  return (initialInvestment + installmentValue * period).toFixed(2);
}

let data = {};

export const resolvers = {
  Query: {
    getFinancialProjection: () => {
      return data.dataSeries;
    },
    getParticipationPercentages: () => {
      if(!data.dataSeries) {
        return {};
      }

      const { accumulatedValue } = data;
      
      const savedValue = getSavedValue(); 

      const participation = [
        getInitialInvestmentData(),
        getAccumulatedMonthlyInvestmentData(),
        getCompoundInterestData(),
      ].sort(sortParticipationByPercentage);

      const result = {
        accumulatedValue: accumulatedValue.toFixed(2), 
        savedValue,
        participation,
      }

      return result ?? {};
    },
  },
  Mutation: {
    generateSimulation: (_, {
      initialInvestment,
      installmentValue,
      period,
      interestRate,
    }) => {
      let investedSeries = [];
      let accumulatedSeries = [];

      const monthlyInterestRate = annualToMonthlyInterestRate(interestRate);

      const serializedValues = Array(period).fill().reduce((prev) => {
        const monetizationInCurrentMonth = prev.accumulated * monthlyInterestRate;
        
        const invested = prev.invested + installmentValue;
        const accumulated = prev.accumulated + installmentValue + monetizationInCurrentMonth;
        
        investedSeries.push(invested)
        accumulatedSeries.push(accumulated)
      
        return {
          accumulated,
          invested,
        };
      }, {
        accumulated: initialInvestment,
        invested: initialInvestment,
      });

      investedSeries.unshift(initialInvestment)
      accumulatedSeries.unshift(initialInvestment)

      const dataSeries = [
        {
          name: 'Valor Acumulado',
          data: accumulatedSeries,
        },
        {
          name: 'Valor Investido',
          data: investedSeries,
        },
      ];

      data = {
        period,
        dataSeries,
        interestRate,
        installmentValue,
        initialInvestment,
        investedValue: serializedValues.invested,
        accumulatedValue: serializedValues.accumulated,
      };

      return data;
    }
  }
}