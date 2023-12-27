import ReactEcharts from "echarts-for-react";

function BasicLineChart({ size }) {
  const option = {
    title: {
      text: "Storage usage over last week",
      subtext: "Updated 1h ago",
      textStyle: {
        color: "#26282C",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      name: "Storage(GB)",
        nameRotate: 90,
        nameLocation: "middle",
        nameTextStyle: {
          nameGap: 60,
          fontSize: 15,
          fontWeight: 'bold',
          padding: [0, 0, 18, 0]
        },
        axisLabel: {
          show: true,
          fontSize: 10
        }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
      },
    ],
  };
  return <ReactEcharts option={option} opts={{ height: size }} />;
}

export default BasicLineChart;
