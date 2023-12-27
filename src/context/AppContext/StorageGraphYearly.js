import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export default function StorageGraphYearly() {
  useEffect(() => {
    const storageData = [
        { "Year": 2017, "Technology": "BigQuery", "Storage": 150 },
        { "Year": 2018, "Technology": "BigQuery", "Storage": 470 },
        { "Year": 2019, "Technology": "BigQuery", "Storage": 490 },
        { "Year": 2020, "Technology": "BigQuery", "Storage": 500 },
        { "Year": 2021, "Technology": "BigQuery", "Storage": 510 },
        { "Year": 2022, "Technology": "BigQuery", "Storage": 520 },
        { "Year": 2023, "Technology": "BigQuery", "Storage": 530 },
        { "Year": 2017, "Technology": "Okta", "Storage": 160 },
        { "Year": 2018, "Technology": "Okta", "Storage": 680 },
        { "Year": 2019, "Technology": "Okta", "Storage": 700 },
        { "Year": 2020, "Technology": "Okta", "Storage": 720 },
        { "Year": 2021, "Technology": "Okta", "Storage": 740 },
        { "Year": 2022, "Technology": "Okta", "Storage": 760 },
        { "Year": 2023, "Technology": "Okta", "Storage": 780 },
        { "Year": 2017, "Technology": "Snowflake", "Storage": 180 },
        { "Year": 2018, "Technology": "Snowflake", "Storage": 290 },
        { "Year": 2019, "Technology": "Snowflake", "Storage": 300 },
        { "Year": 2020, "Technology": "Snowflake", "Storage": 310 },
        { "Year": 2021, "Technology": "Snowflake", "Storage": 320 },
        { "Year": 2022, "Technology": "Snowflake", "Storage": 330 },
        { "Year": 2023, "Technology": "Snowflake", "Storage": 340 },
        { "Year": 2017, "Technology": "Azure", "Storage": 200 },
        { "Year": 2018, "Technology": "Azure", "Storage": 410 },
        { "Year": 2019, "Technology": "Azure", "Storage": 420 },
        { "Year": 2020, "Technology": "Azure", "Storage": 430 },
        { "Year": 2021, "Technology": "Azure", "Storage": 440 },
        { "Year": 2022, "Technology": "Azure", "Storage": 450 },
        { "Year": 2023, "Technology": "Azure", "Storage": 460 },
   
        { "Year": 2017, "Technology": "OpenAI", "Storage": 150 },
        { "Year": 2018, "Technology": "OpenAI", "Storage": 530 },
        { "Year": 2019, "Technology": "OpenAI", "Storage": 580 },
        { "Year": 2020, "Technology": "OpenAI", "Storage": 590 },
        { "Year": 2021, "Technology": "OpenAI", "Storage": 510 },
        { "Year": 2022, "Technology": "OpenAI", "Storage": 520 },
        { "Year": 2023, "Technology": "OpenAI", "Storage": 590 },
      ];
      
    // Get unique years
    const uniqueYears = [...new Set(storageData.map((item) => item.Year))];

    const initChart = () => {
      const chartDom = document.getElementById('main4');
      if (chartDom) {
        const myChart = echarts.init(chartDom);

        const option = {
          animationDuration: 1000,
          dataset: [
            {
              id: 'dataset_raw',
              source: storageData
            }
          ],
         
          tooltip: {
            order: 'valueDesc',
            trigger: 'axis',
            formatter: (params) => {
              const year = params[0].axisValue;
              const tooltipItems = params
                .filter((item, index, self) => self.findIndex((i) => i.seriesName === item.seriesName) === index) // Remove duplicate series
                .map((item) => `${item.marker} ${item.seriesName}: ${item.data} GB`)
                .join('<br>');
              return `Year: ${year}<br>${tooltipItems}`;
            }
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle',
            data: uniqueYears.map(String)
          },
          yAxis: {
            name: 'Storage (GB)'
          },
          grid: {
            right: 140
          },
          legend: {
            data: storageData.map((item) => item.Technology) // Array of legend names
          },
          series: []
        }

        myChart.setOption(option);

        // Add series one by one with animation
        storageData.forEach((item, index) => {
          setTimeout(() => {
            myChart.setOption({
              series: [
                ...(myChart.getOption().series || []),
                {
                  type: 'line',
                  smooth: true,
                  data: storageData
                    .filter((dataItem) => dataItem.Technology === item.Technology)
                    .map((dataItem) => dataItem.Storage),
                  name: item.Technology,
                  emphasis: {
                    focus: 'series'
                  }
                }
              ]
            });
          }, index * 100); // Adjust the timeout duration as needed
        });

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
      <div id="main4" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
