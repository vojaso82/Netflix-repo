import axios from "axios";
import { isNotNil } from "../utils";
import { toast } from "react-toastify";

const getNetflixData = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/orgs/Netflix/repos"
    );
    if (isNotNil(response.data)) {
      return response.data;
    }
  } catch (err) {
    console.log("error", err);
    toast(err.message || err.msg || err.toString() || "Error getting data", {
      type: toast.TYPE.ERROR,
    });
    throw new Error("Error retrieving data from api");
  }
};

export default getNetflixData;
