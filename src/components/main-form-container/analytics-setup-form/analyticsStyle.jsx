import React, { useEffect, useState } from "react";
import axios from "axios";
import "./analyticsStyle.css";
import { useContext } from "react";
import AppContext from "../../../context/AppContext/AppContext";
import wfpreview from "../../../images/wfpreview.png";
import search from "../../../images/search.png"

const analyticStylesData = [
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These set of queries identify storage in use, not in use, out of use on time based trendlines. These are meant to ensure efficient provisioning and usage of various types of storage.",
    analyticsStyleName: "Storage Consumption",
    createdBy: "Rumman",
    createdOn: "11 Sept 2023, 9:34 am",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These set of AQ’s measure costs in terms of usage, trend line, timeline, use case, actuals analysis for the purpose of optimizing spend.",
    analyticsStyleName: "Costs Appropriation",
    createdBy: "Yogesh",
    createdOn: "11 Oct 2023, 6:45 am",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "This set of queries help the CTO/CIO plan the number of seats needed per platform license by analyzing past historical usage.",
    analyticsStyleName: "Licenses Planning",
    createdBy: "Aarav Patel",
    createdOn: "11 Sept 2023, 3:56 pm",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These set of Analytics queries help measure usage of subsystem in terms of frequency and recency of API calls. The utilization can be measured over time axis with filtering over department, role, type of subsystem etc.",
    analyticsStyleName: "API utilization",
    createdBy: "Diya Sharma",
    createdOn: "11 Mar 2023, 6:35 pm",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These set of analytics help the organization understand departmental or BU behavior wrt consumption of cloud assets. The intent is to measure effective and efficient provisioning and consumption.",
    analyticsStyleName: "Departmental Adoption ",
    createdBy: "Arjun Singh",
    createdOn: "11 Apr 2023, 7:33 am",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These AQs measure consumption of various sub category of products on a cloud platform across roles, costs, timelines.",
    analyticsStyleName: "Product Categorization ",
    createdBy: "Rohan Kumar",
    createdOn: "22 Apr 2023, 8:33 pm",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These analytics queries aim to help  in the planning of budgets. Costs across various time scales, actuals versus budgeted by platform, department, are provided.",
    analyticsStyleName: "Budgetary Distribution",
    createdBy: "Meera Desai",
    createdOn: "28 May 2023, 5:33 pm",
  },
  {
    collectionOfAQs: [],
    analyticsStyleDescription:
      "These set of AQs help identify use cases and scenarios by various roles in the org vis-à-vis the consumption of cloud resources.",
    analyticsStyleName: "Role based Utilization",
    createdBy: "Aniket Verma",
    createdOn: "06 Aug 2023, 9:33 pm",
  },
];

