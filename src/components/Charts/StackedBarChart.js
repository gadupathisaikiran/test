import ReactEcharts from "echarts-for-react";

function StackedBarChart({ size }) {
  const option = {
    title: {
      text: "Cost estimation by department",
      textStyle: {
        color: "#26282C",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      show: false,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["Devops", "Analytics", "R&D", "QA", "Misc", "Overall"],
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
      {
        name: "2012",
        type: "bar",
        data: [19325, 23438, 31000, 121594, 134141, 681807],
      },
    ],
  };
  return <ReactEcharts option={option} opts={{ height: size }} />;
}

export default StackedBarChart;
