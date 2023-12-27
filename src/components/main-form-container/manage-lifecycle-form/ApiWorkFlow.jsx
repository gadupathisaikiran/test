import WorkFlowCard from "./WorkFlowCard"

import useAppState from "../../../custom-hooks/useAppState";
import { useState } from "react";


export default function ApiWorkFlow({data,setRenderWorkflow,setWorkflowname,workflowName}){

    const { appState1,setAppState1} = useAppState();
    const [selectedOptions,SetselectedOptions]=useState("")
const workflowarray=[{
  name:"purge workflow",
  value:"purge workflow",
  
},{
  name:"ingestion workflow",
  value:"ingestion workflow"
}]

    console.log(data,"data from newlifecycle")
    const updateNode = (nodes, nodeId, selectedWorkflow) => {
        return nodes.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              selectedWorkflows: [
                ...node.selectedWorkflows,
                selectedWorkflow,
              ],
            };
          } else if (node.children) {
            return {
              ...node,
              children: updateNode(node.children, nodeId, selectedWorkflow),
            };
          }
          return node;
        });
      };

      const handleWorkflowAddition = (nodeId, selectedWorkflow) => {
        if(selectedWorkflow=="")return
        setAppState1(prevData => {
            console.log(prevData.endpoints,"from handle workflow")
          return {endpoints:updateNode(prevData.endpoints, nodeId, selectedWorkflow)};
        });
        // setRenderWorkflow(true);
        // setWorkflowname(selectedWorkflow);
      };
      const handleWorkflowDeletion = (nodeId, selectedWorkflow) => {
        setAppState1(prevData => {
            console.log(prevData.endpoints,"from handle workflow")
          return {endpoints:updateNode(prevData.endpoints, nodeId, selectedWorkflow)};
        });
        
      };
    
return <>	{	data.filter((api) => api.selected).map((api)=>{return <><div id={api.id} className="form-group" >
    <div className="input-container">
<p className="api-name">{api.name}</p>
<label
    className="workflow-label"
    htmlFor={"workflow_"}
>
    Workflow
</label>
<select
    name="workflow"
    className="workflow-select"
    value={workflowName}
    onChange={(e) =>{
      setWorkflowname(e.target.value+"r15"+api.id);
      setRenderWorkflow(true)
        handleWorkflowAddition(
            api.id,
            e.target.value
        );}
    }
>
    <option value="">Select a workflow</option>
    {
      workflowarray.filter((e)=>{return !(api.selectedWorkflows.includes(e.name)) }).map((data)=>{
        return   <option value={data.value}>
        {data.name}
    </option>
      })
    }
</select>
</div>
{
api.selectedWorkflows.map((wf)=>{
    return (<WorkFlowCard wf={wf} apiId={api.id} setRenderWorkflow={setRenderWorkflow} setWorkflowname={setWorkflowname} workflowName={workflowName} SetselectedOptions={SetselectedOptions}/>)
})
}
</div>{api.children?.map((child)=>{return (
<ApiWorkFlow data={[child]} setRenderWorkflow={setRenderWorkflow} setWorkflowname={setWorkflowname} workflowName={workflowName} />)} )}</>})}
</>
}