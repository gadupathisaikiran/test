import wfpreview from "../../../images/wfpreview.png";
import "./WorkflowPreviewComp.css";

function WorkflowPreview({workflowName}) {
  console.log("hi abbas",workflowName)
  return (
    workflowName!=""?(<div className="WorkflowPreview">
      <div id="WorkflowPreview-title">{workflowName.split("r15")[0]}</div>
      <div>
        <img src={wfpreview} style={{ width: "302px", height: "150px" }} />{" "}
        <br />
        <b className="sub_heading">
          This workflow will ingest quarterly.
        </b>
        <br />
        <span className="main_heading">Workflow ID</span> <br />
        <span className="sub_heading">c3d75891-7083-44d6-beb7-e051c7845fd6</span>
        <br />
      
        <b className="main_heading">Schedule frequency</b> <br />
        <span className="sub_heading">None</span>
        <br />
        <b className="main_heading">Subprocess ID</b> <br />
        <span className="sub_heading">Workflow 5 <br/>c3d75891-7083-44d6-beb7-e051c7845fd6</span>
        <br />
        <b className="main_heading">Destination schema</b>
        <br />
        <b className="sub_heading">Schema name</b> <br />
        <span className="sub_heading">(c3d75891-7083-44d6-beb7-e051c7845fd6)</span>
        <hr />
        <div>
          <div style={{marginBottom:"12px"}}>
            <b className="schedule_workflow">Schedule Workflow</b>
          </div>
          <div>
            <form>
              <input type="radio" /> <label className="inputStyle">Every Year on this day</label>
              <br />
              <input type="radio" /> <label className="inputStyle">Every Month on this day</label>
              <br />
              <input type="radio" /> <label className="inputStyle">Every Week on this day</label>
              <br />
              <input type="radio" /> <label className="inputStyle">Every day at this time</label>
              <br />
              <input type="radio" /> <label className="inputStyle">Repeat every</label>
              <br />
            </form>
          </div>
          <div>
            <div className="block_1">
              <input type="number" placeholder="1" className="input_1"/>
              <select className="input_2">
                <option>Month</option>
              </select>
            </div>
            <div style={{marginTop:"8px"}}>
              <span className="on">on</span>
              <div className="block_2">
                <select className="input_3">
                  <option>First</option>
                  <option>second</option>
                  <option>Third</option>
                  <option>Fourth</option>
                </select>
                <select className="input_4">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
              <div className="block_3">
                <input type="number" placeholder="HH" className="block3_input1"/>
                <input type="number" placeholder="MM" className="block3_input1"/>
                <input type="number" placeholder="SS" className="block3_input1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>):<></>
  );
}

export default WorkflowPreview;