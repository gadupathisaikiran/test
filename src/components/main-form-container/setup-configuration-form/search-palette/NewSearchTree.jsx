import { Tree } from "react-arborist";
import useAppState from "../../../../custom-hooks/useAppState";
import SearchNode from "./SearchNode";
import "./new-search-tree.css";
import OutputParamsContainer from "./OutputParamsContainer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const NewSearchTree = () => {
  const { appState, setAppState, selectedNode, setSelectedNode, appState1, setAppState1,selectedPlatform,selectedIntegration,apidatalist,setapidatalist} = useAppState();






  const deepCloneAndModifyNode = (treeArray, idToModify, modification) => {
    const cloneNode = (node) => {
      return {
        ...node,
        children: node.children ? node.children.map(cloneNode) : [],
      };
    };




    const findAndModify = (currentNode) => {
      if (currentNode.id === idToModify) {
        // Modify the found node
        return { ...currentNode, ...modification };
      }

      // Recursively search and modify in the children
      return {
        ...currentNode,
        children: currentNode.children ? currentNode.children.map(findAndModify) : [],
      };
    };

    // Deep clone the tree array
    const clonedTreeArray = treeArray.map(cloneNode);



    // Find and modify the node in the cloned tree array
    const modifiedTreeArray = clonedTreeArray.map(findAndModify);


    
    console.log("modifiedTreeArray...in deepclone",modifiedTreeArray)


    return modifiedTreeArray;
  }





const [paramschanged,setparamschanged]=useState(false)




  const handleOutputParamChange = (node, paramName) => {
    if (paramName === '' || !node.selected) {
      return;
    }

    if (appState1 && appState1.endpoints && appState1.endpoints.length === 0 && !appState1.endpoints.some((data) => data.name === node.name)) {
      setAppState1((prev) => ({ ...prev, endpoints: [node] }));
    }

    if (appState1.endpoints && appState1.endpoints.length > 0) {
      const nodeIndex = appState1.endpoints.findIndex((data) => data.name === node.name);

      if (nodeIndex !== -1) {
        const updatedappState1 = appState1.endpoints.map((data, index) => {

          if (index === nodeIndex) {
            const selectedParams = data.selectedOutputParams;
            const foundParam = selectedParams.includes(paramName);

            const updatedParams = foundParam
              ? selectedParams.filter((name) => name !== paramName)
              : [...selectedParams, paramName];

            return { ...data, selectedOutputParams: updatedParams };
          }

          return data;
        })

        setAppState1((prev) => ({ ...prev, endpoints: updatedappState1 }));

      } else {
        // Node not found, push a new node
        setAppState1((prev) => ({ ...prev, endpoints: [...prev.endpoints, node] }))
      }
    }

    const selectedParams = node.selectedOutputParams;
    const foundParam = selectedParams.includes(paramName);

    const updatedParams = foundParam
      ? selectedParams.filter((name) => name !== paramName)
      : [...selectedParams, paramName];

    const modification = {
      selectedOutputParams: updatedParams,
    };

    setAppState1((prev) => {
      const modifiedTreeArray = deepCloneAndModifyNode(prev.endpoints, node.id, modification);

      localStorage.setItem(
        `${selectedIntegration.Integration_Name}_selectedparams`,
        JSON.stringify(modifiedTreeArray)
      );

      return { ...prev, endpoints: modifiedTreeArray };
    });


    setSelectedNode({
      ...node,
      selectedOutputParams: [...updatedParams],
    });





    

    setparamschanged(!paramschanged)

  };







