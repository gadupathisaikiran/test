import ReactEcharts from "echarts-for-react";

function DoubleYAxisLineCharts({ size }) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    title: {
      text: "Storage requirements overview",
      subtext: "Updated 3d ago",
      textStyle: {
        color: "#26282C",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "40%",
      top: "30%",
    },

    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Last year",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Estimated",
        position: "right",
        alignTicks: true,
        offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Storage(TB)",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: "{value} ",
        },
      },
    ],
    series: [
      {
        name: "Evaporation",
        type: "bar",
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
      },
      {
        name: "Precipitation",
        type: "bar",
        yAxisIndex: 1,
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        name: "Temperature",
        type: "line",
        yAxisIndex: 2,
        data: [
          2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
        ],
      },
    ],
  };
  return <ReactEcharts option={option} opts={{ height: size }} />;
}

export default DoubleYAxisLineCharts;
