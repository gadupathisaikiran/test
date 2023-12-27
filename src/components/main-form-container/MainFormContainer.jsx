import MainFormHeader2 from "./main-from-header/MainFormHeader2";
import "./main-form-container.css";
import { useState } from "react";
import SidePanel from "../SidePanel";
import { Outlet } from "react-router-dom";
import MainFormHeader from "./main-from-header/MainFormHeader";

const MainFormContainer = ({ headerToDisplay }) => {
	return (
		<main className="main-container">
			<SidePanel />
			<section className="main-form-container">
				{headerToDisplay === 2 ? (
					<MainFormHeader />
				) : (
					<MainFormHeader2 />
				)}
				<Outlet />
			</section>
		</main>
	);
};

export default MainFormContainer;