// on move function.........................



  
const onMove = async ({ dragIds, parentId, index }) => {
  try {
    const updated = apidatalist.map((data) => {
      if (data.id === parentId) {
        dragIds.forEach(async (id) => {
          const childIndex = apidatalist.findIndex((child) => child.id === id);

          if (childIndex !== -1) {
            const child = apidatalist[childIndex];

            // Check if outputParams is an array before using some
            if (Array.isArray(data.outputParams) && Array.isArray(child.outputParams)) {
              if (child.outputParams.some((param) => data.outputParams.includes(param))) {
                const existingParentId = apidatalist.findIndex((parent) =>
                  parent.children.some((childId) => childId === child.id)
                );

                if (existingParentId !== -1) {
                  const existingParent = apidatalist[existingParentId];
                  existingParent.children = existingParent.children.filter((childId) => childId !== child.id);
                }

                data.children.push(child);
                const [draggedNode] = apidatalist.splice(childIndex, 1);
              } else {
                alert("Output params are not matching");
              }
            } else {
              // Handle the case where outputParams is not an array
              console.error("OutputParams is not an array");
            }
          }
        });
      } else if (parentId === null) {
        dragIds.forEach((id) => {
          const childIndex = data.children.findIndex((child) => child.id === id);

          if (childIndex !== -1) {
            const [deletedChild] = data.children.splice(childIndex, 1);
            apidatalist.push(deletedChild);
          }
        });
      }

      return data;
    });

    // Filter out items with empty fields
    const filteredUpdated = updated.filter((item) => item.outputParams && item.outputParams.length > 0);

    console.log("final apidatalist", apidatalist);

    setapidatalist([...apidatalist])



    localStorage.setItem(selectedIntegration.Integration_Name,JSON.stringify(apidatalist));

 
  } catch (error) {
    console.error(error);
  }
};



useEffect(()=>{


  setAppState1({...appState1,endpoints:apidatalist})


},[apidatalist,selectedIntegration.Integration_Name])



console.log("selectedIntegration",selectedIntegration)



console.log("appstate1.........in new search tree..,apidatalist",appState1,apidatalist)






const [isMounted, setIsMounted] = useState(true);