const AnalyticStyle = () => {
  let {
    dashboardState,
    setDashboardState,
    aqStylesPayload,
    setAqstylesPayload,
    setaqArray,
    refreshData,
    setRefreshData,
    selectedIndex,
    setSelectedIndex,
  } = useContext(AppContext);
  let [anlyData, setAnlyData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [filterValue,setFilterValue]=useState("")
  // let [refreshData,setRefreshData]=useState(false)
  const [showAddForm, setShowAddForm] = useState(false);
  const [formdata, setFormdata] = useState({
    analyticsStyleName: "",
    analyticsStyleDescription: "",
    createdBy: "",
    collectionOfAQs: [],
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };
  const resetData = () => {
    setFormdata({
      analyticsStyleName: "",
      analyticsStyleDescription: "",
      createdBy: "",
      collectionOfAQs: [],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newformdata = { ...formdata, createdOn: new Date().toISOString() };
    let formdatajson = JSON.stringify(newformdata);
    console.log(formdatajson);
    try {
      console.log(anlyData, "anlyData in side try catch");
      const response = await axios.post(
        "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65532198a5cb97115f849240/instance",
        formdatajson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.status, "response on submit");
      if (response.data.status == "SUCCESS") {
        console.log("success");
        setRefreshData((prev) => !prev);
        setLoading(false);
      }
    } catch (err) {}
  };
  const convertDateformat = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}, ${formatTime(date)}`;
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (12:00 am)

    // Add leading zero to single-digit minutes
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  }

  const handleAddButtonClick = () => {
    // setShowAddForm(true);
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
  };
  useEffect(() => {
    async function getAnlyStyles() {
      try {
        const anlyData = await axios.get(
          "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65532198a5cb97115f849240/instances/list?size=100"
        );
        console.log("im", anlyData, "data from instances");
        return anlyData.data.entities;
      } catch (err) {
        throw new Error("server down!");
      }
    }
    getAnlyStyles()
      .then((data) => {
        console.log(data, "data from aq");
        setAnlyData(data);
        setLoading(true);
        setShowAddForm(false);
        setSelectedIndex((prev) => {
          if (prev == 0) {
            return data[0].id;
          } else {
            return prev;
          }
        });
        if (selectedIndex == 0) {
          setaqArray(data[0].collectionOfAQs);
          setAqstylesPayload(data[0]);
        } else {
          setaqArray(
            data.filter((single) => single.id == selectedIndex)[0]
              .collectionOfAQs
          );
          setAqstylesPayload(
            data.filter((single) => single.id == selectedIndex)[0]
          );
        }
      })
      .catch((err) => console.log(err));
  }, [refreshData]);
  
  const [flipStates, setFlipStates] = useState({});

  const handleCardClick = (styleData) => {
    setFlipStates((prevStates) => ({
      ...prevStates,
      [styleData.id]: !prevStates[styleData.id],
    }));

    setSelectedIndex(styleData.id);
    setDashboardState(styleData.id);
    setaqArray(styleData.collectionOfAQs);
    setAqstylesPayload(styleData);

    
  };
  return (
    <>
      
        <div className="heading">
          <p>Analytics Jobs</p>
          <div className="searchbar1">
            {/* {!searchPlatformOn && <p id="platformheading">Integrations</p>} */}
          
            {(
              <div className="side-panel-search-input">
                <input
              
                  placeholder="Search..."
                  onChange={(e)=>setFilterValue(e.target.value)}
                />
              </div>
            )}
            <div>
              
              <img
                id="sidepanelimg"
                src={search}
                alt="Search"
                onClick={() => {
                 
                }}
              />
             
            </div>
          </div>
          <button
            className="addAnalyticStylesBtn"
            onClick={handleAddButtonClick}
          >
            +
          </button>
        </div>
        <div className="allCardsContainer">
          {showAddForm ? (
            <form onSubmit={handleSubmit}>
              <div className="addFormContainer">
                <div class="aqformGroup">
                  {" "}
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="analyticsStyleName"
                    onChange={HandleChange}
                    value={formdata.analyticsStyleName}
                    required="true"
                  ></input>
                </div>

              <div className="aqformGroup">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="description "
                  name="analyticsStyleDescription"
                  required="true"
                  value={formdata.analyticsStyleDescription}
                  onChange={HandleChange}
                ></input>
              </div>
              <div className="aqformGroup">
                <label>Created By</label>
                <input
                  type="text"
                  placeholder="created by"
                  name="createdBy"
                  value={formdata.createdBy}
                  required="true"
                  onChange={HandleChange}
                ></input>
              </div>
              <div className="addFormFooter">
                <button className="footerBtn" onClick={resetData}>
                  Cancel
                </button>
                <button className="footerBtn" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : null}
        {isLoading || (
          <div id="loaderContainer">
            <span class="loader"></span>
          </div>
        )}
        <div className="analyticsCardContainer scrollbar">
          {isLoading &&
            anlyData &&
            anlyData.filter(stylesData=>(stylesData?.analyticsStyleName?.toString()
            .toLowerCase().includes(filterValue?.toLowerCase()))||(stylesData?.analyticsStyleDescription?.toString()
            .toLowerCase().includes(filterValue?.toLowerCase()))||(stylesData?.createdBy?.toString()
            .toLowerCase().includes(filterValue?.toLowerCase()))).map((styleData, index) => (
              <div
                key={styleData.id}
                className={`cardContainer ${
                  selectedIndex === styleData.id ? "border-blue" : ""
                } ${flipStates[styleData.id] ? "flipped" : ""}`}
                onClick={() => {
                  handleCardClick(styleData)
                }}
              >
                <div className="styleName">{styleData.analyticsStyleName}</div>
                <div className="styleContent">
                  {styleData.analyticsStyleDescription}
                </div>
                <div className="creationMainContainer">
                  <div className="creatednameContainer">
                    <div className="creationHeading">Created by</div>
                    <div className="creationName">{styleData.createdBy}</div>
                    <div className="creationCompany">{styleData.company}</div>
                  </div>
                  <div className="createdtimeContainer">
                    <div className="creationHeading">Created on</div>
                    <div className="creationName">
                      {convertDateformat(styleData.createdOn)}
                    </div>
                  </div>
                </div>
                <div className="cardBack">
                    <img src={wfpreview} alt="Back Image" width="100%" height="150px"/>
                  </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AnalyticStyle;
