import { Typography, Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

const Home = () => {
  const { isDarkModeOn } = useContext(Context);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "90vh",
        textAlign: "center",
        justifyContent: "space-evenly",
      }}
      borderRadius={2}
    >
      <Box
        sx={{
          height: "100%",
          width: { xs: "80%", sm: "60%", md: "35%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {" "}
        <Typography
          sx={{
            textAlign: "left",
            color: isDarkModeOn
              ? "var(--color-primary)"
              : "var(--color-secondary)",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
          variant="h3"
          fontWeight="bold"
        >
          Feedback with DataPlane.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            marginTop: "1rem",
            textAlign: "left",
          }}
          variant="body1"
        >
          DataPlane is your platform for collecting, managing, and analyzing
          developer feedback. Empower your team to identify issues, prioritize
          improvements, and enhance development with real-time insights.
          Simplify feedback loops and drive excellence with DataPlot.
        </Typography>
        <ButtonSecondary
          onButtonClick={() => {
            navigate("/putUserData");
          }}
          buttonColor={"success"}
          buttonVariant={"contained"}
          buttonStyles={{
            marginTop: { xs: "2rem", md: "3rem" },
          }}
          startIcon={<AddCircleIcon />}
        >
          CREATE
        </ButtonSecondary>
      </Box>
      <Box sx={{ width: "40%", display: { xs: "none", md: "block" } }}>
        <img
          src={isDarkModeOn ? "./blue.png" : "./green.png"}
          alt="blue"
          style={{ width: "80%" }}
        />
      </Box>
    </Box>
  );
};

export default Home;
