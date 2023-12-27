import { useState,useEffect } from "react";
import "../styles/Navbar.css";
import snap from "../images/snap.png";
import logo from "../images/LogoSL.png";
import profile from "../images/profile.png";
import cogWheel from "../images/cogwheel.svg";
import dashLayout from "../images/dash-layout.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCogwheel, setShowCogwheel] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    setShowCogwheel(currentPath === "/setup/analytics");
  }, [location.pathname]);

  const toggleScreens = () => {
    if (showCogwheel) {
      navigate("/");
    } else {
      navigate("/setup/analytics");
    }
  };


  return (
    <div className="Navbar">
      <div className="nav-left">
        <img src={logo} id="sl-logo" />
        <img src={snap} style={{ height: "40px" }} />
        <div
          className="navitem logotext"
          onClick={() => {
            navigate("/");
          }}
        ></div>
      </div>
      <div className="nav-middle">DATA INSIGHTS HUB</div>
      <div className="nav-right">
        <h5 className="username">{userName}</h5>
        <img src={profile} />
        {showCogwheel ? (
          <img
            src={dashLayout}
            className="navbar-cogwheel"
            onClick={toggleScreens}
          ></img>
        ) : (
          <img
            src={cogWheel}
            className="navbar-cogwheel"
            onClick={toggleScreens}
          ></img>
        )}
      </div>
    </div>
  );
}

export default Navbar;
