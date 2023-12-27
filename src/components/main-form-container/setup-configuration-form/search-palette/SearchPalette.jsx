import "./search-palette.css";
import useAppState from "../../../../custom-hooks/useAppState";
import { useEffect } from "react";

const SearchPalette = ({ setSelectedMethods }) => {

	const { appState, setAppState,setAppState1,appState1,setapidatalist,apidatalist,selectedIntegration} = useAppState();




	const handleApiSelect = (name) => {
		const updatedEndpoints = appState1.endpoints.map((api) => {
			if (api.name === name) {
				const modifiedApi = { ...api };
				modifiedApi.selected = !modifiedApi.selected;
				modifiedApi.selectedWorkflows = [];
				
				return modifiedApi;
			}
			return api;
		});


	
		


		setAppState1({ ...appState1, endpoints: updatedEndpoints });


		localStorage.setItem(
			`${selectedIntegration.Integration_Name}_selectedparams`,
			JSON.stringify(updatedEndpoints)
		  );



		// setapidatalist(updatedEndpoints)

	};





	
// useEffect(()=>{



// 	console.log("SearchPalette apidatalist",apidatalist)

// },[apidatalist])




	return (
		<section className="search-palette">
			<div className="input-container">
				<input
					name="search"
					id="search"
					type="text"
					className="form-control"
					placeholder="Search for APIs"
				/>
			</div>
			<ul className="api-palette">
				{appState1.endpoints.map((api, idx) => (
					<li className="list-item" key={idx}>
						<label htmlFor={api.name}>
							<input
								id={api.name}
								type="checkbox"
								className="checkbox"
								placeholder="Search for APIs"
								checked={api.selected}
								onChange={() => handleApiSelect(api.name)}
							/>
							{api.name}
						</label>
					</li>
				))}
			</ul>
		</section>
	);
};

export default SearchPalette;
