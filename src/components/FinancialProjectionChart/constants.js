import { currencyFormatter } from '../../utils/currencyFormatter';

export const defaultOptions = {
  chart: {
    type: 'spline',
  },

  colors: ['#09B682', '#868686'],
  
  title: {
    text: ''
  },

  credits: {
    enabled: false
  },

  tooltip: {
    shared: true,
    crosshairs: true,
    formatter: function () {
      return this.points.reduce(function (s, point) {
        return (
          s + '<br/><b>' + String(point.series.name).replace('Valor ', '') + ': </b>' + currencyFormatter(point.y)
        );
      }, '<b>Mês: </b>' + this.x);
    },
  },
  
  plotOptions: {
    series: {
      marker: {
        enabled: false,
        fillColor: '#FFFFFF',
        lineWidth: 2,
        lineColor: null
      }
    }
  },

  yAxis: {
    title: {
      text: ''
    },
    opposite: true,
    alignTicks: true,
    labels: {
      formatter: function() {
        return currencyFormatter(this.value);
      }
    },
  },

  xAxis: {
    labels: {
      format: 'Mês {text}',
    },
  },

  series: [
    {
      name: 'Valor Acumulado',
      data: [0],
    },
    {
      name: 'Valor Investido',
      data: [0],
    }
  ]
};