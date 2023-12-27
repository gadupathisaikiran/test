import ReactEcharts from "echarts-for-react";

function PieChart() {
  var datas = [
    ////////////////////////////////////////
    [
      { name: "QA", value: 5.6 },
      { name: "Analytics", value: 1 },
      { name: "Essential", value: 0.8 },
      { name: "Devops", value: 0.5 },
      { name: "Other", value: 0.5 }
    ],
    // ////////////////////////////////////////
    [
      { name: "QA", value: 3.8 },
      { name: "Analytics", value: 2.3 },
      { name: "Essential", value: 2.2 },
      { name: "Devops", value: 1.3 },
      { name: "Other", value: 1.2 }
    ],
    ////////////////////////////////////////
    [
      { name: "QA", value: 3.5 },
      { name: "Analytics", value: 2.8 },
      { name: "Essential", value: 1.7 },
      { name: "Devops", value: 1.4 },
      { name: "Other", value: 0.5 }
    ],
  ];
  const option = {
    title: {
      text: "Storage allocation by departments",
      subtext: "Last updated 1 hr ago",
      left: "left",
      textStyle: {
        color: "#26282C",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    series: datas.map(function (data, idx) {
      var top = idx * 33.3;
      return {
        type: "pie",
        radius: [15, 50],
        top: top + "%",
        height: "35%",
        left: "center",
        width: 400,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c}}",
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: "#999",
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        data: data,
      };
    }),
  };
  return <ReactEcharts style={{ "min-height": "688px" }} option={option} />;
}

export default PieChart;
