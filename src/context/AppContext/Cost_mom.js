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

export default function Cost_mom() {


  const [option, setOption] = useState(null);

  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main8');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const newOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '2%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              name:'Cost ($)',
              nameLocation:'middle',
              nameGap:25
            },
            yAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
              name:'Month'
            
              
            },
            series: [
              {
                name: 'Big Query',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320,450,550,720,452,750]
              },
              {
                name: 'Okta',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210,335,420,560,852,880]
              },
              {
                name: 'Snowflake',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310,650,653,490,652,859]
              },
              {
                name: 'Azure',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [150, 212, 201, 154, 190, 330, 410, 589, 794, 666, 552, 680]
              },
              {
                name: 'OpenAI',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [820, 832, 901, 934, 1290, 1330, 960 ,850, 985, 666, 352, 846]
              },
              {
                name: 'GCP',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1152, 962, 742, 666, 452, 1480]
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
      <div id="main8" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
