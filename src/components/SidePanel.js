import React, { useEffect, useState } from "react";
import "../styles/SidePanel.css";
import search from "../images/search.png";
import integrationIcon from "../images/bqLogsApipercentage.png";
import createIntIcon from "../images/apiadditionplussymbol.png";
import sort from "../images/sort.png";
import tagImage from "../images/settingsVertical.png";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useLocation } from "react-router-dom";
import upArrow from "../images/upArrow.svg";
import sideArrow from "../images/sideArrow.svg";
import plusIcon from "../images/plusIcon.svg";
import { useContext } from "react";
import AppContext from "../context/AppContext/AppContext";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import dashLayout from "../images/summary.png.png";

export default function SidePanel() {
  let {
    platformSetUp,
    selectedIntegration,
    setPlatformSetUp,
    setSelectedPlatform,
    selectedPlatform,
    setSelectedIntegration,
    newIntegration,
    setNewIntegration,
    setSchemadata,
    currentPath,
    setCurrentPath
  } = useContext(AppContext);

  const [activeApi, setActiveApi] = useState(null);
  const [activePlatform, setActivePlatform] = useState("");
  const [searchPlatform, setSearchPlatform] = useState("");
  const [searchPlatformOn, setSearchPlatformOn] = useState(false);
  const [sortPlatformSetup, setSortedPlatformSetup] = useState([]);
  const [sortedOrder, setSortedOrder] = useState("asc");
  const [defaultPlatform, setDefaultPlatform] = useState("abc");
  const [tagSearch, setTagSearch] = useState(false);
  const [InputTag, setInputTag] = useState([]);
  const [alldata, setAllData] = useState({
    platform_name: "Summary",
    platform_icon_url:
      "https://cdn.aidtaas.com//321ff654/designer/321t654/116e802e-dedd-4522-ba96-1c420f6428af_$$okta_logo.png",
    platform_url: "https://www.okta.com/",
    platform_description:
      "Okta gives you a neutral, powerful and extensible platform that puts identity at the heart of your stack. No matter what industry, use case, or level of support you need, we’ve got you covered.",
    platform_doc_url: "https://developer.okta.com/docs/reference/",
    platform_git_url: "https://github.com/okta/okta-sdk-java",
    integrations: ["Cost", "Usage", "Application"],
    platform_tags: ["okta", "access", "management"],
  });

  const [activeTab, setActiveTab] = useState(""); //for color change
  const location = useLocation();
  const navigate = useNavigate();
  const APP_SCHEMA_URL =
    // "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instances/list";
    "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instances/list";

  const ANALYTIC_URL =
    "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/65532198a5cb97115f849240/instances/list";
  const [analyticList, setAnalyticList] = useState();

  useEffect(() => {
    if (!newIntegration) {
      // platform_api_call();
      setSortedPlatformSetup([...platformSetUp]);
    } else {
      platform_new_integration_function();
    }
  }, [newIntegration, platformSetUp]);

  useEffect(() => {
    platform_api_call();
    analytic_api_call();
  }, []);

  // Function to make api call for analytic data
  async function analytic_api_call() {
    try {
      const res = await fetch(ANALYTIC_URL);
      const res_data = await res.json();

      const analyticsStyleName_list = res_data?.entities;
      console.log(analyticsStyleName_list);
      setAnalyticList([...analyticsStyleName_list]);
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error("Error fetching or parsing data:", error);
    }
  }

  const goToRoot = () => {
    const basePath = "/setup/platform"; // Your desired route

    const currentPathSegments = location.pathname.split("/").filter(Boolean);
    const levelsToRoot = currentPathSegments.length - 1; // Get current depth

    // Construct the path to the desired route based on the current depth
    const navigatePath = Array(levelsToRoot).fill("..").join("/") + basePath;
    navigate(navigatePath); // Navigate dynamically to the desired route
  };

  const handleNewIntegrationSetup = () => {
    setNewIntegration({ flag: true });
    goToRoot();
  };
  // Function to make api call
  async function platform_api_call() {
    try {
     
      // const res = await fetch(APP_SCHEMA_URL);
      // const res_data = await res.json();
      // setSchemadata(res_data?.entities[0]);

      // const platforms_List = res_data?.entities.find(
      //   (data) => data.UserId === "TestUser1"
      // )?.PlatformSchemas;

      // if (platforms_List && platforms_List.length > 0) {
      //   setPlatformSetUp(platforms_List);
      //   setActivePlatform(platforms_List[0]?.platform_name);
      //   setSelectedPlatform(platforms_List[0]);
      //   setSortedPlatformSetup(platforms_List);
      //   setDefaultPlatform(platforms_List[0]?.platform_name);
      //   setActiveTab(platforms_List[0]?.platform_name)
      
      const res = await fetch(APP_SCHEMA_URL);
      const res_data = await res.json();
      let plaforms_List = res_data?.entities[0]?.PlatformSchemas;
      setSchemadata(res_data?.entities[0]);
      setPlatformSetUp(plaforms_List);
      setSortedPlatformSetup(plaforms_List);
      setActivePlatform(plaforms_List[0]?.platform_name);
      setDefaultPlatform(plaforms_List[0]?.platform_name);
      setActiveTab(plaforms_List[0]?.platform_name)
      // setSelectedPlatform(plaforms_List[0]);

      const platforms_List = res_data?.entities.find(
        (data) => data.UserId === "TestUser1"
      )?.PlatformSchemas;

      if (platforms_List && platforms_List.length > 0) {
        setPlatformSetUp(platforms_List);
        setActivePlatform(platforms_List[0]?.platform_name);
        setSelectedPlatform({...platforms_List[0]});
      } else {
        // Handle case when no platforms are found for the user
        console.error("No platforms found for TestUser1");
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error("Error fetching or parsing data:", error);
    }
  }

  const [selectedIntegrationName, setSelectedIntegrationName] = useState("");

  //Function to empty the states
  function platform_new_integration_function() {
    setSelectedPlatform({
      platform_name: "",
      platform_icon_url: null,
      platform_url: "",
      platform_description: "",
      platform_doc_url: "",
      platform_git_url: "",
      integrations: [],
    });
  }

  const handleSort = () => {
    const sorted = [...sortPlatformSetup];

    if (sortedOrder === "asc") {
      sorted.sort((a, b) => a.platform_name.localeCompare(b.platform_name));
    } else {
      sorted.sort((a, b) => b.platform_name.localeCompare(a.platform_name));
    }
    setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
    setSortedPlatformSetup(sorted);
    // console.log(sortPlatformSetup, sortedOrder);
  };

  const handleTagFilter = async (tag) => {
    setInputTag(tag);
    // console.log(InputTag);
  };

  // here we get integrations from  integration api and map through it and set the data into setIntegration
  async function handleIntegrations() {
    try {
      const res = await axios.get(
        "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd2fd0dcad815a07fd06f/instances/list"
      );

      console.log("res", res.data);
      if (res.data.entities) {
        const entityData = res.data.entities.find(
          (data) => data.Integration_Name == selectedIntegrationName
        );

        if (entityData) {
          // Handle the found entity, e.g., set state or perform actions
          setSelectedIntegration(entityData);
          console.log("Found entity:", entityData);
        } else {
          // Handle case when no matching integration is found
          console.error("No matching integration found");
        }
      }
    } catch (error) {
      // Handle axios request or other potential errors
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    console.log(` here ${activeTab}`);
  }, [activeTab]);

  useEffect(() => {
    let platformList = [...platformSetUp];
    let filteredArrays = platformList.filter((platform) => {
      return InputTag.every((value) =>
        platform.platform_tags ? platform.platform_tags.includes(value) : null
      );
    });
    setSortedPlatformSetup([...filteredArrays]);
    handleIntegrations();
  }, [InputTag, selectedIntegrationName]);

  return (
    <>
      {" "}
      <div className="sidepanel">
        <div className="sidepanel-top-part">
          {/* platforms top navbar */}
          <div className="searchbar">
            {!searchPlatformOn && <p id="platformheading">Integrations</p>}
            {searchPlatformOn && (
              <div className="side-panel-search-input">
                <input
                  onChange={(e) => setSearchPlatform(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            )}
            <div>
              <img
                id="sidepanelimg"
                src={sort}
                alt="Sort"
                onClick={handleSort}
              />
              <img
                id="sidepanelimg"
                src={search}
                alt="Search"
                onClick={() => {
                  setSearchPlatformOn((prev) => !prev);
                }}
              />
              <img
                id="sidepanelimg"
                src={tagImage}
                alt="SettingsVertical"
                onClick={() => setTagSearch((prev) => !prev)}
              />
            </div>
          </div>
          {tagSearch ? (
            <div className="tagSearch-Container">
              <TagsInput
                value={InputTag}
                onChange={handleTagFilter}
                name="tags"
                placeHolder="enter tags and press enter"
              />
            </div>
          ) : (
            ""
          )}
          {/* Render list of platforms  */}

          <Accordion defaultActiveKey="1">
            <Accordion.Item>
              <Accordion.Header>
                <div
                  className={` bqHeadingParent ${
                    activeTab === "Summary" ? "activeApi" : ""
                  }`}
                  onClick={() => {
                    // navigate("/setup/platform"); //chnage this
                    // setSelectedPlatform({ ...alldata });
                    setActiveTab("Summary");
                    // controlls accordian collapse on each platform element
                    setActivePlatform((prev) => {
                      if (defaultPlatform === "Summary") {
                        setDefaultPlatform(null);
                      } else {
                        if (prev === "") {
                          prev = "Summary";
                        } else {
                          if (prev === "Summary") {
                            prev = "";
                          } else {
                            prev = "Summary";
                          }
                        }
                      }

                      return prev;
                    });
                    navigate('/')
                  }}
                >
                  <div className="bqLogoParent" id="summary">
                    <img id="bqLogo" src={dashLayout} />
                  </div>
                  <div className="bqHeadingNameParent">
                    <p id="bqHeadingName">{alldata.platform_name}</p>
                  </div>
                  {/* <div className="bqApisNumberParent">
                    <div id="bqApisNumber">{alldata.integrations?.length}</div>
                  </div> */}
                </div>
              </Accordion.Header>
            </Accordion.Item>
            {sortPlatformSetup
              .filter((platform) =>
                platform?.platform_name
                  ?.toString()
                  .toLowerCase()
                  .includes(searchPlatform?.toLowerCase())
              )
              .map((platform) => (
                <Accordion.Item
                  key={platform?.platform_name}
                  eventKey={platform?.platform_name?.toString()}
                >
                  <Accordion.Header>
                    <div
                      className={` bqHeadingParent ${
                        platform?.platform_name === activeTab ? "activeApi" : ""
                      }`}
                      onClick={() => {
                        navigate("/setup/platform");
                        setActiveTab(platform?.platform_name);
                        setSelectedPlatform({ ...platform });
                        // controlls accordian collapse on each platform element
                        setActivePlatform((prev) => {
                          if (defaultPlatform === platform?.platform_name) {
                            setDefaultPlatform(null);
                          } else {
                            if (prev === "") {
                              prev = platform?.platform_name;
                            } else {
                              if (prev === platform?.platform_name) {
                                prev = "";
                              } else {
                                prev = platform?.platform_name;
                              }
                            }
                          }

                          return prev;
                        });
                      }}
                    >
                      <div className="bqLogoParent">
                        <img id="bqLogo" src={platform?.platform_icon_url} />
                      </div>
                      <div className="bqHeadingNameParent">
                        <p id="bqHeadingName">{platform?.platform_name}</p>
                      </div>
                      <div className="bqApisNumberParent">
                        <div id="bqApisNumber">
                          {platform?.integrations?.length}
                        </div>
                      </div>
                      <div id="bqArrowParent">
                        {activePlatform === platform?.platform_name ? (
                          <img
                            className="side-panel-accordion-arrows"
                            id="upArrow"
                            src={upArrow}
                            // controls arrow image based on dropdown collapse state

                            alt="upArrow"
                          />
                        ) : (
                          <img
                            className="side-panel-accordion-arrows"
                            id="upArrow"
                            src={sideArrow}
                            // controls arrow image based on dropdown collapse state
                            alt="upArrow"
                          />
                        )}
                      </div>
                    </div>
                  </Accordion.Header>
                  {/* Render list of integrations  */}
                  <Accordion.Body>
                    {platform?.integrations.map((integration, index) => {
                      return (
                        <div
                          className={` bqLogsApiHeading ${
                            integration === activeTab ? "activeApi" : ""
                          }`}
                          key={index}
                          onClick={() => {
                            console.log(index);
                            console.log("integration", integration);
                            setActiveTab(integration);

                            setSelectedIntegrationName(integration);

                            navigate("/integration");
                            setCurrentPath("/integration")
                          }}
                        >
                          <div className="bqLogsApiLogoParent">
                            <img id="bqLogsApiLogo" src={integrationIcon} />
                          </div>
                          <div className="bqLogsApiHeadingNameParent">
                            {/* <p>{integration["Integration Name"]}</p> */}

                            <p>{integration}</p>
                          </div>
                        </div>
                      );
                    })}
                    {/* create integration button  */}
                    <div
                      className="bqLogsApiHeading"
                      onClick={() => {
                        setSelectedIntegration({});
                        navigate("/integration");
                        setCurrentPath("/integration")
                      }}
                    >
                      <div className="bqLogsApiLogoParent">
                        <img src={createIntIcon} />
                      </div>
                      <div className="bqLogsApiHeadingNameParent">
                        <p className="create">Create Integration</p>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
        <div className="sidepanel-bottom-part">
          <span>
            <img
              src={plusIcon}
              alt=""
              srcset=""
              onClick={handleNewIntegrationSetup}
            />
          </span>
        </div>
      </div>
    </>
  );
}
