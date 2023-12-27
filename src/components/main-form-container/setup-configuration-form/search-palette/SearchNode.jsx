import { useEffect, useRef, useState } from "react";
import useAppState from "../../../../custom-hooks/useAppState";
import treeLink from "./tree-link.svg";

import DraggableTreeNode from './DraggableTreeNode';



function SearchNode({ node, style, dragHandle, tree }) {
	/* This node instance can do many things. See the API reference. */
	const { setAppState1,appState1,appState, setAppState, selectedNode, setSelectedNode,selectedIntegration } =useAppState();

	const updateNewAppState = (newAppState) => {
	

		
		setAppState1({ ...appState1, endpoints: [...newAppState] });

		localStorage.setItem(
			selectedIntegration.Integration_Name,
			JSON.stringify(newAppState)
		  );

		
		  localStorage.setItem(
			`${selectedIntegration.Integration_Name}_selectedparams`,
			JSON.stringify(newAppState)
		  );



		
	};

	

	// const handleApiSelect = (array, id) => {
	// 	const updatedEndpoints = array.map((api) => {
	// 		const modifiedApi = { ...api };
	// 		if (modifiedApi.children.length > 0) {
	// 			modifiedApi.children = handleApiSelect(
	// 				modifiedApi.children,
	// 				id
	// 			);
	// 		}
	// 		if (modifiedApi.id === id) {
	// 			modifiedApi.selected = !modifiedApi.selected;
	// 			modifiedApi.selectedWorkflows = [];
	// 			console.log("here", modifiedApi);
	// 			return modifiedApi;
	// 		}

	// 		return modifiedApi;
	// 	});
	// 	return updatedEndpoints;
	// };
	// const filterDescendants = (treeArray) => {
	// 	const isDescendant = (node, id) => {
	// 		if (node.children && node.children.length > 0) {
	// 			for (const child of node.children) {
	// 				if (child.id === id || isDescendant(child, id)) {
	// 					return true;
	// 				}
	// 			}
	// 		}
	// 		return false;
	// 	};

	// 	return treeArray.filter(
	// 		(node) => !isDescendant({ children: treeArray }, node.id)
	// 	);
	// };




	useEffect(() => {
		console.log("tree.props.data",tree.props.data[1])
		setAppState1({ ...appState1, endpoints: [...tree.props.data] });


	}, []);




	const handleDragStart = (event, data) => {

		
		event.dataTransfer.setData("text/plain", data);


		console.log("drag_start",data)

	  };
	
	  const handleDragOver = (event) => {
		event.preventDefault();
	  };
	
	  const handleDrop = (event) => {
		event.preventDefault();
		const draggedItemId = event.dataTransfer.getData("text/plain");
		// Implement your logic for handling the dropped item
		console.log("Dropped item id:", draggedItemId);
	  };



	  const [isLongPress, setIsLongPress] = useState(false);

	  const timeoutRef = useRef(null);
	
	  // ... (other functions)
	
	  const handleLongPressStart = () => {
		timeoutRef.current = setTimeout(() => {
		  setIsLongPress(true);
		}, 10); // Adjust the time threshold as needed (in milliseconds)
	  };
	
	  const handleLongPressEnd = () => {
		clearTimeout(timeoutRef.current);
		setIsLongPress(false);
	  };
	







	return (
		<>
		<li
        className="list-item"
        style={{ ...style, cursor: isLongPress ? 'move' : 'auto' }}
        onDragStart={(e) => handleDragStart(e, node.data)}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        ref={dragHandle}

		draggable={true}

      >
        <div className="node-container">
          {node.level > 0 && <img src={treeLink} />}
          <input
            id={node.data.name}
            type="checkbox"
            className="checkbox"
            placeholder="Search for APIs"
            checked={node.data.selected}
            onChange={() => {
              node.data.selected = !node.data.selected;
              updateNewAppState(tree.props.data);
            }}
            style={{ cursor: "pointer" }}
          />
          <label
            className={`${
              selectedNode.id === node.data.id ? "bg-blue" : ""
            }`}
            style={{ cursor: isLongPress ? 'move' : 'pointer' }}
            onClick={() => setSelectedNode(node.data)}
          >
            {node.data.name}
          </label>
        </div>
      </li>
		</>
	);
}

export default SearchNode;
