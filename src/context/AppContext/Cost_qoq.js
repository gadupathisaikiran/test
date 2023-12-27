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

export default function Cost_qoq() {


  const [option, setOption] = useState(null);

  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById('main10');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const newOption ={
  
            legend: {
              top:'5%'
            },
            tooltip: {},
            dataset: {
              source: [
                ['product', '2023-1', '2023-2', '2023-3','2023-4'],
                ['Biq Query', 5.1, 3.8, 4.7,6.1],
                ['Okta', 3.1, 3.4, 5.1,3.2,4.6],
                ['Snow Flake', 8.4, 5.2, 2.5,4.1,3.4],
                ['Open AI', 2.4, 3.9, 9.1,6,6],
                ['GCP', 7.4, 5.9, 3.1,5.6]
              ]
            },
            xAxis: { type: 'category', },
            yAxis: {  name:'Cost_Changes',
                    nameLocation: 'middle', // Adjust the location of the X axis name
              nameGap: 30,},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' }]
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
      <div id="main10" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
