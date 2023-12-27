import SearchPalette from "./search-palette/SearchPalette";
import SetupFormCard from "./setup-form-card/SetupFormCard";
import { useEffect, useState } from "react";
import "./SetupConfigurationForm.css";
import useAppState from "../../../custom-hooks/useAppState";
import NewSearchTree from "./search-palette/NewSearchTree";



const SetupConfigurationForm = () => {


	const {appState1,setAppState1,selectedIntegration} = useAppState();

	const [endpoints, setEndpoints] = useState([]);




	const removeMethod = (id) => {


		const updatedEndpoints = findAndUpdateNode(appState1.endpoints, id, {
			selected: false,
			selectedWorkflows: [],
		});


		console.log("updatedEndpoints",updatedEndpoints.filter((item) => item.selected));
		setAppState1({ ...appState1, endpoints: updatedEndpoints });



    localStorage.setItem(
        `${selectedIntegration.Integration_Name}_selectedparams`,
        JSON.stringify(updatedEndpoints)
      );

		// const filterredappstate1=appState1.endpoints.length>0&&appState1.endpoints.filter((data)=>{data.id!=id})
       

	

		console.log("removeMethod",id,"appState1",appState1)




	};







	const findAndUpdateNode = (treeArray, id, modification) => {
		return treeArray.map((node) => {
			if (node.id === id) {
				// Return a new node with the specified modifications
				return { ...node, ...modification };
			}

			if (node.children && node.children.length > 0) {
				// Recursively search and modify in the children
				return {
					...node,
					children: findAndUpdateNode(
						node.children,
						id,
						modification
					),
				};
			}

			// If the node doesn't match the id and has no children to search
			return { ...node };
		});
	}


	

	const flattenTreeArray = (treeArray, result = []) => {
		treeArray.forEach((node) => {
			// Add the current node to the result array
			result.push({
				...node,
			});

			// Recursively flatten the children
			if (node.children && node.children.length > 0) {
				flattenTreeArray(node.children, result);
			}
		});

		return result;
	};


	let selectedOutputParamarray = localStorage.getItem(`${selectedIntegration.Integration_Name}_selectedparams`);


	// this function is used to filter duplicates................

	const uniqueByPropertyName = (arr, propertyName) => {
		const seen = new Set();
		return arr.filter((item) => {
		  const propertyValue = item[propertyName];
		  if (!seen.has(propertyValue)) {
			seen.add(propertyValue);
			return true;
		  }
		  return false;
		});
	  };
	  



	  useEffect(() => {
		if (selectedOutputParamarray && selectedOutputParamarray.length > 0) {
		  console.log("selectedOutputParamarray_from_setupconfig", selectedOutputParamarray);
	  
		  const parsedOutputParamarray = JSON.parse(selectedOutputParamarray);
	  
		  const flatArray = flattenTreeArray(parsedOutputParamarray);
	  
		  // Remove duplicates based on the 'name' property
		  const uniqueEndpoints = uniqueByPropertyName(flatArray, 'name');
	  
		  setEndpoints(uniqueEndpoints);
		} else {
		  const flatArray = flattenTreeArray(appState1.endpoints);
	  
		  // Remove duplicates based on the 'name' property
		  const uniqueEndpoints = uniqueByPropertyName(flatArray, 'name');
	  
		  setEndpoints(uniqueEndpoints);
		}
	  }, [appState1, selectedIntegration, selectedOutputParamarray]);
	  
	  console.log("flaten_endpoints", endpoints);


	  const handleDrop = (event) => {
		event.preventDefault();
		const draggedItemId = event.dataTransfer.getData("text/plain");
		console.log("Dropped", draggedItemId);
		// Implement your logic for handling the dropped item
	  };
	
	
	



	return (
		<section className="spec-form">
			<div className="form-cards"  onDrop={(e)=>{handleDrop(e)}}>
			{Array.isArray(endpoints) && endpoints.length > 0 &&
				endpoints
				  .filter((item) => item.selected)
				  .map((item, idx) => (
					<SetupFormCard
					  api={item}
					  removeMethod={removeMethod}
					  key={idx}
					/>
				  ))}
			</div>
			{/* <SearchPalette  /> */}
			<NewSearchTree />
		</section>
	);
};

export default SetupConfigurationForm;
