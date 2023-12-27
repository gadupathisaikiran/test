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

export default function StorageGraph_monthly() {

  const [option, setOption] = useState(null);

  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const newOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'Sep', 'oct', 'nov', 'dec']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Big query',
              type: 'bar',
              barWidth: 45,
              stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: [620, 732, 701, 734, 109, 113, 112, 732, 701, 734, 109, 113]
            },
            {
              name: 'snowflake',
              type: 'bar',
              barWidth: 45,
              stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: [620, 732, 701, 734, 100, 1130, 110, 620, 732, 701, 734, 100]
            },
            {
              name: 'Okta',
              type: 'bar',
              barWidth: 45,
              stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 290, 230, 220, 120, 132, 101, 134, 290]
            },
            {
              name: 'Azure',
              type: 'bar',
              barWidth: 45,
              stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: [60, 72, 71, 74, 190, 130, 110, 60, 72, 71, 74, 190]
            },
           
            {
              name: 'OpenAI',
              type: 'bar',
              barWidth: 45,
              stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: [62, 82, 91, 84, 109, 110, 120]
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
      <div id="main" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
