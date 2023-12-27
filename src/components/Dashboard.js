import "../styles/Dashboard.css";
import "../styles/DashboardModal.css";
import BasicLineChart from "./Charts/BasicLineChart";
import DoubleYAxisLineCharts from "./Charts/DoubleYAxisLineCharts";
import GradientStackedAreaChart from "./Charts/GradientStackedAreaChart";
import PieChart from "./Charts/PieChart";
import WaterfallChart from "./Charts/WaterfallChart";
import PolarBarChart from "./Charts/PolarBarChart";
import { Component, useEffect, useState } from "react";
import DashboardModal from "./DashboardModal";
import AppContext from "../context/AppContext/AppContext";
import { useContext } from "react";
import HorizontalPieCharts from "./Charts/HorizontalPieCharts";
import StackedBarChart from "./Charts/StackedBarChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidePanelForDahBoard from "./SidePanelForDashBoard";
import Cost_yoy from "../context/AppContext/Costyoy";
import Cost_mom from "../context/AppContext/Cost_mom";
import Cost_qoq from "../context/AppContext/Cost_qoq";
import Costconsumption from "../context/AppContext/Costconsumption";
import StorageGraphYearly from "../context/AppContext/StorageGraphYearly";
import StorageGraph_monthly from "../context/AppContext/Storagegraph_month";
import StorageGraph_Daily from "../context/AppContext/Storage_daily";
let componets={
  "Cost":[{graphname:"Yearly Costs",Con:Cost_yoy},{graphname:"Consumption Costs",Con:Costconsumption},{graphname:"Quaterly Costs",Con:Cost_qoq}],
  "Usage":[{graphname:"Storage Consumption",Con:StorageGraphYearly},{graphname:"Storage Consumption monthly",Con:StorageGraph_monthly},{graphname:"Storage Consumption Daily",Con:StorageGraph_Daily}]
}
let LicencesGraph =[{
  graphname:"Users Count",url:"https://cdn.gaiansolutions.com/index.html?tenantId=618b6fdef5dacc0001a6b1b0&appId=6582f24cccf5af48cea247ac&disableTV=true&newdesigner=true"
},{
  graphname:"Most Used Licences",url:"https://cdn.gaiansolutions.com/index.html?tenantId=618b6fdef5dacc0001a6b1b0&appId=6583caa1d7a20b0f88d5c5cd&disableTV=true&newdesigner=true"
},
{graphname:"Licences used QoQ",url:"https://cdn.gaiansolutions.com/index.html?tenantId=618b6fdef5dacc0001a6b1b0&appId=65830163ccf5af48cea24806&disableTV=true&newdesigner=true"}
]

