import { useState, useRef } from "react";
import "./PlatformSetUp.css";
import { useContext } from "react";
import AppContext from "../../../context/AppContext/AppContext";
import GithubRightPanel from "../github-right-panel/githubRightPanel";
import pencilSvg from "./image/Pencil.svg";
import { logDOM } from "@testing-library/react";
import { TagsInput } from "react-tag-input-component";
const APP_SCHEMA_URL = "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instance?upsert=true"
const POST_URL =
  "https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655dd4db0dcad815a07fd071/instance?upsert=true";
const POST_IMG_URL =
  "https://ig.aidtaas.com/content-service/v1.0/content/upload/123/64e1fd3d1443eb00018cc231/64e1fd3d1443eb00018cc231?overrideFile=true";
function PlatformSetUp() {
  let {
    selectedPlatform,
    setSelectedPlatform,
    newIntegration,
    setNewIntegration,
    schemaData,
    platformSetUp,
    setPlatformSetUp,
  } = useContext(AppContext);
  
  const [visitedLinks , setVisitedLinks] = useState([]) //needs to be empties when user logouts
  let [gitUrlInput, setGitUrlInput] = useState(
    selectedPlatform?.platform_git_url
  );
  let [gitToken, setGitToken] = useState("");
  let [triggerCall, settriggerCall] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [InputTag, setInputTag] = useState([]);
  // console.log("PL " + triggerCall);
  
  //to handle the color of visited links
  const handleLinkVisited = (newLink) => {
    // console.log("Link clicked:", newLink);
    if (visitedLinks.indexOf(newLink) === -1) {
    setVisitedLinks(prev => [...prev , newLink])
  }
  // console.log(visitedLinks);
  }


//handling adding new platform 
  async function handleSavePlatform() {
    const data = {
      ...schemaData,
    };
    const platformsArray = data.PlatformSchemas;
    selectedPlatform.platform_tags = [...InputTag];
    platformsArray.push(selectedPlatform);
    data.PlatformSchemas = [...platformsArray];
    // data.platform_tags = [...InputTag]
    console.log(data.PlatformSchemas);
    try {
      const response = await fetch(POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response) {
        throw new Error("Response is undefined.");
      }

      if (!response.ok) {
        // Handle non-successful responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setPlatformSetUp([...platformsArray]);
      
    } catch (err) {
      console.error("Error posting data:", err.message);
    }
    setNewIntegration(false);
    setSelectedPlatform(platformSetUp[0])
  }

  const handleImageUpload = async (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(POST_IMG_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        console.error(`Image Upload Failed in db ${response.data}`);
      } else {
        const data = await response.json();
        // console.log(`Image upload successfull ${data.url}`);
        selectedPlatform.platform_icon_url =data.url;
      }
    } catch (err) {
      console.error("Error in uploading Image ", err);
    }
  };

  return (
    <section style={{ display: "flex",height:"calc(100vh - 130px)" }} className="platform-github-container">
      <div className="platform-set-up-container">
        <div className="platform-set-up-details-1">
          <div className="platform-set-up-details-1-left">
            Platform Icon <br />
            {selectedPlatform?.platform_icon_url ? (
              <img
                src={selectedPlatform?.platform_icon_url}
                alt="icon here"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <span className="img-alt">your image here</span>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <span
              className="platform-set-up-details-1-left-edit-btn"
              onClick={handleImageUpload}
            >
              <span>
                <img src={pencilSvg} alt="" />
              </span>
              <span>Edit</span>
            </span>
          </div>
          <div className="platform-set-up-details-1-right">
            Platform Name <br />
            <input
              type="text"
              placeholder="Platform name"
              value={
                selectedPlatform.platform_name
                  ? selectedPlatform.platform_name
                  : ""
              }
              onChange={(e) =>
                setSelectedPlatform({
                  ...selectedPlatform,
                  platform_name: e.target.value,
                })
              }
            />{" "}
            <br />
            Platform Url <br />
            <input
              type="text"
              placeholder="Platform Url"
              className={`${
                !newIntegration ? 'clickable-link' : ''
              } ${visitedLinks.includes(selectedPlatform.platform_url) ? 'visited-link' : ''}`}
              
              // readOnly
              onClick={() => {
                if (selectedPlatform.platform_url) {
                  window.open(selectedPlatform.platform_url, "_blank");
                }
                handleLinkVisited(selectedPlatform.platform_url)
              }}
              value={selectedPlatform.platform_url}
              onChange={(e) =>
                setSelectedPlatform({
                  ...selectedPlatform,
                  platform_url: e.target.value,
                })
              }
            />{" "}
            <br />
            {selectedPlatform?.integrations?.length} Total APIs found
          </div>
        </div>
        <div className="platform-set-up-details-2">
          Platform Description <br />
          <textarea
            placeholder="Enter description"
            value={selectedPlatform.platform_description}
            onChange={(e) =>
              setSelectedPlatform({
                ...selectedPlatform,
                platform_description: e.target.value,
              })
            }
          />
          Documentation URL <br />
          <input
            type="text"
            placeholder="Documentation URL"
            value={selectedPlatform.platform_doc_url}
            onChange={(e) =>
              setSelectedPlatform({
                ...selectedPlatform,
                platform_doc_url: e.target.value,
              })
            }
            className={`${
              !newIntegration ? 'clickable-link' : ''
            } ${visitedLinks.includes(selectedPlatform.platform_doc_url) ? 'visited-link' : ''}`}
            // readOnly
            onClick={() => {
              if (selectedPlatform.platform_doc_url) {
                window.open(selectedPlatform.platform_doc_url, "_blank");
              }
              handleLinkVisited(selectedPlatform.platform_doc_url)
            }}
          />{" "}
          <br />
          Git URL <br />
          <input
            type="text"
            value={selectedPlatform.platform_git_url}
            onChange={(e) =>
              setSelectedPlatform({
                ...selectedPlatform,
                platform_git_url: e.target.value,
              })
            }
            className={`${
              !newIntegration ? 'clickable-link' : ''
            } ${visitedLinks.includes(selectedPlatform.platform_git_url) ? 'visited-link' : ''}`}
            // readOnly
            onClick={() => {
              if (selectedPlatform.platform_git_url) {
                window.open(selectedPlatform.platform_git_url, "_blank");
              }
              handleLinkVisited(selectedPlatform.platform_git_url)
            }}
            placeholder="Enter Git Repo Url"
          />{" "}
          <br />
          Git Token <br />
          <input
            type="text"
            placeholder="Enter Git Token"
            onChange={(e) => {
              setGitToken(e.target.value);
            }}
          />{" "}
          {newIntegration ? (
            
            <div className="tag-container">
            Add Tags
            {/* <pre>{JSON.stringify(InputTag)}</pre> */}
            <TagsInput
              value={InputTag}
              onChange={setInputTag}
              name="tags"
              placeHolder="enter tags"
            />
            <em>press enter to add new tag</em>
          </div>
          ) : (
            ""
          )}
          <button
            // disabled={!gitUrlInput || !gitToken}
            onClick={() => {
              settriggerCall((prev) => !prev);
            }}
          >
            Get Repo
          </button>
          {newIntegration ? (
            <button
              className="new-platform-save-btn"
              onClick={handleSavePlatform}
            >
              SAVE
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {gitUrlInput && (
        <GithubRightPanel
          gitUrl={selectedPlatform.platform_git_url}
          gitToken={gitToken}
          triggerCall={triggerCall}
        />
      )}
    </section>
  );
}

export default PlatformSetUp;
