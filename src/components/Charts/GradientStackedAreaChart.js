import ReactEcharts from "echarts-for-react";

function GradientStackedAreaChart({ size }) {
  const option = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      text: "Storage usage by departments QoQ",
      subtext: "Updated 1h ago",
      textStyle: {
        color: "#26282C",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Q1", "Q2", "Q3", "Q4"],
      },
    ],
    yAxis: [
      {
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
      }
    ],
    series: [
      {
        name: "QA",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "rgb(128, 255, 165)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(1, 191, 236)",
          //   },
          // ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Analytics",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "rgb(0, 221, 255)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(77, 119, 255)",
          //   },
          // ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "Essential",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "rgb(55, 162, 255)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(116, 21, 219)",
          //   },
          // ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: "Deveops",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "rgb(255, 0, 135)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(135, 0, 157)",
          //   },
          // ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: "Others",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {
          opacity: 0.8,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "rgb(255, 191, 0)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(224, 62, 76)",
          //   },
          // ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  };
  return <ReactEcharts option={option} opts={{ height: size, width: size }} />;
}

export default GradientStackedAreaChart;
