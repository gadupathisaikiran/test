import Navbar from "./components/Navbar";
import "./App.css";
import MainFormContainer from "./components/main-form-container/MainFormContainer";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PlatformSetUp from "./components/main-form-container/platform-set-up/PlatformSetUp";
import AnalyticSetupForm from "./components/main-form-container/analytics-setup-form/AnalyticSetupForm";
import SetupConfigurationForm from "./components/main-form-container/setup-configuration-form/SetupConfigurationForm";
import ManageLifeCycleForm from "./components/main-form-container/manage-lifecycle-form/ManageLifeCycleForm";
import IntegrationSetup from "./components/main-form-container/integration-setup/IntegrationSetup";
import SummaryView from "./SummaryView";



function App() {

  // show or hide dashboard/main forms container
  const [dashboardDisplay, setDashboardDisplay] = useState(true);

  
  return (
    <div className="App">
      <Navbar userName="Jackie.c" setDashboardDisplay={setDashboardDisplay} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/summaryview" element={<SummaryView/>}/>

        
        <Route
          path="/setup"
          element={<MainFormContainer headerToDisplay={1} />}
          children={[
            <Route path="platform" element={<PlatformSetUp />} />,
            <Route path="analytics" element={<AnalyticSetupForm />} />,
          ]}
        />
        <Route
          path="/integration"
          element={<MainFormContainer headerToDisplay={2} />}
          children={[
            <Route path="" element={<IntegrationSetup />} />,
            <Route path="configuration" element={<SetupConfigurationForm />} />,
            <Route path="lifecycle" element={<ManageLifeCycleForm />} />,
          ]}
        />
      </Routes>
    </div>
  );
}

export default App;
