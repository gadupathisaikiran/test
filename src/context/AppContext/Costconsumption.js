import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

export default function Costconsumption() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main1');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const newOption = {
         
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
          right: '10%',
            top: '0'
          },
          series: [
            {
              name: 'Cost Consumption',
              type: 'pie',
              radius: '70%',
              data: [
                { value: 100, name: 'Okta' },
                { value: 200, name: 'Snowflake' },
                { value: 150, name: 'BigQuery' },
                { value: 120, name: 'GCP' },
                { value: 180, name: 'OpenAI' },
                { value: 80, name: 'Azure' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        myChart.setOption(newOption);
        setOption(newOption);

        return () => {
          myChart.dispose();
        };
      }
    };

    // Delay initialization by a few milliseconds
    const timeoutId = setTimeout(initChart, 100);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{width:"100%",height:"100%"}}>
      <div id="main1" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
