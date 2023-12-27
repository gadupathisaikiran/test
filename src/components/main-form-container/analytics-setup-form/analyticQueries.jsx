import React, { useEffect, useState } from "react";
import "./analyticQueries.css";
import axios from "axios";


const analyticQueriesData = [
  "Mobius_PI_cost_fluctuation",
  "Mobius_PI_rolling_avg_usage",
  "Mobius_PI_id",
  "Mobius_PI_lowest_cost_fluctuation",
  "Mobius_PI_usage_changes",
  "Mobius_PI_lowest_storage_growth",
  "Mobius_PI_api_call_volume",
  "Mobius_PI_total_cost",
  "Mobius_PI_highest_storage_growth",
  "Mobius_PI_cumulative_usage",
  "Mobius_PI_cost_changes",
  "Mobius_PI_storage_growth",
  "Mobius_PI_user_type",
  "Mobius_PI_time",
  "Mobius_PI_product_type",
  "Mobius_PI_avg_cost_per_usage",
  "Mobius_PI_growth_rate",
  "Mobius_PI_avg_usage_growth_rate",
  "Mobius_PI_cumulative_cost",
  "Mobius_PI_total_usage",
  "Mobius_PI_usage_efficiency_trend",
  "Mobius_PI_avg_cost",
  "Mobius_PI_lowest_usage",
  "Mobius_PI_avg_storage_growth_rate",
  "Mobius_PI_avg_cost_per_storage_growth",
  "Mobius_PI_highest_usage",
  "Mobius_PI_cost_to_usage_ratio",
  "Mobius_PI_peak_hour",
  "Mobius_PI_cost_distribution",
  "Mobius_PI_avg_usage"
];

const AnalyticQueries = () => {
  const[parameters,Setparameters]=useState([])
async function getParametersFromShema(){
try{
const response =await axios.get("https://ig.gaiansolutions.com/tf-web/v1.0/618b6fdef5dacc0001a6b1b0/schemas/6582cfca70a0fe178870ae41/instances/list")
if(response.status==200){
  Setparameters(Object.keys(response.data.entities[0]))
}
}
catch(err){
throw new Error("error fetching paramters data")
}
}
useEffect(()=>{
getParametersFromShema()
},[])

return (
  <>

    <div className="headingAqs">
      <p>Analytics Parameters</p>
      <div className="analyticsQueriesCardContainer scrollbar">

        <div className="allCardsContainerAqs">
          {parameters.map((query, index) => (
            <div key={index} className={`cardContainerAqs ${index % 2 !== 0 ? 'even-bg' : ''}`}>
              {query}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
};

export default AnalyticQueries;
