import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

import ButtonPrimary from "../buttons/ButtonPrimary";

import LogoutIcon from "@mui/icons-material/Logout";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Switch from "@mui/material/Switch";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { isDarkModeOn, setIsDarkModeOn } = useContext(Context);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar
      sx={{
        backgroundColor: isDarkModeOn
          ? "var(--color-primary)"
          : "var(--color-secondary)",
      }}
      position="sticky"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* left */}

        <Stack direction="row">
          <IconButton
            sx={{ marginRight: { xs: "1.5rem", sm: "4rem" } }}
            id="logo-button"
            onClick={() => {
              navigate("/");
            }}
            disableFocusRipple
            disableRipple
            size="large"
            edge="start"
            color="inherit"
            component="div"
          >
            <TextSnippetIcon
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                marginRight: { sm: "0.5rem" },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                display: { xs: "none", sm: "block" },
              }}
              fontWeight={600}
              variant="h1"
            >
              DataPlane
            </Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            id="view-button"
            onClick={() => {
              navigate("/view");
            }}
            sx={{
              marginRight: { xs: "1rem", sm: "2rem" },
              display: "flex",
              flexDirection: "column",
              marginTop: { sm: "1rem" },
            }}
            size="large"
            edge="start"
            color="inherit"
          >
            <BusinessCenterIcon
              sx={{
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            />
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Cases
            </Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            id="mycases-button"
            onClick={() => {
              navigate("/mycases");
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: { sm: "1rem" },
            }}
            size="large"
            edge="start"
            color="inherit"
          >
            <ContactPageIcon
              sx={{
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            />

            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              My Cases
            </Typography>
          </IconButton>
        </Stack>

        {/* right */}

        <Stack spacing={1} direction="row" display="block">
          <Box
            component={"button"}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            borderRadius={"100%"}
            sx={{
              border: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              width: "3rem",
              height: "3rem",
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={user?.avatar || "/avatar1.png"}
              alt="proflie"
            />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/user");
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              disableRipple={true}
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
            >
              <Typography sx={{ cursor: "default" }}>Switch Theme</Typography>
              <Switch
                onChange={() => {
                  const current = isDarkModeOn;
                  setIsDarkModeOn(!current);
                }}
                checked={isDarkModeOn}
                {...label}
              />
            </MenuItem>
            <MenuItem
              disableRipple={true}
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
            >
              <ButtonPrimary
                onButtonClick={handleLogout}
                buttonColor={"error"}
                buttonVariant={"contained"}
                buttonStyles={{ width: "100%" }}
                endIcon={<LogoutIcon />}
              >
                Logout
              </ButtonPrimary>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