// fetch api names with api


  async function fetchApiData() {

    // list of schema ids



    let listofschemaids=[]


    if(selectedIntegration&&selectedIntegration.schemaIds){

           listofschemaids=selectedIntegration.schemaIds

    }




    // if (selectedPlatform && selectedPlatform.platform_name == "BigQuery") {


    //   listofschemaids = ["655ed5aa7c8ba57caa377dd3", "655eeb6ed475d34964c35d48", "655f020059570d3e165fdbe9", "65673c6219b2493ebae30029"]

    // }

    // if (selectedPlatform && selectedPlatform.platform_name == "OKTA") {


    //   listofschemaids = ["655f271b53f7d870cf3903d0", "655f286659570d3e16625690", "655f29cc3ca51327c2399986"]


    // }

    // if (selectedPlatform && selectedPlatform.platform_name == "Snowflake") {

    //   listofschemaids = ["65673b7419b2493ebae3001b"]

    // }
    // if (selectedPlatform && selectedPlatform.platform_name == "Azure ") {

    //   listofschemaids = ["6582bd9670a0fe178870ad7b","6582c14c70a0fe178870add1"]

    // }
     






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

      let res

      const storedState = JSON.parse(localStorage.getItem(selectedIntegration.Integration_Name));
     

      if (isMounted&&!storedState) {


      const responses = await Promise.all(
        listofschemaids.map(async (data, index) => {

        
if (
  selectedPlatform &&
  (selectedPlatform.platform_name === "OKTA Apps" ||
    selectedPlatform.platform_name === "Azure" ||
    selectedPlatform.platform_name === "OpenAI")
) {
  res = await axios.get(
    `https://ig.gaiansolutions.com/tf-web/v1.0/618b6fdef5dacc0001a6b1b0/schemas/${data}/instances/list`
  );
} else {
  res = await axios.get(
    `https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/${data}/instances/list`
  );
}




          // Add id and name to each item
          
          const modifiedEntity = {
            id: res.data.entities[0].Api_Name, // Adjust this according to your actual response structure
            name: res.data.entities[0].Api_Name, // Adjust this according to your actual requirements
            children: [],
            selectedOutputParams: [],
            selectedWorkflows: [],
            description: getAPIDescription(res.data.entities[0].Api_Name),   //add description later......
            selected: false,
            inputParams: res.data.entities[0].inputParameters,
            outputParams: Object.keys(res.data.entities[0].outputParameters)
          }

          return modifiedEntity;
        })
      );

        setapidatalist(responses);
      
      }

      
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    fetchApiData();

    // Cleanup function to set the flag when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);


// Assuming selectedIntegration, setapidatalist, appState1, and apidatalist are defined elsewhere in your component

// Load apidatalist from local storage on component mount
useEffect(() => {
  const storedState = JSON.parse(localStorage.getItem(selectedIntegration.Integration_Name));
  if (storedState) {
    setapidatalist(storedState);

    // Update appState1 with the loaded data
    setAppState1((prev) => ({
      ...prev,
      endpoints: storedState,
    }));

  }

  console.log("apidatalist_appstate1_storedState_selectedIntegration",apidatalist,appState1,"storedState",storedState,selectedIntegration.Integration_Name);

}, [selectedIntegration.Integration_Name]);




// Save apidatalist to local storage whenever it changes
// useEffect(() => {


  
//   localStorage.setItem(selectedIntegration.Integration_Name,JSON.stringify(apidatalist));


// }, [apidatalist,selectedIntegration.Integration_Name]);



useEffect(() => {
  // Check if at least one node is selected in appState1.endpoints
  const isNodeSelected = appState1.endpoints.some((data) => data.selected === true);

  if (!isNodeSelected && apidatalist.length > 0) {
    // If no node is selected, set the first one as selected
    const updatedApidataList = [...apidatalist];
    updatedApidataList[0].selected = true;

    // Check if outputParams is an array before accessing its first element
    if (Array.isArray(updatedApidataList[0].outputParams)) {
      // Ensure selectedOutputParams is initialized as an array
      updatedApidataList[0].selectedOutputParams = updatedApidataList[0].selectedOutputParams || [];

      // Check if selectedOutputParams has length less than 1 before pushing
      if (updatedApidataList[0].selectedOutputParams.length < 1) {
        // Push the first element of outputParams to selectedOutputParams
        updatedApidataList[0].selectedOutputParams.push(updatedApidataList[0].outputParams[0]);
      }
    }

    // Set selectedNode to the first node
    setSelectedNode(updatedApidataList[0]);

    // Update apidatalist state
    setapidatalist(updatedApidataList);

    // Update appState1 with the selected node
    setAppState1({ ...appState1, endpoints: updatedApidataList });

    // Convert the object to a JSON string before storing it in localStorage
    localStorage.setItem(
      `${selectedIntegration.Integration_Name}_selectedparams`,
      JSON.stringify(updatedApidataList)
    );
  }
}, [selectedIntegration, appState1.endpoints, apidatalist]);


useEffect(()=>{
  setAppState1({ ...appState1, endpoints: apidatalist });
},[apidatalist])


const handleDragOver = (event) => {
  event.preventDefault();
  // You can add additional styling or feedback here if needed
console.log("handleDragOver",event)
};





const handleDrop = (event) => {

event.preventDefault();

  const draggedItemId = event.dataTransfer.getData("text/plain");


  console.log("Dropped item id:", draggedItemId);
  // Implement your logic for handling the dropped item
};






  return (
    <section className="search-palette">
      <div className="tree-container">
        <input name="search" id="search" type="text" placeholder="Search for APIs" />

        <ul className="api-palette">
          <Tree
            data={apidatalist} // Use preprocessed data
            width={400}
            rowHeight={50}
            rowClassName="tree-row"
            overscanCount={1}
            paddingBottom={10}
            paddingTop={20}
            willReceiveDrop={false}
            
			        onMove={onMove}
          >
            {SearchNode}
          </Tree>
        </ul>

        <div style={{height:"400px",width:"400px",border:"1px solid black",zIndex:"1000"}} onDragOver={handleDragOver}
        onDrop={handleDrop}
  >


        drop heree
        

        
        </div>
      </div>

      <OutputParamsContainer node={selectedNode} handleOutputParamChange={handleOutputParamChange} appState1={appState1} selectedIntegration={selectedIntegration} paramschanged={paramschanged}/>
    </section>
  );
};

export default NewSearchTree;
