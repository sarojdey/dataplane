import { useState, useContext } from "react";
import {
  MenuItem,
  Select,
  Box,
  FormControl,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import usePutRequest from "../../hooks/usePutRequest";
import "md-editor-rt/lib/style.css";

import { Context } from "../../context/Context";

const UpdateCasePeople = ({
  caseData,
  onCaseChange,
  ticketId,
  handleStopEditingPeople,
}) => {
  const { putRequest } = usePutRequest();
  const [showError, setShowError] = useState(false);
  const { isDarkModeOn } = useContext(Context);

  const [peopleData, setPeopleData] = useState({
    status: caseData?.status,
    waitingOn: caseData?.waitingOn,
    reporter: `${caseData?.reporter?.firstName} ${caseData?.reporter?.lastName}`,
    assignee: caseData?.assignee,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeopleData({ ...peopleData, [name]: value });
  };

  const handlePeopleValidation = (peopleData) => {
    return (
      peopleData.status.length > 0 &&
      peopleData.waitingOn.length > 0 &&
      peopleData.reporter.length > 0 &&
      peopleData.assignee.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handlePeopleValidation(peopleData)) {
      setShowError(true);
      return;
    }

    const ticket = {
      ...peopleData,
    };
    setShowError(false);
    handleStopEditingPeople();
    setPeopleData({
      status: "opened",
      waitingOn: "owner",
      reporter: "",
      assignee: "",
    });

    try {
      const response = await putRequest(
        `/tickets/updateTicketPeople/${ticketId}`,
        ticket
      );

      if (response) {
        onCaseChange(response);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setShowError(true);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: "3rem",

        border: "solid 1px #d6d6d6",
        backgroundColor: "white",
      }}
      display="flex"
      flexDirection="column"
      borderRadius={1}
    >
      <form id="updatecase people" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <FormControl fullWidth>
            <Box
              display={"flex"}
              sx={{
                marginBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                variant="h6"
                fontSize={16}
                color="text.secondary"
                sx={{
                  marginRight: "1rem",
                  width: "20%",
                  textAlign: { xs: "left", md: "right" },
                  marginBottom: { xs: "0.5rem", md: 0 },
                }}
              >
                Waiting On:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <Select
                error={!peopleData.waitingOn && showError}
                id="waitingOn"
                name="waitingOn"
                value={peopleData.waitingOn}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkModeOn
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                  },
                }}
              >
                <MenuItem value={"customer"}>Customer</MenuItem>
                <MenuItem value={"owner"}>Owner</MenuItem>
              </Select>
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <Box
              display={"flex"}
              sx={{
                marginBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                variant="h6"
                fontSize={16}
                color="text.secondary"
                sx={{
                  marginRight: "1rem",
                  width: "20%",
                  textAlign: { xs: "left", md: "right" },
                  marginBottom: { xs: "0.5rem", md: 0 },
                }}
              >
                Reporter:<sup style={{ color: "red" }}>*</sup>
              </Typography>

              <TextField
                disabled
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: isDarkModeOn
                        ? "var(--color-primary)"
                        : "var(--color-secondary)",
                    },
                  },
                }}
                id="reporter"
                name="reporter"
                variant="outlined"
                value={peopleData.reporter}
                onChange={handleChange}
              />
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <Box
              display={"flex"}
              sx={{
                marginBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                variant="h6"
                fontSize={16}
                color="text.secondary"
                sx={{
                  marginRight: "1rem",
                  width: "20%",
                  textAlign: { xs: "left", md: "right" },
                  marginBottom: { xs: "0.5rem", md: 0 },
                }}
              >
                Assignee:<sup style={{ color: "red" }}>*</sup>
              </Typography>

              <TextField
                disabled
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: isDarkModeOn
                        ? "var(--color-primary)"
                        : "var(--color-secondary)",
                    },
                  },
                }}
                id="assignee"
                name="assignee"
                variant="outlined"
                value={peopleData.assignee}
                onChange={handleChange}
              />
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <Box
              display={"flex"}
              sx={{
                marginBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                variant="h6"
                fontSize={16}
                color="text.secondary"
                sx={{
                  marginRight: "1rem",
                  width: "20%",
                  textAlign: { xs: "left", md: "right" },
                  marginBottom: { xs: "0.5rem", md: 0 },
                }}
              >
                Status:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <Select
                error={!peopleData.status && showError}
                id="status"
                name="status"
                displayEmpty
                value={peopleData.status}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkModeOn
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                  },
                }}
              >
                <MenuItem value="opened" disabled>
                  Opened
                </MenuItem>
                <MenuItem value="onHold">On Hold</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </Box>
          </FormControl>
          {/* ================================ SECTION ================================ */}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              disableElevation
              disableRipple
              onClick={handleStopEditingPeople}
              sx={{
                width: "7rem",
                marginTop: "2rem",
                marginRight: "1rem",
                textTransform: "none",
                color: "error.main",
                borderColor: "error.main",
                fontWeight: "500",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "error.main",

                  color: "white",
                },
              }}
              color="error"
              variant="outlined"
            >
              Cancle
            </Button>
            <Button
              disableElevation
              disableRipple
              sx={{
                width: "7rem",
                fontWeight: "500",
                fontSize: "16px",
                textTransform: "none",
                marginTop: "2rem",
                backgroundColor: "var(--color-primary-darker)",
                "&:hover": {
                  backgroundColor: "var(--color-primary)",
                },
              }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default UpdateCasePeople;
