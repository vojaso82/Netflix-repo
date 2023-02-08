import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { isNotNil } from "../utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment/moment";

function Commits() {
  const params = useParams();
  const [commit, setCommit] = useState({});

  const getCommit = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/orgs/Netflix/repos"
      );
      if (isNotNil(response.data)) {
        const matchedCommit = response.data.find(
          (each) => each.id === Number(params.id)
        );
        setCommit(matchedCommit);
      }
    } catch (err) {
      console.log("error", err);
      toast(
        err.message || err.msg || err.toString() || "Error getting api data",
        {
          type: toast.TYPE.ERROR,
        }
      );
    }
  };

  //Render api data on page load
  useEffect(() => {
    getCommit();
  }, []);

  return (
    <div style={styles.container}>
      <Link to={"/"}>
        <button style={styles.backButton}>Back</button>
      </Link>
      <br />
      {commit ? (
        <div>
          <p>
            <p style={styles.description}>Commit Title:</p>
            {commit.name}
          </p>
          <p>
            <p style={styles.description}>Committer username:</p>
            {commit?.owner?.login}
          </p>
          <p>
            <p style={styles.description}>Commit hash:</p>
            {commit.node_id}
          </p>
          <p>
            <p style={styles.description}>Date Created:</p>
            {moment(commit?.created_at).format("MM/DD/YYYY")}
          </p>
        </div>
      ) : (
        <p style={styles.description}>Loading....</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "60",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "16px",
    padding: "15px",
    backgroundColor: "rgb(0, 238, 193, 0.4)",
  },
  backButton: {
    borderRadius: "16px",
    color: "blue",
    textTransform: "none",
    height: "35px",
    width: "90px",
    boxShadow: "none",
    fontWeight: 600,
  },
  description: {
    fontWeight: "bold",
  },
};

export default Commits;
