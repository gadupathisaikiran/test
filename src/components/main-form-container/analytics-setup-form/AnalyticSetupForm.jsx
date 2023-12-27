import { useState } from "react";
import { useContext } from "react";
import "./analytics-setup-form.css";
import AnalyticStyle from "./analyticsStyle";
import AnalyticQueries from "./analyticQueries";
import AnalyticParameters from "./analyticsParameters";
import AppContext from "../../../context/AppContext/AppContext";

const AnalyticSetupForm = () => {
	let { eclipse} = useContext(AppContext);
	return (
		<>
			<div style={{ display: "flex" }}>
				<div
					style={{
						width: "30%",
						borderRight: "1px solid #EAEAEA",
					}}
				>
					<AnalyticStyle />
				</div>
				<div
					style={{
						width: "38%",
						position:"relative",
						borderRight: "1px solid #EAEAEA",
						// height: "90vh",
	
					}}
				>
					<AnalyticParameters />
				</div>
				<div style={{ width: "32%" }}>
					<AnalyticQueries />
				</div>
			</div>
		</>
	);
};

export default AnalyticSetupForm;
