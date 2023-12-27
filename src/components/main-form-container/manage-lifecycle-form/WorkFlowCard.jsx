import crossIcon from "./cross-icon.svg";
import playIcon from "./play-icon.svg";
import stopIcon from "./stop-icon.svg";
import errorIcon from "./error-icon.svg";
import useAppState from "../../../custom-hooks/useAppState";
import { useEffect } from "react";


export default function WorkFlowCard({wf,apiId,setRenderWorkflow,setWorkflowname,workflowName,SetselectedOptions}){
    const { appState1,setAppState1} = useAppState();
    console.log(wf,apiId,"from workflow card")

    useEffect(()=>{
return ()=>setRenderWorkflow(false)
    },[])
    const handleWorkFlowDeletion = (nodeId, selectedWorkflow) => {
        setAppState1(prevData => {
            console.log(prevData.endpoints,"from handle delete workflow")
          return {endpoints:deleteNode(prevData.endpoints, nodeId, selectedWorkflow)};
        });
        setRenderWorkflow(false)
        SetselectedOptions("")
        console.log("child is clicked")
        // setWorkflowname("")
      };
      
const deleteNode = (nodes, nodeId, workflowid) => {
    
    return nodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          selectedWorkflows: node.selectedWorkflows.filter((e)=>e!=workflowid)
            ,
        };
      } else if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, nodeId, workflowid),
        };
      }
      return node;
    });
  };

return <div className={`workflow-card ${(wf+"r15"+apiId)==workflowName?"workflowselect":""}`} id={wf+apiId} onClick={()=>{setRenderWorkflow(true);setWorkflowname(wf+"r15"+apiId);console.log("parent is clicked")}}>
<div className="left-text">
    <img
        src={crossIcon}
        onClick={() =>
            handleWorkFlowDeletion(
               apiId,
                wf
            )
        }
    />
    <span>{wf}</span>
</div>
<div className="right-btns">
    <img src={playIcon}  style={{cursor:"pointer"}}/>
    <img src={stopIcon} />
    <img src={errorIcon} />
</div>
</div>
}