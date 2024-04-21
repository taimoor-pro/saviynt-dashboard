import axios from "axios";

const initializeApp = () => {
  // Setting base URL for all API request via axios
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    console.log("Taimoor Nawaz Developer");
  } else {
    // Removing console.log from prod
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};

export default initializeApp;
