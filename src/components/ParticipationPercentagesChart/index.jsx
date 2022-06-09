import { useEffect, useState, useCallback, useMemo } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useSimulation } from '../../hooks/useSimulation';

import Card from '../Card';

import { defaultOptions } from './constants'
import { renderDetails } from './utils'

const defaultDataSeries = [
  {
    name: "Investimento Mensal Acumulado",
    y: 0.00,
  },
  {
    name: "Juros",
    y: 0.0,
  },
  {
    name: "Investimento Inicial",
    y: 0.00,
  }
];

export function ParticipationPercentagesChart() {
  const { participationData } = useSimulation();

  const [options, setOptions] = useState(defaultOptions);

  const hasData = useMemo(
    () => participationData?.participation,
    [participationData?.participation],
  );

  const handleNewChartOptions = useCallback((useDefaultData) => {
    if(useDefaultData) {
      setOptions(prev => ({
        ...prev,
        title: {
          text: renderDetails(0,0),
        },
        series: [{ 
          data: defaultDataSeries
        }]
      }))

      return;
    }

    setOptions(prev => ({
      ...prev,
      title: {
        text: renderDetails(
          participationData.accumulatedValue,
          participationData.savedValue,
        ),
      },
      series: [{
        data: participationData?.participation.map((item) => {
          return {
            name: item.description,
            y: item.value,
          }
        })
      }]
    }))
  }, [participationData]);

  useEffect(() => {
    if(hasData) {
      handleNewChartOptions()
    } else{
      handleNewChartOptions(true)
    };
  }, [hasData, handleNewChartOptions]);

  return (
    <Card title="Participação no Valor Acumulado:">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  )
};
