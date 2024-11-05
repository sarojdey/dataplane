import { useState, useContext } from "react";
import {
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

import { v6 as uuidv6 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

import usePostRequest from "../../hooks/usePostRequest";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";
import { useAuth } from "../../context/AuthContext";
const CreateNewCase = () => {
  const { postRequest } = usePostRequest();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { data, setData, isDarkModeOn } = useContext(Context);
  const [formData, setFormData] = useState({
    product: "",
    version: "",
    summary: "",
    issueType: "",
    severity: "",
  });
  const [descriptionData, setDescriptionData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function validateVersion(version) {
    const versionRegex = /^[0-9]+(\.[0-9]+)*$/;

    if (versionRegex.test(version)) {
      return true;
    } else {
      return false;
    }
  }

  const handleValidation = (formData) => {
    const isVersionValid = validateVersion(formData.version);
    return (
      formData.product.length > 0 &&
      formData.version.length > 0 &&
      formData.summary.length > 0 &&
      descriptionData.length > 0 &&
      formData.issueType.length > 0 &&
      formData.severity > 0 &&
      isVersionValid
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation(formData)) {
      setShowError(true);
      return;
    }

    const ticket = {
      ...formData,
      description: descriptionData,
      id: uuidv6(),
      status: "opened",
      waitingOn: "owner",
      reporter: user._id,
      assignee: "Unassigned",
    };
    setFormData({
      product: "",
      version: "",
      summary: "",
      issueType: "",
      severity: "",
    });
    setDescriptionData("");
    setShowError(false);

    try {
      const newTicket = await postRequest("/tickets/postTicket", ticket);
      if (newTicket) {
        const newData = [...data, newTicket];
        setData(newData);
      }
      navigate("/view");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setShowError(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--color-bg-primary)",
        width: "100%",
        paddingY: "3rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: { xs: "95%", sm: "90%", md: "80%" },
          margin: "auto",
          paddingY: { xs: "1.5rem", md: "4rem" },
          border: "solid 1px #d6d6d6",
          borderRadius: "5px",
        }}
        display="flex"
        flexDirection="column"
      >
        <Box
          sx={{ width: "85%", margin: "auto", paddingRight: { md: "2rem" } }}
        >
          <form id="createnewcase" onSubmit={handleSubmit}>
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
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Summary:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <TextField
                    error={!formData.summary && showError}
                    helperText={
                      !formData.summary && showError
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
                    value={formData.summary}
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
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Product:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <TextField
                    error={!formData.product && showError}
                    helperText={
                      !formData.product && showError
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
                    value={formData.product}
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
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Version:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <TextField
                    error={
                      (!formData.version ||
                        !validateVersion(formData.version)) &&
                      showError
                    }
                    helperText={
                      !formData.version && showError
                        ? "Please provide a version."
                        : !validateVersion(formData.version) && showError
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
                    value={formData.version}
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
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Issue:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <Select
                    error={!formData.issueType && showError}
                    id="issue"
                    name="issueType"
                    displayEmpty
                    value={formData.issueType}
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
                    <MenuItem value="Performance Issue">
                      Performance Issue
                    </MenuItem>
                    <MenuItem value="Security Issue">Security Issue</MenuItem>
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
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Severity:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <Select
                    error={!formData.severity && showError}
                    id="severity"
                    name="severity"
                    displayEmpty
                    value={formData.severity}
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
              <FormControl fullWidth>
                <Box
                  display={"flex"}
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontSize={16}
                    color="text.secondary"
                    sx={{
                      marginRight: "1rem",
                      width: "15%",
                      textAlign: { xs: "left", md: "right" },
                      marginBottom: { xs: "0.5rem", md: 0 },
                    }}
                  >
                    Description:<sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <MdEditor
                    preview={false}
                    style={{ marginBottom: "1rem" }}
                    language="en-US"
                    modelValue={descriptionData}
                    onChange={setDescriptionData}
                    previewTheme={"github"}
                    toolbars={[
                      "bold",
                      "underline",
                      "italic",
                      "-",
                      "strikeThrough",
                      "sub",
                      "sup",
                      "quote",
                      "unorderedList",
                      "orderedList",
                      "-",
                      "codeRow",
                      "code",
                      "image",
                      "link",
                      "table",
                      "-",
                      "revoke",
                      "next",
                      "=",
                      "pageFullscreen",
                      "preview",
                    ]}
                  />
                </Box>
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <ButtonSecondary
                  onButtonClick={() => {
                    navigate("/");
                  }}
                  color={"error"}
                  buttonVariant={"outlined"}
                >
                  Cancel
                </ButtonSecondary>
                <ButtonSecondary
                  buttonType={"submit"}
                  buttonColor={"var(--color-primary-darker)"}
                  buttonVariant={"contained"}
                >
                  Submit
                </ButtonSecondary>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewCase;
