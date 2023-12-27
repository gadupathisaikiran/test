import { useState } from "react";
import "./SummaryView.css";
import { useNavigate } from "react-router-dom";

import Costconsumption from "./context/AppContext/Costconsumption";
import Licenceplaninggraph from "./context/AppContext/Licenceplaninggraph";
import StorageGraphYearly from "./context/AppContext/StorageGraphYearly";
import StorageGraph_monthly from "./context/AppContext/Storagegraph_month";
import StorageGraph_quarterly from "./context/AppContext/Storagegraph_quaterly";
import Cost_yoy from "./context/AppContext/Costyoy";
import Cost_mom from "./context/AppContext/Cost_mom";
import StorageGraph_Daily from "./context/AppContext/Storage_daily";
import Cost_qoq from "./context/AppContext/Cost_qoq";


export default function SummaryView() {

  // Licenses Planning 
  // Storage Consumption 
  //  API utilization
  //  Departmental Adoption 
  //  Costs Appropriation
  //   Product Categorization 
  //   Budgetary Distribution 
  //   Role based Utilization



  const optiondata = ["Storage Consumption","Storage Consumption monthly","Storage Consumption quaterly","Storage Consumption daily","cost yearly", "cost monthly","cost quaterly","Costs Appropriation","Licenses Planning"];
  const navigate = useNavigate();
  const [selectedoption, setselectedoption] = useState("Storage Consumption");

  function handleoption(e) {
    const selectedValue = e.target.value;
    setselectedoption(selectedValue);
  }

  return (
    <div className="Dashboard">
      <div className="dasboard-button">
        <div className="dashboard-select">
          <select onChange={(e) => handleoption(e)}>
            {optiondata.map((dta) => (
              <option key={dta} value={dta}>
                {dta}
              </option>
            ))}
          </select>
        </div>

        <button id="gotoDashboard" onClick={() => navigate("/")}>
          Dashboard
        </button>
        <div className="dashboard-top-row">

          {/* top row has 3 columns */}

          <div className="dashboard-top-left-column" style={{width:"80%",height:"60%"}}>
            {selectedoption === "Storage Consumption" && <StorageGraphYearly />}

            {selectedoption === "Costs Appropriation" && <Costconsumption />}

            {selectedoption === "Licenses Planning" && <Licenceplaninggraph/>}

            {selectedoption === "Storage Consumption quaterly" && <StorageGraph_quarterly/>}

            {selectedoption === "Storage Consumption monthly" && <StorageGraph_monthly/>}

    

            {selectedoption === "Storage Consumption daily" && <StorageGraph_Daily/>}

            {selectedoption === "cost yearly" && <Cost_yoy/>}

            
            {selectedoption === "cost monthly" && <Cost_mom/>}

            {selectedoption === "cost quaterly" && <Cost_qoq/>}



            {/* Add similar conditions for other options */}
          </div>
        </div>
      </div>
    </div>
  );
}
