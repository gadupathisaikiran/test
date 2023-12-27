import { useEffect, useState } from "react";
import useAppState from "../../../../custom-hooks/useAppState";

const OutputParamsContainer = ({ node, handleOutputParamChange,selectedIntegration,paramschanged}) => {
  const { appState1, setAppState1,apidatalist } = useAppState();
  const [node1, setNode1] = useState({});



  useEffect(() => {
    if (appState1.endpoints && appState1.endpoints.length > 0 && node && node.name) {


      let selectedOutputParamarray = localStorage.getItem(`${selectedIntegration.Integration_Name}_selectedparams`);

      console.log("selectedOutputParamarray_from_outputparams", selectedOutputParamarray);



      if (selectedOutputParamarray && selectedOutputParamarray.length > 0) {
        // Parse the JSON string into an array
        selectedOutputParamarray = JSON.parse(selectedOutputParamarray);

        const foundNode = selectedOutputParamarray.find((data) => data.name === node.name);

        setNode1(foundNode || {})
      }
    }
  }, [node, appState1.endpoints,paramschanged])
  



  console.log("Node1 in output params", node1);




  


  return (
    <ul className="output-params-container">
    {node && node.outputParams
      ? node.outputParams.map((param, indx) => (
          <li
            className={`list-item ${node1.selectedOutputParams &&
              node1.selectedOutputParams.includes(param) ? "bg-blue" : ""}`}
            key={param + indx}
            onClick={() => handleOutputParamChange(node, param)}
          >
            {param}
          </li>
        ))
      : apidatalist[0] && apidatalist[0].outputParams
      ? apidatalist[0].outputParams.map((param, indx) => (
          <li
            className={`list-item ${node1.selectedOutputParams &&
              node1.selectedOutputParams.includes(param) ? "bg-blue" : ""}`}
            key={param + indx}
            onClick={() => handleOutputParamChange(node, param)}
          >
            {param}
          </li>
        ))
      : null}
  </ul>
  
  );
};

export default OutputParamsContainer;
