import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000/api";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putDataToApi = async (url, data) => {
  try {
    const response = await axios.put(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const postDataToApi = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
