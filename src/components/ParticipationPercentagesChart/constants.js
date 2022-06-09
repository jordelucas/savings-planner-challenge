import { currencyFormatter } from "../../utils/currencyFormatter";
import { percentFormatter } from "../../utils/percentFormatter";

import { renderDetails } from "./utils";

export const defaultOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    events: {
      render: function() {
        this.title.attr({ 
          y: 
            (this.plotHeight / 2) - 
            (this.title.getBBox().height / 2) +
            this.plotTop +
            parseInt(this.title.styles.fontSize) 
         });
      },
    }
  },

  colors: ['#21A3ED', '#7B1CF3', '#07CC6D'],

  title: {
    useHTML: true,
    floating: true,
    text: `
      <div class='w-44 h-44 flex flex-col items-center justify-center text-center leading-6 shadow-3xl rounded-full my-auto'>
        <div>
          <h3 class='font-normal text-xs text-gray-700'>Valor Acumulado</h3>
          <h4 class='font-semibold text-black-900'>${currencyFormatter(0)}</h4>
        </div>
        <div class='mt-2'>
          <h3 class='font-normal text-xs text-gray-700'>Você terá poupado</h3>
          <h4 class='font-normal text-xs text-black-900'>${currencyFormatter(0)}</h4>
        </div>
      </div>
    `,
  },

  tooltip: {
    pointFormatter: function () {
      return '<b>' + percentFormatter(this.percentage) + '</b>';
    }
  },
  
  plotOptions: {
    pie: {
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },

  credits: {
    enabled: false
  },
  
  legend: {
    useHTML: true,
    layout: 'vertical',
    align: 'center',
    verticalAlign: 'bottom',
    labelFormatter: function () {
      return `
        <div class='flex flex-col w-64 mb-2'>
          <span class='font-normal text-xs'>${this.name}</span>
          <div class='flex'>
            <span class='font-medium text-xs text-gray-700 mr-auto'>
              ${currencyFormatter(this.y)}
            </span> 
            <span class='font-normal text-xs'>
              ${percentFormatter(this.percentage)}
            </span> 
          <div/>
        </div>
      `;
    },
  },

  series: [
    {
      colorByPoint: true,
      innerSize: '85%',
      borderWidth: 5,
      borderColor: '#fff',
      slicedOffset: 0,
      ignoreHiddenPoint: false,
      data: [
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
      ],
    }
  ],
};

      // data: [
      //   {
      //     "name": "Investimento Mensal Acumulado",
      //     "y": 120000.00,
      //     "color": "#21A3ED"
      //   },
      //   {
      //     "name": "Juros",
      //     "y": 83302.77,
      //     "color": "#7B1CF3"
      //   },
      //   {
      //     "name": "Investimento Inicial",
      //     "y": 20000.00,
      //     "color": "#07CC6D"
      //   }
      // ],

    // {
    //   type: 'pie',
    //   size: '70%',
    //   // borderWidth: 1,
    //   // borderColor: 'rgba(10, 13, 13, 0.12)',
    //   showInLegend: false,
    //   data: [
    //     {
    //       "y": 1.00,
    //       "color": "#fff"
    //     },
    //   ],
    //   // shadow: {
    //   //   color : 'rgba(10, 13, 13, 0.12)',
    //   //   offsetX : 0,
    //   //   offsetY : 0,
    //   //   opacity : 0.14,
    //   //   width : 15,
    //   // },
    // },