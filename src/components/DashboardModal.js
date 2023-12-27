import BasicLineChart from "./Charts/BasicLineChart";
import DoubleYAxisLineCharts from "./Charts/DoubleYAxisLineCharts";
import GradientStackedAreaChart from "./Charts/GradientStackedAreaChart";
import HorizontalPieCharts from "./Charts/HorizontalPieCharts";
import PieChart from "./Charts/PieChart";
import PolarBarChart from "./Charts/PolarBarChart";
import WaterfallChart from "./Charts/WaterfallChart";
import { useEffect, useState } from "react";
// image imports
import searchIcon from "../images/searchIcon.svg";
import chartImage1 from "../images/charts (1).png";
import chartImage2 from "../images/charts (2).png";
import chartImage3 from "../images/charts (3).png";
import chartImage4 from "../images/charts (4).png";
import chartImage5 from "../images/charts (5).png";
import chartImage6 from "../images/charts (6).png";
import messageFrame from "../images/Frame 1000003562.png";
import emailFrame from "../images/Frame 1000003564.png";
import twitterFrame from "../images/Frame 1000003565.png";
import facebookFrame from "../images/Frame 1000003566.png";

function DashboardModal({ dashboardModalGraph, setModalDisplay,graphindex,graphlist,setgraphindex }) {
  // set display of chart suggestions or alerts
  const [alertDisplay, setAlertDisplay] = useState(false);

  // set button styles on click
  const [buttonBorderBottom, setbtnBorderBottom] = useState(3);

  // static data for chart suggestions for now
  // later, need to fetch data from schema regarding chart suggestions
  const chart_suggestions_data = {
    BasicLineChart: [chartImage4, chartImage5, chartImage6],
    GradientStackedAreaChart: [chartImage1, chartImage2, chartImage3],
    PieChart: [chartImage1, chartImage6],
    WaterfallChart: [chartImage1, chartImage2],
    DoubleYAxisLineCharts: [
      chartImage1,
      chartImage2,
      chartImage3,
      chartImage4,
      chartImage6,
    ],
    HorizontalPieCharts: [chartImage1, chartImage3, chartImage6],
    PolarBarChart: [chartImage1, chartImage6],
  };
  let current_charts_suggestions = chart_suggestions_data[dashboardModalGraph];
  // change above code in order to get relevant data from schema

  // render content





// useEffect to set urls from graphlist based on graphindex

const [urls, setUrls] = useState([]);

const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      if (graphindex !== undefined) {
        // Check if graphindex is defined
        console.log("useeffect in modal")
        const newUrls = graphlist[graphindex].urls;
        console.log(newUrls,"baby")

        // Simulating an asynchronous data fetch (replace with actual data fetching logic)
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        setUrls((prev) => [ ...newUrls]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false once data is fetched (or in case of an error)
    }
  }

  fetchData();
}, [graphindex, graphlist]);

// ... rest of your component code



console.log("urls",urls,"graphlist",graphlist)






  return (
    <div className="dashboard-modal-background">
      <div className="dashboard-modal">
        <div className="dashboard-modal-left-chart">


          {/* display chosen graphs */}
      
          {isLoading ? (
            // Show loader while the iframe is loading
            <div style={{ width: "100%", height: "408px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Loading...
            </div>
          ) : (
            // Once loading is complete, render the iframe
            <iframe
              src={urls[0]}
              width="100%"
              height="400"
              style={{ position: "relative", pointerEvents: "none"}}
            ></iframe>
          )}
          
        
          {/* display options */}
          <select className="dashboard-modal-dropdown" onChange={(e)=>{
const index=graphlist.findIndex(element=>element.titile==e.target.value)
console.log(index,"graphindex")
setgraphindex(index)
          }}>
          {graphlist.map((dta)=>{return <option value={dta.title}>{dta.titile}</option>})}
          </select>
          <div>Evaluation Frequency</div>
          <div>
            <form className="dashboard-modal-options">
              <span>
                <input type="radio" value="Dynamic" name="eval_freq" /> Dynamic
              </span>
              <span>
                <input type="radio" value="OnDemand" name="eval_freq" /> On
                Demand
              </span>
            </form>
          </div>
        </div>
        <div className="dashboard-modal-right-chart-suggestions">
          <div className="dashboard-modal-right-chart-suggestions-buttons">
            <button
              style={{ borderBottom: `${buttonBorderBottom}px solid #039` }}
              onClick={() => {
                setbtnBorderBottom(3);
                setAlertDisplay(false);
              }}
            >
              Visualization
            </button>
            <button
              style={{ borderBottom: `${4 - buttonBorderBottom}px solid #039` }}
              onClick={() => {
                setbtnBorderBottom(1);
                setAlertDisplay(true);
              }}
            >
              Alert
            </button>
          </div>
          {!alertDisplay && (
            <>
              <div className="dashboard-modal-right-chart-suggestions_search">
                <img src={searchIcon} />
                <input placeholder="Search graphs, charts" />
              </div>
              <div className="dashboard-modal-right-chart-suggestions-list">
                {/* render chart suggestions */}
                {current_charts_suggestions.map((item) => {
                  return (
                    <div>
                      <img src={item} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {alertDisplay && (
            <>
              <div className="dashboard-modal-right-alerts">
                When <br />
                <select>
                  <option>Select</option>
                  <option>Daily</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>{" "}
                <br />
                Engage with
                <div className="dashboard-modal-right-alerts-images">
                  <img src={messageFrame} />
                  <img src={emailFrame} />
                  <img src={twitterFrame} />
                  <img src={facebookFrame} />
                </div>
                For <br />
                <select>
                  <option>Select</option>
                  <option>Support Team</option>
                  <option>Devops Team</option>
                  <option>Development Team</option>
                </select>{" "}
                <br />
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className="dashboard-modal-close-button"
        onClick={() => setModalDisplay(false)}
      >
        Close
      </div>
    </div>
  );
}

export default DashboardModal;
