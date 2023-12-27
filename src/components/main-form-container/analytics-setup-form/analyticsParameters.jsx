import React, { useMemo } from "react";

import "./analyticParameters.css";
import { useContext } from "react";
import AppContext from "../../../context/AppContext/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
const analyticParametersData1 = [
  {
    BQ_Name: "Usage By Product by User Over_YoY",
    executionTime: 1699959973686,
    DashBoardNames: [" Bar Label Rotation", "Dataset in Object Array"],
    BQ_Description:
      "Describes a metric or analysis that examines the usage patterns of products by individual users over a year-over-year (YoY) timeframe.",
    BQ_Id: "65535472c11c4c74d3c846ee",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699959922830,
    Analytics_Parameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535472c11c4c74d3c846ee",
    evaluationType: "Scheduled",
    createdBy: "Saleem",
    createdOn: "23 Aug 2023, 11:34 am",
    lastModifiedBy: "Peter",
    lastModifiedOn: "25 Aug 2023, 5:34 pm",
    rawQuery:
      'WITH yearly_usage AS (SELECT TO_CHAR("entity.Mobius_PI_date"::date, \'YYYY\') AS X_Axis, "entity.Mobius_PI_product_type" AS product_type, SUM("entity.Mobius_PI_total_usage") AS total_usage FROM t_655340cba34e3b716bd16b3e_t WHERE "entity.Mobius_PI_date"::timestamp >= CURRENT_DATE - INTERVAL \'5 years\' AND "entity.Mobius_PI_product_type" IS NOT NULL GROUP BY TO_CHAR("entity.Mobius_PI_date"::date, \'YYYY\'), "entity.Mobius_PI_product_type"), monthly_change AS (SELECT X_Axis, product_type, total_usage, LAG(total_usage) OVER (PARTITION BY product_type ORDER BY X_Axis) AS prev_month_usage FROM yearly_usage) SELECT X_Axis, X_Axis, product_type, total_usage, ROUND(CAST(CASE WHEN prev_month_usage IS NOT NULL AND total_usage != 0 THEN ((total_usage - prev_month_usage) / prev_month_usage) * 100 ELSE 0 END AS numeric), 2) AS Y_Axis FROM monthly_change ORDER BY product_type, X_Axis DESC;',
  },
  {
    BQ_Name: "MostUsed Product",
    executionTime: 1699959973686,
    DashBoardNames: [" Bar Label Rotation", "Dataset in Object Array"],
    BQ_Description:
      "Product that has the highest frequency or usage within a given dataset.",
    BQ_Id: "655359d93c50ac0299ee5575",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699959922830,
    Analytics_Parameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535472c11c4c74d3c846ee",
    evaluationType: "Scheduled",
    createdBy: "Ram Aravind",
    createdOn: "09 Feb 2023, 2:34 pm",
    lastModifiedBy: "Mohan Kumar",
    lastModifiedOn: "26 Feb 2023, 10:34 am",
    rawQuery:
      'WITH product_usage AS (SELECT "entity.product_type",SUM("entity.total_usage") AS total_usage FROM t_654dfde7c1c06a324e2caa3e_t WHERE "entity.date"::timestamp >= CURRENT_DATE - INTERVAL \'12 months\' AND "entity.date"::timestamp <= CURRENT_DATE AND "entity.product_type" IS NOT NULL GROUP BY "entity.product_type")SELECT "entity.product_type",CAST((SUM(total_usage) / (SELECT SUM(total_usage) FROM product_usage)) * 100 as numeric(10,2)) AS usage_percentage FROM product_usage GROUP BY "entity.product_type" ORDER BY usage_percentage',
  },
  {
    BQ_Name: "Usage By Product By User Over QoQ",
    executionTime: 1699959973686,
    DashBoardNames: [" Bar Label Rotation", "Dataset in Object Array"],
    BQ_Description:
      "Describes a metric or analysis that examines the usage patterns of products by individual users over a year-over-year (QoQ) timeframe.",
    BQ_Id: "65535545c11c4c74d3c846f6",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699959922830,
    Analytics_Parameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535472c11c4c74d3c846ee",
    evaluationType: "Scheduled",
    createdBy: "Praveen ",
    createdOn: "11 Sept 2023, 12:34 am",
    lastModifiedBy: "Ishita Reddy",
    lastModifiedOn: "21 Sept 2023, 10:21 am",
    rawQuery:
      'WITH Quaterly_usage AS (SELECT TO_CHAR("entity.date"::date, \'YYYY-Q\') AS X_Axis, "entity.product_type" AS product_type, "entity.user_type" AS user_type, SUM("entity.total_usage") AS "entity.total_usage" FROM t_654c6c47c6ad9a566970ec64_t WHERE "entity.date"::date >= CURRENT_DATE - INTERVAL \'1 year\' AND "entity.date"::date <= CURRENT_DATE GROUP BY TO_CHAR("entity.date"::date, \'YYYY-Q\'), "entity.product_type", "entity.user_type") SELECT X_Axis, product_type, user_type, "entity.total_usage", CASE WHEN LAG("entity.total_usage", 1) OVER (PARTITION BY product_type, user_type ORDER BY X_Axis) IS NOT NULL AND "entity.total_usage" != 0 THEN (( "entity.total_usage" - LAG("entity.total_usage", 1) OVER (PARTITION BY product_type, user_type ORDER BY X_Axis)) / LAG("entity.total_usage", 1) OVER (PARTITION BY product_type, user_type ORDER BY X_Axis)) * 100 ELSE 0 END AS Y_Axis FROM Quaterly_usage WHERE TO_DATE(X_Axis || \'-01\', \'YYYY-Q-MM\') >= CURRENT_DATE - INTERVAL \'1 year\' ORDER BY product_type, user_type, X_Axis DESC',
  },
  {
    BQ_Name: "Usage By Product by User Over MoM",
    executionTime: 1699959973686,
    DashBoardNames: [" Bar Label Rotation", "Dataset in Object Array"],
    BQ_Description:
      "Describes a metric or analysis that examines the usage patterns of products by individual users over a year-over-year (MoM) timeframe.",
    BQ_Id: "655356b53c50ac0299ee556e",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699959922830,
    Analytics_Parameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535472c11c4c74d3c846ee",
    evaluationType: "Scheduled",
    createdBy: "Priya Joshi",
    createdOn: "11 Aug 2023, 8:34 am",
    lastModifiedBy: "Rohan Kumar",
    lastModifiedOn: "16 Aug 2023, 12:12 am",
    rawQuery:
      'WITH monthly_usage AS (SELECT TO_CHAR("entity.Mobius_PI_date"::date, \'YYYY-MM\') AS month, TO_CHAR("entity.Mobius_PI_date"::date, \'Mon\') AS X_Axis, "entity.Mobius_PI_product_type" AS product_type, SUM("entity.Mobius_PI_total_usage") AS total_usage FROM t_655340cba34e3b716bd16b3e_t WHERE "entity.Mobius_PI_date"::timestamp >= CURRENT_DATE - INTERVAL \'12 months\' AND "entity.Mobius_PI_product_type" IS NOT NULL GROUP BY TO_CHAR("entity.Mobius_PI_date"::date, \'YYYY-MM\'), TO_CHAR("entity.Mobius_PI_date"::date, \'Mon\'), "entity.Mobius_PI_product_type"), monthly_change AS (SELECT month, X_Axis, product_type, total_usage, LAG(total_usage) OVER (PARTITION BY product_type ORDER BY month) AS prev_month_usage FROM monthly_usage) SELECT month, X_Axis, product_type, total_usage, ROUND(CAST(CASE WHEN prev_month_usage IS NOT NULL AND total_usage != 0 THEN ((total_usage - prev_month_usage) / prev_month_usage) * 100 ELSE 0 END AS numeric), 2) AS Y_Axis FROM monthly_change ORDER BY product_type, month DESC;',
  },
];
const analyticParametersData2 = [
  {
    BQ_Name: "Usage by product by cost over MOM",
    executionTime: 1699959973686,
    DashBoardNames: ["BarLabelRotation", "DatasetinObjectArray"],
    BQ_Description:
      "Tracks the cost of product usage over month-on-month (MoM) to analyze variations in expenditure.",
    BQ_Id: "65535472c11c4c74d3c846ee",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699959922830,
    AnalyticsParameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535472c11c4c74d3c846ee",
    evaluationType: "Scheduled",
    createdBy: "SriCherryKotamreddy",
    createdOn: "11Mar2023,9:34am",
    lastModifiedBy: "Pjahnavi",
    lastModifiedOn: "11Mar2023,9:34am",
    rawQuery:
      'WITH monthly_usage AS (SELECT TO_CHAR("entity.date"::date, \'YYYY-MM\') AS month, TO_CHAR("entity.date"::date, \'Mon\') AS X_Axis, "entity.product_type" AS product_type, SUM("entity.total_usage") AS total_usage, SUM("entity.total_cost") AS total_cost FROM t_654dfde7c1c06a324e2caa3e_t WHERE "entity.date"::timestamp >= CURRENT_DATE - INTERVAL \'12 months\' AND "entity.product_type" IS NOT NULL GROUP BY TO_CHAR("entity.date"::date, \'YYYY-MM\'), TO_CHAR("entity.date"::date, \'Mon\'), "entity.product_type"), monthly_change AS (SELECT month, X_Axis, product_type, total_usage, total_cost, LAG(total_usage) OVER (PARTITION BY product_type ORDER BY month) AS prev_month_usage, LAG(total_cost) OVER (PARTITION BY product_type ORDER BY month) AS prev_month_cost FROM monthly_usage) SELECT month, X_Axis, product_type, total_usage, total_cost, ROUND(CAST(CASE WHEN prev_month_usage IS NOT NULL AND total_usage != 0 THEN ((total_usage - prev_month_usage) / prev_month_usage) * 100 ELSE 0 END AS numeric), 2) AS Y_Axis1, ROUND(CAST(CASE WHEN prev_month_cost IS NOT NULL AND total_cost != 0 THEN ((total_cost - prev_month_cost) / prev_month_cost) * 100 ELSE 0 END AS numeric), 2) AS y_axis2 FROM monthly_change ORDER BY product_type, month DESC',
  },
  {
    BQ_Name: ")Usage by Product by cost over QOQ",
    executionTime: 1699960133742,
    DashBoardNames: ["BarLabelRotation", "DatasetinObjectArray"],
    BQ_Description:
      "Tracks the cost of product usage over quarter-on-quarter (QoQ) to analyze variations in expenditure.",
    BQ_Id: "65535545c11c4c74d3c846f6",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699960133678,
    AnalyticsParameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535545c11c4c74d3c846f6",
    evaluationType: "Scheduled",
    createdBy: "ChEswar",
    createdOn: "01Mar2023,19:34am",
    lastModifiedBy: "ChEswar",
    lastModifiedOn: "02Mar2023,20:34am",
    rawQuery:
      'WITH quarterly_usage AS (SELECT TO_CHAR("entity.date"::date, \'YYYY-Q\') AS quarter, "entity.product_type" AS product_type, SUM("entity.total_usage") AS total_usage, SUM("entity.total_cost") AS total_cost FROM t_654dfde7c1c06a324e2caa3e_t WHERE "entity.date"::timestamp >= CURRENT_DATE - INTERVAL \'12 months\' AND "entity.product_type" IS NOT NULL GROUP BY TO_CHAR("entity.date"::date, \'YYYY-Q\'), "entity.product_type"), quarterly_change AS (SELECT quarter, product_type, total_usage, total_cost, LAG(total_usage) OVER (PARTITION BY product_type ORDER BY quarter) AS prev_quarter_usage, LAG(total_cost) OVER (PARTITION BY product_type ORDER BY quarter) AS prev_quarter_cost FROM quarterly_usage) SELECT quarter AS X_AXIS, product_type, total_usage, total_cost, ROUND(CAST(CASE WHEN prev_quarter_usage IS NOT NULL AND total_usage != 0 THEN ((total_usage - prev_quarter_usage) / prev_quarter_usage) * 100 ELSE 0 END AS numeric), 2) AS y_axis1, ROUND(CAST(CASE WHEN prev_quarter_cost IS NOT NULL AND total_cost != 0 THEN ((total_cost - prev_quarter_cost) / prev_quarter_cost) * 100 ELSE 0 END AS numeric), 2) AS y_axis2 FROM quarterly_change ORDER BY product_type, quarter DESC',
  },
  {
    BQ_Name: "Usage by Product by cost over YOY",
    executionTime: 1699960133742,
    DashBoardNames: ["BarLabelRotation", "DatasetinObjectArray"],
    BQ_Description:
      "Tracks the cost of product usage over year-on-year (YoY) to analyze variations in expenditure.",
    BQ_Id: "65535545c11c4c74d3c846f6",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699960133678,
    AnalyticsParameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
      "Mobius_PI_user_type",
    ],
    id: "65535545c11c4c74d3c846f6",
    evaluationType: "Scheduled",
    createdBy: "Sayonil",
    createdOn: "03Mar2023,18:34am",
    lastModifiedBy: "Sayonil",
    lastModifiedOn: "11Mar2023,9:34am",
    rawQuery:
      'WITH yearly_usage AS (SELECT TO_CHAR("entity.date"::date, \'YYYY\') AS X_Axis, "entity.product_type" AS product_type, SUM("entity.total_usage") AS total_usage, SUM("entity.total_cost") AS total_cost FROM t_654dfde7c1c06a324e2caa3e_t WHERE "entity.date"::timestamp >= CURRENT_DATE - INTERVAL \'5 years\' AND "entity.product_type" IS NOT NULL GROUP BY TO_CHAR("entity.date"::date, \'YYYY\'), "entity.product_type"), monthly_change AS (SELECT X_Axis, product_type, total_usage, total_cost, LAG(total_usage) OVER (PARTITION BY product_type ORDER BY X_Axis) AS prev_month_usage, LAG(total_cost) OVER (PARTITION BY product_type ORDER BY X_Axis) AS prev_month_cost FROM yearly_usage) SELECT X_Axis, X_Axis AS month, product_type, total_usage, total_cost, ROUND(CAST(CASE WHEN prev_month_usage IS NOT NULL AND total_usage != 0 THEN ((total_usage - prev_month_usage) / prev_month_usage) * 100 ELSE 0 END AS numeric), 2) AS Y_Axis1, ROUND(CAST(CASE WHEN prev_month_cost IS NOT NULL AND total_cost != 0 THEN ((total_cost - prev_month_cost) / prev_month_cost) * 100 ELSE 0 END AS numeric), 2) AS Y_AXIS2 FROM monthly_change ORDER BY product_type, X_Axis DESC',
  },
  {
    BQ_Name: "Cost Distribution by User Over YoY",
    executionTime: 1699961305526,
    DashBoardNames: [
      "NightingaleChart",
      "PieSpecialLabel",
      "DoughnutChart",
      "HalfDoughnutChart",
    ],
    BQ_Description:
      "Analyzes the distribution of costs attributed to different users over year-on-year (YoY) periods.",
    BQ_Id: "655359d93c50ac0299ee5575",
    tenantID: "64e1fd3d1443eb00018cc231",
    CreatedOn: 1699961305264,
    AnalyticsParameters: [
      "Mobius_PI_date",
      "Mobius_PI_total_usage",
      "Mobius_PI_product_type",
    ],
    id: "655359d93c50ac0299ee",
    evaluationType: "Scheduled",
    createdBy: "Rahul",
    createdOn: "03 Mar2023,18:34am",
    lastModifiedBy: "Sayonil",
    lastModifiedOn: "11 Mar2023,9:34am",
    rawQuery:
      'WITH yearly_usage AS (SELECT TO_CHAR("entity.date"::date, \'YYYY\') AS year, "entity.user_type" AS user_type, SUM("entity.total_cost") AS total_cost FROM t_654481f1daa03a631dd0ce26_t WHERE "entity.date"::timestamp >= CURRENT_DATE - INTERVAL \'5 years\' GROUP BY TO_CHAR("entity.date"::date, \'YYYY\'), "entity.user_type"), yearly_change AS (SELECT year, user_type, total_cost, LAG(total_cost) OVER (PARTITION BY user_type ORDER BY year) AS prev_year_cost FROM yearly_usage) SELECT year AS x_axis, user_type, total_cost, ROUND(CAST(CASE WHEN prev_year_cost IS NOT NULL AND total_cost != 0 THEN ((total_cost - prev_year_cost) / prev_year_cost) * 100 ELSE 0 END AS numeric), 2) AS y_axis FROM yearly_change ORDER BY user_type, year DESC',
  },
];

