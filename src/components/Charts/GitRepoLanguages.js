import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

function GitRepoLanguages({ gitToken, apiConfig }) {
  // setting echarts options
  const [echartsOptions, setEchartsOptions] = useState({});

  // set up github client
  const octokit = new Octokit({
    auth: gitToken,
  });

  // make api call to get repo language info during initial rendering
  useEffect(() => {
    gitApiLangCall();
  }, [gitToken, apiConfig?.repo]);
  // get repo languageusage  info
  async function gitApiLangCall() {
    // api call
    try {
      const repoLangRes = await octokit.request(
        "GET /repos/{owner}/{repo}/languages",
        apiConfig
      );

      // set up for iterating over response object
      const repoLangResObj = new Object(repoLangRes.data);
      let repoLangResArr = [];
      let totalLangUsage = 0;

      // calculate total usage of all languages in git repo
      for (const iterator in repoLangResObj) {
        if (repoLangResObj.hasOwnProperty(iterator)) {
          totalLangUsage += repoLangResObj[iterator];
        }
      }

      // create array suitable for use in echarts
      for (const iterator in repoLangResObj) {
        if (repoLangResObj.hasOwnProperty(iterator)) {
          repoLangResArr.push({
            name: iterator,
            type: "bar",
            stack: "total",
            data: [repoLangResObj[iterator] / totalLangUsage],
          });
        }
      }
      // options for apache echarts
      setEchartsOptions({
        legend: { left: "0%", bottom: "0%", itemWidth: 10, itemHeight: 10 },
        grid: {
          top: "5%",
          height: "15px",
          width: "100%",
          left: "0%",
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          type: "category",
          show: false,
        },
        series: repoLangResArr,
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(apiConfig, echartsOptions);
  return (
    <ReactEcharts
      notMerge={true}
      option={echartsOptions}
      style={{ height: "70px" }}
      opts={{ height: "70px" }}
    />
  );
}

export default GitRepoLanguages;
