import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  BarChart,
  CanvasRenderer
]);

export default function Cost_yoy() {


  const [option, setOption] = useState(null);

  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main8');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const newOption = {
            legend: {},
            tooltip: {},
            dataset: {
            source: [
            ['product', 'Big Query', 'Okta', 'Snowflake', 'Azure', 'OpenAI', 'GCP'],
            ['2019', 1250, 1850, 2450, 2150, 2100, 1750],
            ['2020', 1500, 2100, 1850, 2250, 2500, 2100],
            ['2021', 1750, 1500, 1250, 2500, 2000, 1250],
            ['2022', 2250, 1750, 1500, 2200, 1750, 2250],
            ['2023', 2000, 1850, 1700, 2400, 2600, 2000],
          ]
            },
            xAxis: {
              type: 'category',
              name: 'Year'
            },
            yAxis: {
              // name: 'Cost ($)',
              
            },
            series: [
              { type: 'bar', name: 'Big Query' },
              { type: 'bar', name: 'Okta' },
              { type: 'bar', name: 'Snowflake' },
              { type: 'bar', name: 'Azure' },
              { type: 'bar', name: 'OpenAI' },
              { type: 'bar', name: 'GCP' }
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
      <div id="main8" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
