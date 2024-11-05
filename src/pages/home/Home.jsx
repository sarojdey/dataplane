import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";
import { SiAwsorganizations } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        justifyContent: "center",
        gap: "10rem",
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
            color: "var(--color-secondary)",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
          variant="h3"
          fontWeight="bold"
        >
          Feedback with{" "}
          <span style={{ fontSize: "inherit", color: "var(--color-primary)" }}>
            DataPlane.
          </span>
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
          buttonColor={"var(--color-primary-darker)"}
          buttonVariant={"contained"}
          buttonStyles={{
            marginTop: { xs: "2rem", md: "3rem" },
          }}
          startIcon={<AddCircleIcon />}
        >
          CREATE
        </ButtonSecondary>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <SiAwsorganizations style={{ fontSize: "20rem" }} />
      </Box>
    </Box>
  );
};

export default Home;
