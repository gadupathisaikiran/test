import "./main-form-header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext/AppContext";

const MainFormHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {currentPath, setCurrentPath} = useContext(AppContext)
	const handleFormChange = (path) => {
		navigate(path);
		setCurrentPath(path);
	};
	useEffect(() => {
		setCurrentPath(location.pathname);
	}, []);
	return (
		<header className="main-form-header">
			<nav>
				<ul>
					<li
						className={`list-item ${
							currentPath === "/integration" ? "border-btm" : ""
						}`}
						onClick={() => handleFormChange("/integration")}
					>
						Integration setup
					</li>
					<li
						className={`list-item ${
							currentPath === "/integration/configuration"
								? "border-btm"
								: ""
						}`}
						onClick={() =>
							handleFormChange("/integration/configuration")
						}
					>
						Setup configuration
					</li>
					<li
						className={`list-item ${
							currentPath === "/integration/lifecycle"
								? "border-btm"
								: ""
						}`}
						onClick={() =>
							handleFormChange("/integration/lifecycle")
						}
					>
						Manage lifecycle
					</li>
					<li className="list-item">
						<button>Discard</button>
						<button className="save-btn">Save</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainFormHeader;
