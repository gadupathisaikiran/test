import ReactEcharts from "echarts-for-react";

function PolarBarChart({ size }) {
  const option = {
    title: [
      {
        text: "Storage usage forcast",
        textStyle: {
          color: "#26282C",
          fontWeight: "normal",
          fontSize: 14,
        },
      },
    ],
    polar: {
      radius: [30, "60%"],
    },
    angleAxis: {
      max: 4,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["Analytics", "Devops", "Others", "R&D"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle",
        formatter: "{b}: {c}",
      },
    },
  };
  return <ReactEcharts option={option} opts={{ height: size }} />;
}

export default PolarBarChart;
