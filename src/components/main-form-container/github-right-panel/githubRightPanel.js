import { useEffect } from "react";
import { useState } from "react";
import { Octokit } from "octokit";
import "./githubRightPanel.css";
import GitRepoLanguages from "../../Charts/GitRepoLanguages";
// import images
import star from "../../../images/star.svg";
import eye from "../../../images/eye.svg";
import gitfork from "../../../images/heartbeat.svg";
import book from "../../../images/book.svg";
import heartbeat from "../../../images/heartbeat.svg";
import weights from "../../../images/weights.svg";
import greenBug from "../../../images/Bug.svg";
import redBug from "../../../images/Bug Antivirus Debugging.svg";
import angular from "../../../images/Angular.svg";
import devIcon from "../../../images/Devicon.svg";
import isoImg from "../../../images/download 1.png";
import w3cImg from "../../../images/w3c-logo-11609381742g5r3kjtsjv 1.png";

function GithubRightPanel({ gitUrl, gitToken, triggerCall }) {
  // console.log(gitUrl);
  console.log("GT " + triggerCall);
  const [gitHubApiResponse, setGitHubApiResponse] = useState([]);
  const [repoStars, setRepoStars] = useState(0);
  const [repoSubs, setRepoSubs] = useState(0);
  const [repoForks, setRepoForks] = useState(0);
  const [repoCreateDate, setRepoCreateDate] = useState("");
  const [repoUpdateDate, setRepoUpdateDate] = useState("");
  const [issues, setIssues] = useState(0);
  const [commits, setCommits] = useState(0);

  // check status of git api call
  const [apiResponseSuccess, setApiResSuccess] = useState("FETCH_REPO");

  // extract user name and repo name form git repo url
  let tempArr = new String(gitUrl).split("/");
  if (tempArr.length >= 3) {
    var gitName = tempArr[tempArr.length - 3];
    var gitRepoName = tempArr[tempArr.length - 2];
  }

  console.log(gitName, gitRepoName);
  // github info
  const apiConfig = {
    owner: gitName,
    repo: gitRepoName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
  // make github api call when component renders initially
  useEffect(() => {
    try {
      gitApiCall();
    } catch (error) {
      console.log(error);
    }
  }, [triggerCall,gitUrl]);

  async function gitApiCall() {
    try {
      // set up github client
      const octokit = new Octokit({
        auth: gitToken,
      });

      // get repo general info
      const repoInfoRes = await octokit.request(
        "GET /repos/{owner}/{repo}",
        apiConfig
      );
      setRepoStars(repoInfoRes.data.stargazers_count);
      setRepoSubs(repoInfoRes.data.subscribers_count);
      setRepoForks(repoInfoRes.data.forks_count);
      setRepoCreateDate(repoInfoRes.data.created_at);
      setRepoUpdateDate(repoInfoRes.data.updated_at);
      //get collaborators
      try {
        const gitCollabs = await octokit.request(
          "GET /repos/{owner}/{repo}/collaborators",
          apiConfig
        );
        const collaborators = gitCollabs.data;
        setGitHubApiResponse(collaborators);
      } catch (error) {
        setGitHubApiResponse([]);
      }
      // get issues
      const gitIssuesRes = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        apiConfig
      );
      setIssues(gitIssuesRes.data.length);
      // get commits
      const commitsNum = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        apiConfig
      );
      setCommits(commitsNum.data.length);
      setApiResSuccess("SUCCESS");
    } catch (error) {
      setApiResSuccess("ERROR");
      console.log(error);
    }
  }
  function dateFormatter(timestamp) {
    // Create a Date object from the input string
    const date = new Date(timestamp);

    // Define an array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the output string
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDate; // Output: 11 Nov 2023
  }

  return (
    <>
      {apiResponseSuccess === "SUCCESS" ? (
        <div className="github-right-panel">
          <div className="git-repo-general-info">
            <span>
              <img src={book} /> README
            </span>
            <br />
            <span>
              <img src={weights} /> Apache-2.0 license
            </span>
            <br />
            <span>
              <img src={heartbeat} /> Activity
            </span>
            <br />
            <span>
              <img src={star} /> <b>951</b> stars
            </span>
            <br />
            <span>
              <img src={eye} /> <b>47</b> watching
            </span>
            <br />
            <span>
              <img src={gitfork} /> <b>259</b> forks
            </span>
            <br />
          </div>
          <div className="git-repo-collab">
            <span className="git-repo-collab-contributer">
              Contributors&nbsp;
            </span>
            <span className="git-repo-collab-contributer-number-container">
              <span className="git-repo-collab-contributer-number">70</span>
            </span>{" "}
            <br />
            <div className="git-repo-collab-avatars">
              {gitHubApiResponse.length === 0 && (
                <span className="git-repo-collab-avatars-collab-error">
                  Incorrect Access Token
                </span>
              )}
              {gitHubApiResponse.length > 0 &&
                gitHubApiResponse.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item.avatar_url} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="git-repo-languages">
            <b>Languages</b>
            <div>
              <GitRepoLanguages apiConfig={apiConfig} />
            </div>
          </div>
          <div className="git-repo-compatible">
            <div className="git-repo-compatible-heading">Compatible with</div>{" "}
            <img src={angular} /> <img src={devIcon} />
          </div>
          <div className="git-repo-compliance">
            <div className="git-repo-compliance-heading">Compliance</div>
            <img src={isoImg} /> <img src={w3cImg} />
          </div>
          <div className="git-repo-issues">
            <div>
              <span className="git-repo-issues-heading">Created</span>
              <br />
              <b className="git-repo-issues-data">
                {dateFormatter(repoCreateDate)}
              </b>
            </div>
            <div>
              <span className="git-repo-issues-heading">Modified</span>
              <br />
              <b className="git-repo-issues-data">
                {dateFormatter(repoUpdateDate)}
              </b>
            </div>
            <div>
              <span className="git-repo-issues-heading">Bugs</span>
              <br />
              <b className="git-repo-issues-data git-repo-issues-data-bugs">
                <img src={greenBug} />
                <span>{commits}</span>&nbsp;
                <img src={redBug} />
                <span>{issues}</span>
              </b>
            </div>
          </div>
        </div>
      ) : apiResponseSuccess === "ERROR" ? (
        <p style={{ color: "red" }}>Failed to fetch the data!!</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default GithubRightPanel;
