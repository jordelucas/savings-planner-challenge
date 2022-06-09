import { useState, useEffect, useMemo, useCallback } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

import { useSimulation } from '../../hooks/useSimulation';

import Card from '../Card';

import { defaultOptions } from './constants';

const defaultDataSeries =  [
  {
    name: 'Valor Acumulado',
    data: [0],
  },
  {
    name: 'Valor Investido',
    data: [0],
  }
];

export function FinancialProjectionChart() {
  const { projectionData } = useSimulation();

  const [options, setOptions] = useState(defaultOptions);

  const hasData = useMemo(() => !!projectionData, [projectionData]);

  const handleNewChartOptions = useCallback((useDefaultData) => {
    if(useDefaultData) {
      setOptions(prev => ({ ...prev, series: defaultDataSeries }))
      return;
    }

    setOptions(prev => ({
      ...prev,
      series: [
        {
          name: projectionData[0].name,
          data: projectionData[0].data,
        },
        {
          name: projectionData[1].name,
          data: projectionData[1].data,
        }
      ]
    }))
  }, [projectionData]);


  useEffect(() => {
    if(hasData) {
      handleNewChartOptions()
    } else{
      handleNewChartOptions(true)
    };
  }, [hasData, handleNewChartOptions]);

  return (
    <Card title="Projeção Financeira:">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};
