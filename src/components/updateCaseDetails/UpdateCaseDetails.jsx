import { useState, useContext } from "react";
import {
  Box,
  TextField,
  FormControl,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import usePutRequest from "../../hooks/usePutRequest";
import { Context } from "../../context/Context";

const UpdateCaseDetails = ({
  caseData,
  onCaseChange,
  ticketId,
  handleStopEditingDetails,
}) => {
  const { putRequest } = usePutRequest();
  const [showError, setShowError] = useState(false);
  const { isDarkModeOn } = useContext(Context);
  const [detailsData, setDetailsData] = useState({
    product: caseData?.product,
    version: caseData?.version,
    summary: caseData?.summary,
    issueType: caseData?.issueType,
    severity: caseData?.severity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailsData({ ...detailsData, [name]: value });
  };

  function validateVersion(version) {
    const versionRegex = /^[0-9]+(\.[0-9]+)*$/;

    if (versionRegex.test(version)) {
      return true;
    } else {
      return false;
    }
  }
  const handleDetailsValidation = (detailsData) => {
    const isVersionValid = validateVersion(detailsData.version);
    return (
      detailsData.product.length > 0 &&
      detailsData.version.length > 0 &&
      detailsData.summary.length > 0 &&
      detailsData.issueType.length > 0 &&
      detailsData.severity > 0 &&
      isVersionValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleDetailsValidation(detailsData)) {
      setShowError(true);
      return;
    }

    const ticket = {
      ...detailsData,
    };
    setShowError(false);
    handleStopEditingDetails();

    setDetailsData({
      product: "",
      version: "",
      summary: "",
      issueType: "",
      severity: "",
    });

    try {
      const response = await putRequest(
        `/tickets/updateTicketDetails/${ticketId}`,
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
        padding: "3rem",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "white",
        width: "100%",
        margin: "auto",

        border: "solid 1px #d6d6d6",
      }}
      display="flex"
      flexDirection="column"
      borderRadius={1}
    >
      <form id="updatecasedetails" onSubmit={handleSubmit}>
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
                Summary:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <TextField
                error={!detailsData.summary && showError}
                helperText={
                  !detailsData.summary && showError
                    ? "Please provide a summary."
                    : ""
                }
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
                id="summary"
                name="summary"
                variant="outlined"
                value={detailsData.summary}
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
                Product:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <TextField
                error={!detailsData.product && showError}
                helperText={
                  !detailsData.product && showError
                    ? "Please provide a product name."
                    : ""
                }
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
                id="product"
                name="product"
                variant="outlined"
                value={detailsData.product}
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
                Version:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <TextField
                error={
                  (!detailsData.version ||
                    !validateVersion(detailsData.version)) &&
                  showError
                }
                helperText={
                  !detailsData.version && showError
                    ? "Please provide a version."
                    : !validateVersion(detailsData.version) && showError
                    ? "Please enter a valid version."
                    : ""
                }
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
                id="version"
                name="version"
                variant="outlined"
                value={detailsData.version}
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
                Issue:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <Select
                error={!detailsData.issueType && showError}
                id="issue"
                name="issueType"
                displayEmpty
                value={detailsData.issueType}
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
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Feature Request">Feature Request</MenuItem>
                <MenuItem value="Performance Issue">Performance Issue</MenuItem>
                <MenuItem value="Security Issue">Security Issue</MenuItem>
              </Select>
            </Box>
          </FormControl>
          {/* ================================ SECTION ================================ */}
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
                Severity:<sup style={{ color: "red" }}>*</sup>
              </Typography>
              <Select
                error={!detailsData.severity && showError}
                id="severity"
                name="severity"
                displayEmpty
                value={detailsData.severity}
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
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </Box>
          </FormControl>

          {/* ================================ SECTION ================================ */}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              disableElevation
              disableRipple
              onClick={handleStopEditingDetails}
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

export default UpdateCaseDetails;
