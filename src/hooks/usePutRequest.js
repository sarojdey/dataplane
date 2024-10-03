import { useState } from "react";
import { putDataToApi } from "../utils/api";

const usePutRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putRequest = async (url, payload) => {
    setLoading(true);

    try {
      const res = await putDataToApi(url, payload);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putRequest };
};

export default usePutRequest;
