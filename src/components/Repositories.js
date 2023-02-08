import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getNetflixData from "../api";
import { isNil, isNotNil } from "../utils";
import { Link } from "react-router-dom";
import moment from "moment";

function Repositories() {
  const [repos, setRepos] = useState([]);
  const [originalRepos, setOriginalRepos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getNetflixDataResponse = async () => {
    try {
      const netflixData = await getNetflixData();
      if (isNil(netflixData)) {
        return toast("Error getting netflix list", {
          type: toast.TYPE.ERROR,
        });
      } else {
        setRepos(netflixData);
        setOriginalRepos(netflixData);
      }
    } catch (err) {
      console.log(err);
      toast(err.message || err.msg || err.toString() || "Error getting data", {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (isNil(e.target.value)) {
      setRepos(originalRepos);
    }
    const filteredList = repos.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRepos(filteredList);
  };

  //Return back old state when deleting input values on change on inputValues and originalRepos
  useEffect(() => {
    if (isNil(inputValue)) {
      setRepos(originalRepos);
    }
  }, [inputValue, originalRepos]);

  //Render api data on page load
  useEffect(() => {
    getNetflixDataResponse();
  }, []);

  return (
    <div>
      <div style={styles.mainDiv}>
        <img
          src="https://avatars.githubusercontent.com/u/913567?v=4"
          alt="Netflix image"
          width="100"
          height="80"
        />
        <h1 style={{ color: "red" }}>Netflix Github Repositories:</h1>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>Search repos: </p>
        <input
          style={{ borderRadius: 5 }}
          type="text"
          value={inputValue}
          placeholder="Type here to search"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div>
        {isNotNil(repos) ? (
          repos
            .sort((itemA, itemB) => itemB.forks_count - itemA.forks_count)
            .map((item) => (
              <div style={styles.container}>
                <Link style={styles.links} to={`/commits/${item.id}`}>
                  <li key={item.id}>Repo name: {item.name} </li>
                </Link>
                <p>Language: {item.language}</p>
                <p>Description: {item.description}</p>
                <p>Star Count: {item.stargazers_count}</p>
                <p>Fork Count: {item.forks_count}</p>
                <p>
                  Date Created: {moment(item?.created_at).format("MM/DD/YYYY")}
                </p>
              </div>
            ))
        ) : isNil(originalRepos.length) ? (
          <h2>Loading</h2>
        ) : (
          <h2>No matches found</h2>
        )}
      </div>
    </div>
  );
}

const styles = {
  links: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  mainDiv: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    paddingLeft: "20px",
  },
  container: {
    width: "60",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "16px",
    padding: "15px",
    backgroundColor: "#008BC0",
  },
};

export default Repositories;