function Dashboard({ dashboardChoice }) {
  // set display for dashboard modal
  const [modalDisplay, setModalDisplay] = useState(false);
  // set which graph will be displayd in modal
  const [showSummary,setShowSummary]=useState(true)
  const [selectSummary,setSelectsummary] =useState("Cost")
  const [showLicences,setShowLicences]=useState(false)
  const [dashboardModalGraph, setDashboardModalGraph] = useState(0);
  let { dashboardState, selectedAQobject, setSelectedAQobject, aqArray,aqStylesPayload,setAqstylesPayload } =
    useContext(AppContext);



    const [graphindex,setgraphindex]=useState()



  // function to toggle modal
  function displayModal(index) {

    setModalDisplay(true);

    setgraphindex(index)

    setDashboardModalGraph('PolarBarChart');


    console.log("index",index)


  }

  const navigate = useNavigate();
  const [graphlist, setgraphlist] = useState([]);
  
  const [expandSideBar , setExpandSideBar] = useState(false)
  console.log("dashboard is refreshed",graphlist,"selected aqobject", aqStylesPayload)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aqlist = await axios.get(
          "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65523f7a060abb4a5ff3c0c4/instances/list?size=100"
        );
        // console.log("Data from API:", aqlist);

        const filteredBqData =
          aqlist.data.entities.length > 0 &&
          aqlist.data.entities.filter((data) => aqArray.includes(data.BQ_Id));

        // console.log("filteredBqData", filteredBqData);

       let filterdata= []
        filteredBqData.forEach((data) => {
         
             filterdata.push({ titile: data.BQ_Name,
              description: data.BQ_Description,
              urls: data.BA_App_Urls,
            })
          
        });
        setgraphlist(filterdata)

        // if (filteredBqData.length == 0) {
        //   navigate("/setup/analytics");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [aqArray]);

  useEffect(() => {
    // console.log("graphlist", graphlist);
  }, [graphlist]);
  useEffect(()=>{
    // return ()=>{
    //   setgraphlist([])
    // }
  },[])

  return (
    <div className="Dashboard">
      <SidePanelForDahBoard expandSideBar={expandSideBar}  setExpandSideBar={setExpandSideBar} modalDisplay={modalDisplay} setShowSummary={setShowSummary} setSelectsummary={setSelectsummary}  setShowLicences={setShowLicences}/> 
      <div className="dasboard-button">
         <div className="dashboard-title">{showSummary?selectSummary:aqStylesPayload?.analyticsStyleName}</div>
        <div className="dashboard-top-row" >
          <div className="dashboard-top-left-column">
          {(!showSummary && !showLicences) && graphlist.map((content, index) => (
            <div className="dashboard-top-left-graph" key={index} onClick={() => displayModal(index)} style={{cursor:"pointer"}}>
            <div className="graph-title"  style={{fontWeight:"500",fontSize:"18px"}}>{content.titile}</div>
            <iframe
              src={content.urls[0].replace(/^http:/, 'https:')}
              width="100%"
              height="400"
              style={{ position: "relative", pointerEvents: "none"}}
            ></iframe>
          </div>
          
          ))}{
            (showSummary && !showLicences) &&
            componets[selectSummary]?.map(({ graphname, Con }, index) => (
              graphname.substring(0, 4).toLowerCase() === "cost" ?
                (
                  <div className={`dashboard-top-left-graph dashboard-top-left-graph-broad`} id="less-width" key={index} style={{ cursor: "pointer" }}>
                    <div className="graph-title" style={{marginBottom:'30px',fontSize:'18px',fontWeight:'500'}}
>{graphname}</div>
                    <Con />
                  </div>
                ) 
                :
                (
                  <div className={`dashboard-top-left-graph dashboard-top-left-graph-broad`} key={index} style={{ cursor: "pointer" }}>
                    <div className="graph-title" style={{marginBottom:'30px',fontSize:'18px',fontWeight:'500'}} >{graphname}</div>
                    <Con />
                  </div>
                )
            ))
          }
          {
            (showLicences && showSummary) && LicencesGraph.map((content, index) => (
              <div className="dashboard-top-left-graph" key={index} style={{cursor:"pointer"}}>
              <div className="graph-title" style={{fontSize:"18px",fontWeight:"500"}} >{content.graphname}</div>
              <iframe
                src={content.url.replace(/^http:/, 'https:')}
                width="100%"
                height="400"
                style={{ position: "relative", pointerEvents: "none"}}
              ></iframe>
            </div>
            
            ))
            
          }
          
        </div>
        </div>
      </div>

      {modalDisplay && (
        <DashboardModal
          dashboardModalGraph={dashboardModalGraph}

          graphindex={graphindex}
         setgraphindex={setgraphindex}
          setModalDisplay={setModalDisplay}
          graphlist={graphlist}
        />
      )}
      {/* {

(modalDisplay&&showSummary) && (
        <DashboardModal
          dashboardModalGraph={"PieChart"}

          graphindex={graphindex}
         setgraphindex={setgraphindex}
          setModalDisplay={setModalDisplay}
          graphlist={graphlist}
          showSummary={showSummary}
          selectSummary={selectSummary}
        />
      )
      } */}
    </div>
  );
}

export default Dashboard;
