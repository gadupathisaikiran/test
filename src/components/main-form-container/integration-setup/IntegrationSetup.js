import "./IntegrationSetup.css";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../../../context/AppContext/AppContext";
import axios from "axios";

function IntegrationSetup() {
  let {
    selectedIntegration,
    setSelectedIntegration,
    selectedPlatform,
    setPlatformSetUp,
    setapidatalist,
    apidatalist,
    appState1,
    setAppState1
  } = useContext(AppContext);

  const [filteredRes, setFilteredRes] = useState("");
  const [visitedLink, setVisitedLink] = useState([]); //for visited link color change

  //for visited link color change
  const handleLinkVisit = (inputLink) => {
    const isPresent = visitedLink.indexOf(inputLink);
    if (isPresent === -1) {
      setVisitedLink((prev) => [...prev, inputLink]);
    }
    console.log(visitedLink);
  };

  // this updated res we need to send to post api

  // get response
  async function fetchData() {
    const APP_SCHEMA_URL =
      "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instances/list";

    try {
      const res = await fetch(APP_SCHEMA_URL);
      const res_data = await res.json();

      if (res_data.entities) {
        const filteredRes = res_data.entities.find(
          (data) => data.UserId === "TestUser1"
        );

        if (filteredRes.id) {
          setFilteredRes(filteredRes);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedPlatform]);
  async function fetchApiData() {
    // list of schema ids
  
  
  
    let listofschemaids 
  
  if(selectedPlatform&&selectedPlatform.platform_name=="BigQuery"){
  
  
    listofschemaids=["655ed5aa7c8ba57caa377dd3", "655eeb6ed475d34964c35d48", "655f020059570d3e165fdbe9","65673c6219b2493ebae30029"]
  
  
  }
  
  if(selectedPlatform&&selectedPlatform.platform_name=="OKTA"){
  
  
    listofschemaids=["655f271b53f7d870cf3903d0", "655f286659570d3e16625690", "655f29cc3ca51327c2399986"]
  
  
  }
  
  if(selectedPlatform&&selectedPlatform.platform_name=="Snowflake"){
  
    listofschemaids=["65673b7419b2493ebae3001b"]
  
  
  }
  
  // function to handle dicription
  
  
  function getAPIDescription(apiName) {
    const listOfDis = [
      { name: "GetdatasetsList", dis: "Retrieve information about a specific dataset in Google BigQuery, including details about its schema, tables, and other configurations." },
      { name: "GetTablesList", dis: "Retrieve details about a specific table in Google BigQuery, including its schema, size, and other relevant information." },
      { name: "GetBucketsList", dis: "Obtain information about a specific bucket in Google Cloud Storage, including its metadata, access controls, and other properties." },
      { name: "OKTA_Applications_list", dis: "Retrieve a list of applications registered in Okta, including their configurations." },
      { name: "OKTA_Application_get", dis: "Get a list of users assigned to a specific application in Okta." },
      { name: "OKTA_Application_users", dis: "Retrieve information about users associated with a specific application within the Okta identity and access management system." }
    ];
  
    const apiDescription = listOfDis.find(data => data.name === apiName);
  
    return apiDescription ? apiDescription.dis : "API description not found";
  }
  
  
  
  
  
  
  
  
  
    try {
      const responses = await Promise.all(
        listofschemaids.map(async (data, index) => {
          const res = await axios.get(`https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/${data}/instances/list`);
      
  
          // Add id and name to each item
          const modifiedEntity = {
            id: res.data.entities[0].Api_Name, // Adjust this according to your actual response structure
            name: res.data.entities[0].Api_Name, // Adjust this according to your actual requirements
            children: [],
            selectedOutputParams:[],
            selectedWorkflows: [],
            description:getAPIDescription(res.data.entities[0].Api_Name),   //add description later......
            selected: false,
            inputParams: res.data.entities[0].inputParameters,
  
            
            outputParams: Object.keys(res.data.entities[0].outputParameters)
          }
  
  
          return modifiedEntity;
        })
      );
  
      if (responses) {
        // console.log(responses,apidatalist,"saleemsaleemsaleem")
        // if(appState1.endpoints.length==0){
          setapidatalist(responses)
  console.log("rendered rendered rendered")
        // }
        // else {
        //   setapidatalist(appState1.endpoints)
        // console.log(appState1.endpoints,apidatalist,"refreshed refreshed refreshed")
        // };
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchApiData();
   
  }, [selectedIntegration,selectedPlatform]);
  useEffect(()=>{
    return ()=>{
      console.log("component is unmounted")
      setAppState1({endpoints:[]})}
  },[])
  const handleSubmit = async () => {
    try {
      const updatedData = filteredRes?.PlatformSchemas?.map((data) => {
        if (data.platform_name === selectedPlatform.platform_name) {
          // Check if the integration already exists to avoid duplicates
          if (
            data.integrations.includes(selectedIntegration.Integration_Name)
          ) {
            // Stop the function and display an alert
            throw new Error("Integration already exists!");
          } else {
            // Include the new integration if it doesn't exist
            const updatedIntegrations = [
              ...data.integrations,
              selectedIntegration.Integration_Name,
            ];
            return { ...data, integrations: updatedIntegrations };
          }
        }
        return data;
      });

      // Create a copy of the filteredRes state
      const updatedFilteredRes = { ...filteredRes };

      // Update the PlatformSchemas in the copied state
      if (updatedFilteredRes && updatedData) {
        updatedFilteredRes.PlatformSchemas = updatedData;
      }

      // Update the state using setFilteredRes
      setFilteredRes(updatedFilteredRes);

      // Update selectedIntegration with schemaIds and workflowIds
      const updatedIntegration = {
        ...selectedIntegration,
        schemaIds: selectedIntegration.schemaIds || [],
        workflowIds: selectedIntegration.workflowIds || [],
      };

      // posting data into platform api.

      const platformRes = await axios.post(
        "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instance?upsert=true",
        updatedFilteredRes
      );

      // /posting data into integration api.

      // const integrationRes = await axios.post(
      //   "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd2fd0dcad815a07fd06f/instance",
      //   selectedIntegration
      // );

      const integrationRes = await axios.post(
        "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd2fd0dcad815a07fd06f/instance",
        updatedIntegration
      );

      console.log(
        "updatedFilteredRes",
        "platformRes",
        "integrationRes",
        updatedFilteredRes,
        platformRes,
        integrationRes
      );

      // Update the integration list after submitting the form in the platform setup
      setPlatformSetUp((prevSetups) => {
        const updatedSetups = prevSetups.map((setup) => {
          if (setup.platform_name === selectedPlatform.platform_name) {
            const updatedIntegrations = [
              ...setup.integrations,
              selectedIntegration.Integration_Name, // Assuming Integration_Name holds the new integration data
            ];
            return { ...setup, integrations: updatedIntegrations };
          }
          return setup;
        });
        return updatedSetups;
      });

      // Clear the form inputs and state
      setSelectedIntegration({
        Integration_Name: "",
        Integration_Description: "",
        API_reference: "",
        Documentation: "",
        Operational_Endpoint: "",
        Credentials_type: "username",
        username: "",
        password: "",
        apikey: "",
        schemaIds: [],
        workflowIds: [],
      });
    } catch (error) {
      // Display an alert when the integration already exists
      alert(error.message);
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <div className="integration-setup">
      <div className="integration-setup-container">
        <form className="integration-setup-form">
          <label className="integration-setup-label">Integration Name</label>
          <input
            placeholder="Integration name"
            className="integration-setup-input"
            value={
              selectedIntegration["Integration_Name"]
                ? selectedIntegration["Integration_Name"]
                : ""
            }
            onChange={(e) =>
              setSelectedIntegration({
                ...selectedIntegration,
                Integration_Name: e.target.value,
              })
            }
            // value={integrationName}
            // onChange={handleIntegrationNameChange}
          />
          <label className="integration-setup-label">
            Integration Description
          </label>
          <input
            placeholder="Short description about the integration"
            className="integration-setup-input"
            value={
              selectedIntegration["Integration_Description"]
                ? selectedIntegration["Integration_Description"]
                : ""
            }
            onChange={(e) =>
              setSelectedIntegration({
                ...selectedIntegration,
                Integration_Description: e.target.value,
              })
            }
          />
          <label className="integration-setup-label">API reference</label>
          <input
            placeholder="API reference"
            // className="integration-setup-input clickable-link"
            className={`integration-setup-input clickable-link ${
              visitedLink.includes(selectedIntegration["API_reference"])
                ? "visitedLink"
                : ""
            }`}
            value={
              selectedIntegration["API_reference"]
                ? selectedIntegration["API_reference"]
                : ""
            }
            // readOnly
            onChange={(e) =>
              setSelectedIntegration({
                ...selectedIntegration,
                API_reference: e.target.value,
              })
            }
            onClick={() => {
              if (selectedIntegration["API_reference"]) {
                window.open(selectedIntegration["API_reference"], "_blank");
              }
              handleLinkVisit(selectedIntegration["API_reference"]);
            }}
          />
          <label className="integration-setup-label">Documentation</label>
          <input
            placeholder="Documentation"
            // className="integration-setup-input clickable-link"
            className={`integration-setup-input clickable-link ${
              visitedLink.includes(selectedIntegration["Documentation"])
                ? "visitedLink"
                : ""
            }`}
            value={
              selectedIntegration["Documentation"]
                ? selectedIntegration["Documentation"]
                : ""
            }
            // readOnly
            onChange={(e) =>
              setSelectedIntegration({
                ...selectedIntegration,
                Documentation: e.target.value,
              })
            }
            onClick={() => {
              if (selectedIntegration["Documentation"]) {
                window.open(selectedIntegration["Documentation"], "_blank");
              }
              handleLinkVisit(selectedIntegration["Documentation"]);
            }}
          />
          <label className="integration-setup-label">
            Operational Endpoint
          </label>
          <input
            placeholder="Operational Endpoint"
            // className="integration-setup-input clickable-link"
            className={`integration-setup-input clickable-link ${
              visitedLink.includes(selectedIntegration["Operational_Endpoint"])
                ? "visitedLink"
                : ""
            }`}
            value={
              selectedIntegration["Operational_Endpoint"]
                ? selectedIntegration["Operational_Endpoint"]
                : ""
            }
            // readOnly
            onChange={(e) =>
              setSelectedIntegration({
                ...selectedIntegration,
                Operational_Endpoint: e.target.value,
              })
            }
            onClick={() => {
              if (selectedIntegration["Operational_Endpoint"]) {
                window.open(
                  selectedIntegration["Operational_Endpoint"],
                  "_blank"
                );
              }
              handleLinkVisit(selectedIntegration["Operational_Endpoint"]);
            }}
          />
          <label for="html" className="integration-setup-radio-heading">
            Credentials
          </label>

          <div className="integration-setup-radio-cont">
            <div className="integration-setup-radio">
              <input
                type="radio"
                id="username"
                name="credential_type"
                value="username"
                checked={selectedIntegration?.Credentials_type !== "apikey"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIntegration({
                      ...selectedIntegration,
                      Credentials_type: "username",
                    });
                  }
                }}
              />

              <label
                htmlFor="username"
                className="integration-setup-radio-label"
              >
                Username/Password
              </label>
            </div>
            <div className="integration-setup-radio">
              <input
                type="radio"
                id="api"
                name="credential_type"
                value="api"
                checked={selectedIntegration?.Credentials_type === "apikey"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIntegration({
                      ...selectedIntegration,
                      Credentials_type: "apikey",
                    });
                  }
                }}
              />
              <label htmlFor="api" className="integration-setup-radio-label">
                API Key
              </label>
            </div>
          </div>

          {selectedIntegration?.Credentials_type !== "apikey" && (
            <>
              <label className="integration-setup-label">Username</label>
              <input
                placeholder="Enter"
                className="integration-setup-input-placeholder"
                value={
                  selectedIntegration["username"]
                    ? selectedIntegration["username"]
                    : ""
                }
                style={{ border: "none" }}
                onChange={(e) =>
                  setSelectedIntegration({
                    ...selectedIntegration,
                    username: e.target.value,
                  })
                }
              />
              <label className="integration-setup-label">Password</label>
              <input
                placeholder="Enter"
                className="integration-setup-input-placeholder"
                value={
                  selectedIntegration["password"]
                    ? selectedIntegration["password"]
                    : ""
                }
                style={{ border: "none" }}
                onChange={(e) =>
                  setSelectedIntegration({
                    ...selectedIntegration,
                    password: e.target.value,
                  })
                }
              />
            </>
          )}
          {selectedIntegration?.Credentials_type === "apikey" && (
            <>
              <label className="integration-setup-label">Api Key</label>
              <input
                placeholder="Enter"
                className="integration-setup-input-placeholder"
                value={
                  selectedIntegration["apikey"]
                    ? selectedIntegration["apikey"]
                    : ""
                }
                style={{ border: "none" }}
                onChange={(e) =>
                  setSelectedIntegration({
                    ...selectedIntegration,
                    apikey: e.target.value,
                  })
                }
              />
            </>
          )}
          <button
            type="button"
            className="submitBtn"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default IntegrationSetup;
