import ReactEcharts from "echarts-for-react";

function WaterfallChart({ size }) {
  const option = {
    title: {
      text: "Storage usage perspective",
      subtext: "Last update 1w ago",
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
      formatter: function (params) {
        var tar = params[1];
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        width: 60,
        // overflow: "break",
        interval: 0,
      },
      splitLine: { show: false },
      data: ["Total", "QA", "Analytics", "Essential", "Devops", "Other"],
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
          padding: [0, 0, 21, 0]
        },
        axisLabel: {
          show: true,
          fontSize: 10
        }
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: [0, 1700, 1400, 1200, 300, 0],
      },
      {
        name: "Life Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "inside",
        },
        data: [2900, 1200, 300, 200, 900, 300],
      },
    ],
  };
  return <ReactEcharts option={option} opts={{ height: size }} />;
}

export default WaterfallChart;
