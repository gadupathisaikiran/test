import { useState,useEffect} from "react";
import "./manage-life-cycle.css";
import useAppState from "../../../custom-hooks/useAppState";
import crossIcon from "./cross-icon.svg";
import playIcon from "./play-icon.svg";
import stopIcon from "./stop-icon.svg";
import errorIcon from "./error-icon.svg";
import axios from "axios";
import WorkflowPreview from "./WorkflowPreviewComp";
import ApiWorkFlow from "./ApiWorkFlow";
// import WorkFlowCard from "./WorkFlowCard";
const workflowlist ={
"SnowFlake To Pi": "https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/655b3f70b02e419d90bef8c6",
"GetBucketsList" : "https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/655aebc1e16afff4870c4353",
"GetTablesList" :"https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/655aebc1e16afff4870c4353",
"GetdatasetsList" :"https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/655aebc1e16afff4870c4353",
"OKTA_Applications_User" : "https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/6558e3436a881a9dbcf61679",
"OKTA_Applications_get" : "https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/6558e65c37260dda24f5b1e2",
"OKTA_Applications_list" : "https://cdn.elastic.snaplogic.com/api/1/rest/pipeline/prepare/6558de3451c605f95f2fdd79"
}
const handlePlayBtn = async (data) => {
  // console.log(data)
  const url =workflowlist[data]
  // console.log(url,"from handleplay")
  const pipelineURL = `${url}`;

//   const headers = {
//    " Content-Type": "application/json",
// "Authorization": "Basic bmF2ZWVuLnNhYmF2YXRoQGdhaWFuc29sdXRpb25zLmNvbTpTbmFwTG9naWNANDU0",
// "User-Agent": "PostmanRuntime/7.35.0",
// "Accept":" */*",
// "Cache-Control": "no-cache",
// "Postman-Token": "9e341dbe-c415-4e4b-ba31-cbb6d0246e60",
// "Host": "cdn.elastic.snaplogic.com",
// "Accept-Encoding": "gzip, deflate, br",
// "Connection": "keep-alive",
// "Content-Length": "179"
//   };
console.log("hi sravan")

  const payload = {
    "runtime_path_id": "ConnectFasterInc/rt/cloud/TriggerCloudplex",
    "runtime_label": "TriggerCloudplex",
    "do_start": true,
    "async": true,
    "priority": 10
  };
  try {
    const response = await axios.post(pipelineURL, payload, { headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic bmF2ZWVuLnNhYmF2YXRoQGdhaWFuc29sdXRpb25zLmNvbTpTbmFwTG9naWNANDU0",
      
    } });

    if (response.status === 200) {
      console.log('Pipeline started successfully!');
    } else {
      console.error('Failed to start pipeline:');
    }
  } catch (error) {
    console.error('Error:',error);
  } 
}
const ManageLifeCycleForm = () => {
	const { appState, setAppState,appState1,setAppState1,selectedIntegration} = useAppState();
console.log(appState1,"from managelifecycle guys")


	const handleWorklfowDeletion = (currentApi, index) => {
		const modifiedApi = { ...currentApi };
		modifiedApi.selectedWorkflows = modifiedApi.selectedWorkflows.filter(
			(item, idx) => index !== idx
		);

		const filteredEndpoints = appState1.endpoints.map((api) => {
			if (api.name === currentApi.name) {
				return modifiedApi;
			} else {
				return api;
			}
		});
		setAppState1({
			...appState1,
			endpoints: [...filteredEndpoints],
		});
	};

	const handleWorkflowAddition = (currentApi, workflowName) => {
		if (workflowName != "") {
			const modifiedApi = { ...currentApi };
			modifiedApi.selectedWorkflows.push({ name: workflowName, id: "" });
			const filteredEndpoints = appState1.endpoints.map((api) => {
				if (api.name === currentApi.name) {
					return modifiedApi;
				} else {
					return api;
				}
			});
			setAppState1({
				...appState1,
				endpoints: [...filteredEndpoints],
			});
		}
	};
	
const [renderWorkflow,setRenderWorkflow]=useState(false);
const [workflowName, setWorkflowname]=useState();

// useEffect(()=>{
// 	  let storedstate=appState1.endpoints
// 	  console.log(storedstate,"stored data in managelifecycle")
// 	  if(storedstate.length!==0){
// 	  localStorage.setItem(selectedIntegration.Integration_Name, JSON.stringify(storedstate))
// 	  const storedState = JSON.parse(localStorage.getItem(selectedIntegration.Integration_Name));
// 	  console.log(storedState,"managelifecycle1")
	
// }
// },[appState1.endpoints])




	
	return (
		<div style={{ display: "flex",height:"calc(100vh - 100px)" }}>
			<div className="manage-form-container">
				{/* {appState1.endpoints
					.filter((api) => api.selected)
					.map((api, idx) => (
						<div className="form-group " key={idx}>
							<div className="input-container">
								<p className="api-name">{api.name}</p>
								<label
									className="workflow-label"
									htmlFor={"workflow_" + idx}
								>
									Workflow
								</label>
								<select
									name="workflow"
									id={"workflow_" + idx}
									className="workflow-select"
									onChange={(e) =>
										handleWorkflowAddition(
											api,
											e.target.value
										)
									}
								>
									<option value="">Select a workflow</option>
									<option value="Ingestion workflow">
										Ingestion workflow
									</option>
								</select>
							</div>
							<div className="workflow-container">
								{ api.selectedWorkflows.map((wf, idx) =>(
									<div className="workflow-card" key={idx}>
										<div className="left-text">
											<img
												src={crossIcon}
												onClick={() =>
													handleWorklfowDeletion(
														api,
														idx
													)
												}
											/>
											<span>{wf.name}</span>
										</div>
										<div className="right-btns">
											<img src={playIcon}  onClick={()=>handlePlayBtn(api.name)} style={{cursor:"pointer"}}/>
											<img src={stopIcon} />
											<img src={errorIcon} />
										</div>
									</div>
								))}
							</div>
						</div>
					))} */}
					{
					
					
						// <div className="form-group " key={idx}>
			            //    {
							
						//    }
						// 	<div className="workflow-container">
						// 		{
									
						// 		<WorkFlowCard/>
						// 		}
						// 	</div>
						// </div>
						<ApiWorkFlow data={appState1.endpoints} setRenderWorkflow={setRenderWorkflow} setWorkflowname={setWorkflowname} workflowName={workflowName}/>
							
					}
			</div>
			{
				renderWorkflow && <WorkflowPreview workflowName={workflowName}/>
			}
		</div>
	);
};

export default ManageLifeCycleForm;
