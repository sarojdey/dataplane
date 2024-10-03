import { useState } from "react";
import { postDataToApi } from "../utils/api";

const usePostRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (url, payload) => {
    setLoading(true);

    try {
      const res = await postDataToApi(url, payload);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postRequest };
};

export default usePostRequest;
