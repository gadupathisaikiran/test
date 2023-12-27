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

export default function StorageGraph_quaterly() {
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
              legend: {
                data: ['BigQuery', 'Snowflake', 'Okta',"OpenAI","Azure"]
              },
              toolbox: {
                show: true,
                feature: {
                  // dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  // restore: { show: true },
                  // saveAsImage: { show: true },
                },
                iconSize: 24, // Set the icon size for the toolbox
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  // prettier-ignore
                  data: [ 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023']
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value} GB'
                  }
                }
              ],
              series: [
                {
                  name: 'BigQuery',
                  type: 'bar',
                  data: [50, 30, 80, 40, 90, 60, 70, 20, 85, 45, 75, 55],
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  // markLine: {
                  //   data: [{ type: 'average', name: 'Avg' }]
                  // }
                },
                {
                  name: 'Snowflake',
                  type: 'bar',
                  data: [70, 40, 60, 80, 30, 50, 90, 55, 75, 45, 85, 65],
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  // markLine: {
                  //   data: [{ type: 'average', name: 'Avg' }]
                  // }
                },
                {
                  name: 'Okta',
                  type: 'bar',
                  data: [40, 80, 20, 60, 90, 30, 50, 75, 45, 85, 65, 35],
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  // markLine: {
                  //   data: [{ type: 'average', name: 'Avg' }]
                  // }
                },
               
                {
                  name: 'OpenAI',
                  type: 'bar',
                  data: [45, 70, 30, 60, 80, 20, 40, 55, 75, 35, 65, 50], // Example data for OpenAI
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  // markLine: {
                  //   data: [{ type: 'average', name: 'Avg' }]
                  // }
                },
                {
                  name: 'Azure',
                  type: 'bar',
                  data: [55, 25, 65, 35, 75, 45, 60, 30, 80, 40, 70, 50], // Example data for Azure
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  // markLine: {
                  //   data: [{ type: 'average', name: 'Avg' }]
                  // }
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
