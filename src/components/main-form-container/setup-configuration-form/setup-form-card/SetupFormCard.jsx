import { useEffect, useState } from "react";
import plusIcon from "./plus-icon.svg";
import crossIcon from "./cross-icon.svg";
import "./setup-form-card.css";
import plusImage from "./Variant6.svg";
import downArrow from "./Frame.svg";
import toggle from "./Toggle.svg";
import { Button } from "bootstrap";

const SetupFormCard = ({ api, removeMethod }) => {








	// const [selectedTag, setSelectedTag] = useState("Primary");

	// const handleTagClick = (currentParam, tag) => {
	// 	// currentParam.tag = tag;
	// };

	const [tags, setTags] = useState([]);


	// const [Outputparameters, setOutputParameters] = useState([
	// 	{ parameter: "", tag: "", property: "" },
	// ]);


	// const handleOutputParameterAddition = () => {
	// 	setOutputParameters([
	// 		...Outputparameters,
	// 		{ parameter: "", tag: "", property: "" },
	// 	]);
	// };




	const getAllTags = async () => {
		try {
			const response = await fetch(
				"https://ig.aidtaas.com/tf-web/v1.0/64e1fd3d1443eb00018cc231/schemas/655340cba34e3b716bd16b3e"
			);
			if (response.status < 300) {
				const data = await response.json();
				const tagsArray = data.attributes.map((item) => item.name);
				setTags(tagsArray);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllTags();
	}, []);







	
	// const [addedinputparams, setaddedinputparams] = useState([]);


// 	function handleAddMore(id, inputParams) {
// 		// Convert object key-value pairs to an array of objects
// 		const keyValueArray = Object.entries(inputParams).map(([key, value]) => ({ key, value }));
	  
// 		// Check if the id is already present in addedinputparams
// 		const index = addedinputparams.findIndex(data => data.id === id);
	  
// 		setaddedinputparams(prevData => {
// 		  const newData = [...prevData];
	  
// 		  if (index === -1) {
// 			// If id is not present, initialize add_data with an empty inputParams array
// 			const add_data = {
// 			  id: id,
// 			  inputParams: [keyValueArray[0]]  // Change to keyValueArray[0] if you want to add the first key-value pair
// 			};
	  
// 			// Add add_data to the array
// 			newData.push(add_data);
// 		  } else {
// 			// Increment the index for the current id
// 			const currentIndex = newData.findIndex(data => data.id === id);
	  
// 			// Add the next key-value pair from keyValueArray to the array
// 			if (currentIndex !== -1) {
// 			  const currentData = newData[currentIndex];
// 			  currentData.inputParams.push(keyValueArray[currentData.inputParams.length+1]);  // Change to keyValueArray[0] if you want to add the next key-value pair
// 			}
// 		  }
	  
// 		  return newData;
// 		});
	  
// 		console.log("addedinputparams", addedinputparams);
	  
	  
	  
	  
	  



	

// 	// setaddedinputparams((prevAddedInputParams) => {
// 	//   const updatedAddedInputParams = [...prevAddedInputParams];
  
// 	//   // Find the index of the data with the given id in addedinputparams
// 	//   const dataIndex = updatedAddedInputParams.findIndex((data) => data.id === id);
  
// 	//   if (dataIndex !== -1) {
		
       




// 	//   } else {
// 	// 	// If data with the given id is not found, push a new data object
// 	// 	updatedAddedInputParams.push({
// 	// 	  id: id,
// 	// 	  params: "",
// 	// 	});
// 	//   }
  
// 	// console.log("updatedAddedInputParams",updatedAddedInputParams)
// 	//   return updatedAddedInputParams;
// 	// });






//   }
  



// this logic is used for value trasformation

const transformInputValue = (inputValue) => {
	// Ensure inputValue is a string
	const stringValue = inputValue.toString();
  
	// Define your transformation logic using regular expressions
	const transformedValue = stringValue
	  .replace(/_/g, ' ') // Replace underscores with spaces
	  .replace(/([A-Z])/g, ' $1').replace("your project id",8743759234593).replace("your page token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6").replace("your filter criteria","Id")
	  .toLowerCase(); // Convert to lowercase
  
	return transformedValue;
  };







	
  const [droppedItems, setDroppedItems] = useState([]);



  
  const handleDragOver = (event) => {
    event.preventDefault();
    // You can add additional styling or feedback here if needed
	console.log("handleDragOver")
  };





  const handleDrop = (event) => {

    const draggedItemId = event.dataTransfer.getData("text/plain");
    console.log("Dropped item id:", draggedItemId);
    // Implement your logic for handling the dropped item
  };









  const removeDroppedItem = (itemId) => {
    // Implement your logic for removing the dropped item
    setDroppedItems((prevDroppedItems) =>
      prevDroppedItems.filter((item) => item !== itemId)
    );
  };







	return (
		<div className="setup-form-card" onDragOver={handleDragOver}
			onDrop={handleDrop}>

			<button
				className="main-delete-btn"
				onClick={() => removeMethod(api.id)}
			>
				<img src={crossIcon} alt="" />
			</button>
			<p className="set-up-form-card-heading-1">Endpoint</p>
			<h2 className="form-heading">{api.name}</h2>
			<p className="api-description">{api.description}</p>

			<div
				className="drop-zone"

			>
				Drop Zone
			</div>
			<div className="parameters-container" 	onDrop={handleDrop}>
				<label>Input parameter</label>


				{Object.keys(api.inputParams).map((param, idx) => (
					<div className="form-group" key={idx}>
						<div className="input-container">
							<input
								name="key"
								type="text"
								className="form-control"
								placeholder="Key"
								value={param}
							/>
						</div>
						<div className="input-container">
							<input
								name="vlaue"
								type="text"
								className="form-control"
								placeholder="Value"
								value={transformInputValue(api.inputParams[param])}
							/>
						</div>
						<br />
					</div>
				))}




			</div>



			<div className="parameters-container" 	onDrop={handleDrop}>


				{api.selectedOutputParams?.map((param, idx) => (
					<>
						<div className="form-group" key={idx}>
							<div className="input-container">
								<label htmlFor="output-parameter">
									Output Parameter
								</label>
								<div className="output-parameter-flex">
									<span className="param-name">
										{param.toUpperCase()}
									</span>
									<div className="input-container-index">
										<label htmlFor="output-parameter">
											<div class="toggle-container">
												<label class="switch">
													<input
														type="checkbox"
														class="switch-input"
													/>
													<i class="icon-play"></i>
													<span class="switch-label"></span>
													<span class="switch-handle"></span>
												</label>
												Index on this Parameter
											</div>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="input-container">
								<label htmlFor="analytic-tag">
									Analytics Tags
								</label>
								<select
									id="analytic-tag"
									name="tag"
									className="form-control"
								>
									{tags.map((item, idx) => (
										<option value={item} key={idx}>
											{item}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="form-group">
							<div className="key-container">
								<label>Index Properties</label>

								<div className="input-key-container">
									<span className="input-key-container-radio">
										<input
											type="radio"
											name={
												api.name +
												"setup_config_key_prop_" +
												idx
											}
											id={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_primary"
											}
										/>{" "}
										<label
											htmlFor={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_primary"
											}
										>
											PRIMARY
										</label>
									</span>
									<span className="input-key-container-radio">
										<input
											type="radio"
											name={
												api.name +
												"setup_config_key_prop_" +
												idx
											}
											id={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_secondary"
											}
										/>{" "}
										<label
											htmlFor={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_secondary"
											}
										>
											SECONDARY
										</label>
									</span>
									<span className="input-key-container-radio">
										<input
											type="radio"
											name={
												api.name +
												"setup_config_key_prop_" +
												idx
											}
											id={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_none"
											}
										/>{" "}
										<label
											htmlFor={
												api.name +
												"setup_config_key_prop_" +
												idx +
												"_none"
											}
										>
											NONE
										</label>
									</span>
									{/* <span
										className={`tag ${
											param.tag === "PRIMARY"
												? "tag-selected"
												: ""
										}`}
										onClick={() =>
											handleTagClick(param, "PRIMARY")
										}
									>
										Primary
									</span>
									<span
										className={`tag ${
											param.tag === "SECONDARY"
												? "tag-selected"
												: ""
										}`}
										onClick={() =>
											handleTagClick(param, "SECONDARY")
										}
									>
										Secondary
									</span>
									<span
										className={`tag ${
											param.tag === "NONE"
												? "tag-selected"
												: ""
										}`}
										onClick={() =>
											handleTagClick(param, "NONE")
										}
									>
										None
									</span> */}
								</div>
							</div>
						</div>
					</>
				))}
				{/* <div className="param-btn-container">
					<button
						className="param-btn"
						onClick={handleOutputParameterAddition}
					>
						<img src={plusImage} alt="" />
						Add Parameter
					</button>
				</div> */}
			</div>



		</div>
	);
};

export default SetupFormCard;
