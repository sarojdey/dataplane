import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MyProfile from "../../components/myProfile/MyProfile";

const User = () => {
  const [selectedSection, setSelectedSection] = useState("My Profile");
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        border: "solid 1px #d6d6d6",
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
        margin: { xs: "1rem", md: "2rem" },
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          width: "20rem",
          borderRight: "solid 1px #d6d6d6",
          padding: "2rem",
          display: { xs: "none", md: "block" },
        }}
      >
        <Button
          onClick={() => {
            setSelectedSection("My Profile");
          }}
          disableElevation
          disableFocusRipple
          disableTouchRipple
          disableRipple
          sx={{
            ":hover": {
              backgroundColor: "inherit",
            },
            textTransform: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.7rem",
            borderRadius: "2rem",
            marginY: "1rem",
            color: "gray",
            cursor: "pointer",
            ...(selectedSection === "My Profile" && {
              backgroundColor: "#90ead2",
              ":hover": {
                backgroundColor: "#90ead2",
              },
            }),
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              ...(selectedSection === "My Profile" && {
                color: "var(--color-primary-darker)",
              }),
            }}
          >
            My Profile
          </Typography>
        </Button>
        <Button
          onClick={() => {
            setSelectedSection("Dashboard");
          }}
          disableElevation
          disableFocusRipple
          disableTouchRipple
          disableRipple
          sx={{
            ":hover": {
              backgroundColor: "inherit",
            },
            textTransform: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.7rem",
            borderRadius: "2rem",
            marginY: "1rem",
            color: "gray",
            cursor: "pointer",
            ...(selectedSection === "Dashboard" && {
              backgroundColor: "#90ead2",
              ":hover": {
                backgroundColor: "#90ead2",
              },
            }),
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              ...(selectedSection === "Dashboard" && {
                color: "var(--color-primary-darker)",
              }),
            }}
          >
            Dashboard
          </Typography>
        </Button>
        <Button
          onClick={() => {
            setSelectedSection("Notifications");
          }}
          disableElevation
          disableFocusRipple
          disableTouchRipple
          disableRipple
          sx={{
            ":hover": {
              backgroundColor: "inherit",
            },
            textTransform: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.7rem",
            borderRadius: "2rem",
            marginY: "1rem",
            color: "gray",
            cursor: "pointer",
            ...(selectedSection === "Notifications" && {
              backgroundColor: "#90ead2",
              ":hover": {
                backgroundColor: "#90ead2",
              },
            }),
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              ...(selectedSection === "Notifications" && {
                color: "var(--color-primary-darker)",
              }),
            }}
          >
            Notifications
          </Typography>
        </Button>
      </Box>
      <Box sx={{ width: "100%", padding: { xs: "1.2rem", md: "2rem" } }}>
        <MyProfile />
      </Box>
    </Box>
  );
};

export default User;
