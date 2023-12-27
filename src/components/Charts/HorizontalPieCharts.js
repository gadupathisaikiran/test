import ReactEcharts from "echarts-for-react";

function HorizontalPieCharts() {
  const option = {
    title: [
      {
        text: "Storage consumption by user",
        textStyle: {
          color: "#26282C",
          fontWeight: "normal",
          fontSize: 14,
        },
      },
    ],
    dataset: [
      {
        source: [
          ["Product", "Sales", "Price", "Year"],
          ["QA", 123, 32, 2011],
          ["Analytics", 231, 14, 2011],
          ["R&D", 235, 5, 2011],
          ["Devops", 341, 25, 2011],
          ["Admin", 122, 29, 2011],
          ["QA", 143, 30, 2012],
          ["Analytics", 201, 19, 2012],
          ["R&D", 255, 7, 2012],
          ["Devops", 241, 27, 2012],
          ["Admin", 102, 34, 2012],
          ["QA", 153, 28, 2013],
          ["Analytics", 181, 21, 2013],
          ["R&D", 395, 4, 2013],
          ["Devops", 281, 31, 2013],
          ["Admin", 92, 39, 2013],
          ["QA", 223, 29, 2014],
          ["Analytics", 211, 17, 2014],
          ["R&D", 345, 3, 2014],
          ["Devops", 211, 35, 2014],
          ["Admin", 72, 24, 2014],
        ],
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2011 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2012 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2013 },
        },
      },
    ],
    series: [
      {
        type: "pie",
        radius: 50,
        center: ["50%", "25%"],
        datasetIndex: 1,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "50%"],
        datasetIndex: 2,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "75%"],
        datasetIndex: 3,
      },
    ],
    // Optional. Only for responsive layout:
    media: [
      {
        query: { minAspectRatio: 1 },
        option: {
          series: [
            { center: ["25%", "50%"] },
            { center: ["50%", "50%"] },
            { center: ["75%", "50%"] },
          ],
        },
      },
      {
        option: {
          series: [
            { center: ["50%", "25%"] },
            { center: ["50%", "50%"] },
            { center: ["50%", "75%"] },
          ],
        },
      },
    ],
  };
  return <ReactEcharts option={option} />;
}

export default HorizontalPieCharts;