const AnalyticParameters = () => {
  let {
    dashboardState,
    eclipse,
    seteclipse,
    aqArray,
    setaqArray,
    aqStylesPayload,
    setAqstylesPayload,
    refreshData,
    setRefreshData,
    setSelectedIndex,
  } = useContext(AppContext);
  const [apiAqData, setAqData] = useState([]);
  const [selectedAq, setSelectedAq] = useState({});
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [localAqArray, setLocalAqArray] = useState(aqArray);
  console.log(localAqArray, "localaqarray value");
  console.log(apiAqData, "aqdata from anlytical parameters");
  console.log(aqStylesPayload, "im from aqStylesPayload");
  const [eclipseStates2, setEclipseStates2] = useState(
    Array(analyticParametersData2.length).fill(false)
  );
  const handleClick = () => {
    setToggleDisplay((prev) => !prev);
  };

  const handleChange = (e) => {
    console.log(e.target.value, e.target.text, "from select");
  };
  console.log(isLoading, toggleDisplay, "on param rerender");
  const handleOption = (e) => {
    console.log(e, "im from options");
  };
  const addtoAQContext = (data) => {
    setLocalAqArray((prev) => [...prev, data.BQ_Id]);
  };
  async function postAq() {
    const formdata = { ...aqStylesPayload, collectionOfAQs: localAqArray };
    const formdatajson = JSON.stringify(formdata);
    console.log("clicked");
    setLoading(false);
    try {
      console.log("inside try block");
      const response = await axios.post(
        "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65532198a5cb97115f849240/instance?upsert=true",
        formdatajson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status == "SUCCESS") {
        console.log("success");
        setRefreshData((prev) => !prev);
        setLoading(true);
        setSelectedIndex(aqStylesPayload.id);
        setToggleDisplay(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleEclipseToggle2 = (index) => {
    const newEclipseStates2 = [...eclipseStates2];
    newEclipseStates2[index] = !newEclipseStates2[index];
    setEclipseStates2(newEclipseStates2);
  };
  const [eclipseStates1, setEclipseStates1] = useState(
    Array(analyticParametersData1.length).fill(false)
  );

  const handleEclipseToggle1 = (index) => {
    const newEclipseStates1 = [...eclipseStates1];
    newEclipseStates1[index] = !newEclipseStates1[index];
    setEclipseStates1(newEclipseStates1);
  };
  useMemo(() => {
    console.log(localAqArray, "localaqarrayvalue in memo");
    setLocalAqArray(aqArray);
  }, [aqArray]);
  useEffect(() => {
    async function getAqlist() {
      try {
        const aqlist = await axios.get(
          "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65523f7a060abb4a5ff3c0c4/instances/list?size=100"
        );
        console.log(aqlist, "data from apis");
        return aqlist.data;
      } catch (err) {
        throw new Error("Server is down");
      }
    }
    getAqlist()
      .then((e) => {
        console.log(e, "im from e");
        setAqData(e.entities);
        console.log(aqArray, "aq array");

        // setSelectedAQobject(e.entities.filter((data)=>aqArray.includes(data.BQ_Id)))

        // setLocalAqArray(aqArray)

        setLoading(true);
        // setLocalAqArray(aqArray)
      })
      .catch((err) => console.log(err));
  }, []);

  function getBorderColor(index) {
    const colors = ['red1', 'green1', 'blue1'];
    return colors[index % colors.length];
  }
  

  return (
    <>
      <div className="thirdContainer">
        <div className="headingOuter">
          <p>Analytics Queries</p>
          {!toggleDisplay && (
            <div className="colorBox_container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <div className="box1" style={{ backgroundColor: `rgb(246, 64, 64)` }}></div>
                <span style={{ fontSize: 12 }}>Direct</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap:'2px'
                }}
              >
                <div
                  className="box1"
                  style={{ backgroundColor: "rgb(31, 233, 41)" }}
                ></div>
                <span style={{ fontSize: 12 }}>Derived</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                {/* <div
                  className="box1"
                  style={{ backgroundColor: "rgb(132, 132, 244)" }}
                ></div>
                <span style={{ fontSize: 12 }}>Inferred</span> */}
              </div>
            </div>
          )}

          <div class="saveButtongroup">
            {isLoading && toggleDisplay && (
              <div id="button-save-aqlist">
                <button onClick={postAq}>save</button>
              </div>
            )}
            <button className="addAnalyticStylesBtn" onClick={handleClick}>
              +
            </button>
          </div>
        </div>
        <div className="analyticsParametrsCardContainer1 scrollbar">
          {isLoading || (
            <div id="loaderContainer">
              {" "}
              <span class="loader"></span>
            </div>
          )}
        {(isLoading && toggleDisplay) || (
            <>
              {apiAqData
                .filter((e) => localAqArray.includes(e.BQ_Id))
                .map((data, index) => {
                  let cardColor = "black";

                  if (data.BQ_Name.startsWith("Usage")) {
                    cardColor = "rgb(246, 64, 64)"; 
                  } else if (data.BQ_Name.startsWith("Cost")) {
                    cardColor = "rgb(31, 233, 41)"; 
                  }
                  else if (data.BQ_Name.includes("Cost") && data.BQ_Name.startsWith("Usage")) {
                    cardColor = "rgb(31, 233, 41)"; 
                  }
                  
                  return (
                    <>
                      <div
                        className={`analyticsParametrsCardContainer2 ${aqArray.includes(data.BQ_Id) ? "border-blue1" : "border-red1"}`}
                      >
                        <div className={`headingAqsparametrs`}>
                          <p style={{color:`${cardColor}`}}>{data.BQ_Name}</p>
                        </div>
                        <div className="queryNameContainer">
                          <p className="queryNameHeading">Query Description</p>
                          <p className="queryName">{data.BQ_Description}</p>
                        </div>
                        <div className="queryNameContainer">
                          <p className="queryNameHeading">UUID / URI</p>
                          <p className="queryName">{data.BQ_Id}</p>
                        </div>
                        <div
                          className="queryNameContainer"
                          onClick={() => handleEclipseToggle1(index)}
                        >
                          <p className="queryNameHeading">Raw Query</p>
                          <p
                            className={`queryName ${eclipseStates1[index] ? "" : "eclipse"
                              }`}
                          >
                            {data.rawQuery}
                          </p>
                        </div>
                        <div className="queryNameContainer">
                          <p className="queryNameHeading">Evaluation Type</p>
                          <p className="queryName">{data.evaluationType}</p>
                        </div>
                        <div className="creationMainContainer">

                        </div>
                      </div>
                    </>
                  )})}
            </>
          )}

          {isLoading && toggleDisplay && (
            <div className="aqListContainer">
              {apiAqData
                .filter((e) => !localAqArray.includes(e.BQ_Id))
                .map((data, index) => (
                  <>
                    <div
                      className="analyticsParametrsCardContainer2"
                      onClick={() => addtoAQContext(data)}
                    >
                      <div className="headingAqsparametrs">
                        <p>{data.BQ_Name}</p>
                      </div>
                      <div className="queryNameContainer">
                        <p className="queryNameHeading">Query Description</p>
                        <p className="queryName">{data.BQ_Description}</p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalyticParameters;
