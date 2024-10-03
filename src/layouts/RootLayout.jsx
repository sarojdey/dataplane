import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar/Navbar";

import { useEffect, useState } from "react";

import useGetRequest from "../hooks/useGetRequest";
import { Context } from "../context/Context";
import ThereDotLoader from "../components/loaders/ThereDotLoader";

const RootLayout = () => {
  const { data: response, loading } = useGetRequest(`/tickets/getAllTickets`);

  useEffect(() => {
    if (response) {
      setData(response);
    }
  }, [response]);

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        formData,
        setFormData,
        isEditing,
        setIsEditing,
        isEditingImage,
        setIsEditingImage,
        isDarkModeOn,
        setIsDarkModeOn,
      }}
    >
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThereDotLoader />
        </div>
      ) : (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </Context.Provider>
  );
};

export default RootLayout;
