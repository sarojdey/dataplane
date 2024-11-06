import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserDetailsUpdate from "./UserDetailsUpdate";
import usePutRequest from "../../hooks/usePutRequest";

import ThereDotLoader from "../../components/loaders/ThereDotLoader";
import ButtonPrimary from "../buttons/ButtonPrimary";
import dayjs from "dayjs";

function MyProfile() {
  const { putRequest } = usePutRequest();
  const { user, setUser } = useAuth();
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [userDetails, setUserDetails] = useState({
    userId: user?._id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
    role: user?.role || "",
    avatar: user?.avatar || "/avatar1.png",
    address: {
      addressType: user?.address?.addressType || "",
      country: user?.address?.country || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
    },
  });

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const response = await putRequest(`/user/updateUserDetails`, {
        userId: user._id,
        ...userDetails,
      });
      if (response) {
        setIsUpdating(false);
        setUser(response.user);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };
  return isUpdating ? (
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          color: "var(--color-bg-secondary)",
        }}
      >
        <Typography fontSize={25} fontWeight={600} marginBottom={2}>
          My Profile
        </Typography>
        {!isEditingUserInfo ? (
          <ButtonPrimary
            onButtonClick={() => {
              setIsEditingUserInfo(true);
            }}
            buttonColor={"success"}
            buttonVariant={"outlined"}
            buttonStyles={{ width: "5rem", height: "2.5rem" }}
          >
            Edit
          </ButtonPrimary>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ButtonPrimary
              onButtonClick={() => {
                handleSave();
                setIsEditingUserInfo(false);
              }}
              buttonColor={"success"}
              buttonVariant={"outlined"}
              buttonStyles={{
                width: "5rem",
                height: "2.5rem",
                marginRight: "1rem",
              }}
            >
              Save
            </ButtonPrimary>
            <ButtonPrimary
              onButtonClick={() => {
                setIsEditingUserInfo(false);
              }}
              buttonColor={"error"}
              buttonVariant={"outlined"}
              buttonStyles={{
                width: "5rem",
                height: "2.5rem",
              }}
            >
              Cancel
            </ButtonPrimary>
          </Box>
        )}
      </Box>

      {!isEditingUserInfo ? (
        <>
          <UserCard user={user} />
          <PersonalInfo user={user} />
          <Address user={user} />
        </>
      ) : (
        <UserDetailsUpdate
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
    </Box>
  );
}

const UserInfo = ({ label, value }) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1.5rem" }}>
      <Typography fontSize={16} sx={{ marginBottom: "0.5rem", color: "gray" }}>
        {label}
      </Typography>
      <Typography fontWeight={500}>{value}</Typography>
    </Box>
  );
};

const UserCard = ({ user }) => {
  return (
    <Box
      borderRadius={5}
      sx={{
        width: "100%",
        padding: { xs: "1rem", md: "2rem" },
        display: "flex",
        backgroundColor: "white",
        border: "solid 1px #d6d6d6",
        marginBottom: "1rem",
        alignItems: "center",
        color: "var(--color-bg-secondary)",
      }}
    >
      <Box
        borderRadius={"100%"}
        sx={{
          height: { xs: "4rem", md: "5rem" },
          width: { xs: "4rem", md: "5rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: { xs: "1rem", md: "1.5rem" },
          flexShrink: 0,
        }}
      >
        <img
          style={{ height: "100%", width: "100%" }}
          src={user.avatar || "/avatar1.png"}
          alt="proflie"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontWeight={500}
          sx={{ marginBottom: "0.1rem", fontSize: { xs: "18px", md: "20px" } }}
        >
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : "Unknown"}
        </Typography>
        <Typography
          fontSize={16}
          sx={{ color: "gray", marginBottom: "0.3rem" }}
        >
          {user.role || "Unknown"}
        </Typography>
        <Typography fontSize={15} sx={{ color: "gray" }}>
          {user?.address?.state && user?.address?.country
            ? `${user?.address?.state}, ${user?.address?.country}`
            : "Unknown"}
        </Typography>
      </Box>
    </Box>
  );
};

const PersonalInfo = ({ user }) => {
  return (
    <Box
      borderRadius={5}
      sx={{
        marginBottom: "1rem",
        width: "100%",
        padding: "2rem",
        display: "flex",
        backgroundColor: "white",
        border: "solid 1px #d6d6d6",
        color: "var(--color-bg-secondary)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={20}
          fontWeight={500}
          sx={{ marginBottom: "0.1rem" }}
        >
          Personal Information
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            marginTop: "1rem",
          }}
        >
          <Box sx={{ minWidth: "25rem" }}>
            <UserInfo
              label={"First Name"}
              value={user.firstName || "Unknown"}
            />
            <UserInfo label={"Last Name"} value={user.lastName || "Unknown"} />
            <UserInfo
              label={"DOB"}
              value={
                user.dob ? dayjs(user.dob).format("MM-DD-YYYY") : "Unknown"
              }
            />
            <UserInfo label={"Gender"} value={user.gender || "Unknown"} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <UserInfo label={"Role"} value={user.role || "Unknown"} />
            <UserInfo label={"Email address"} value={user.email || "Unknown"} />
            <UserInfo label={"Phone"} value={user.phone || "Unknown"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Address = ({ user }) => {
  return (
    <Box
      borderRadius={5}
      sx={{
        marginBottom: "1rem",
        width: "100%",
        padding: "2rem",
        display: "flex",
        backgroundColor: "white",
        border: "solid 1px #d6d6d6",
        color: "var(--color-bg-secondary)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={20}
          fontWeight={500}
          sx={{ marginBottom: "0.1rem" }}
        >
          Address
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            marginTop: "1rem",
          }}
        >
          <Box sx={{ minWidth: "25rem" }}>
            <UserInfo
              label={"Country"}
              value={user?.address?.country || "Unknown"}
            />
            <UserInfo
              label={"Postal Code"}
              value={user?.address?.postalCode || "Unknown"}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <UserInfo
              label={"City/State"}
              value={user?.address?.state || "Unknown"}
            />
            <UserInfo
              label={"Address Type"}
              value={user?.address?.addressType || "Unknown"}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
