import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer, UniversalTransition]);

export default function Licenceplaninggraph() {
  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main2');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const option = {
          xAxis: {
            data: ['BigQuery', 'Snowflake', 'Okta',"GCP","OpenAI","Azure"],
          },
          barWidth: 32,
          yAxis: {},
          series: [
            {
              type: 'bar',
              id: 'sales',
              data: [
                {
                  value: 5,
                  groupId: 'BigQuery',
                },
                {
                  value: 2,
                  groupId: 'Snowflake',
                },
                {
                  value: 4,
                  groupId: 'Okta',
                },
                {
                    value: 5,
                    groupId: 'GCP',
                  },
                {
                    value: 6,
                    groupId: 'OpenAI',
                  },
                  {
                    value: 3,
                    groupId: 'Azure',
                  },
              ],
              universalTransition: {
                enabled: true,
                divideShape: 'clone',
              },
            },
          ],
        };

 

        myChart.setOption(option);

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
    <div style={{ width: '100%', height: '100%' }}>
      <div id="main2" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
