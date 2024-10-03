import { useState, useContext } from "react";
import { Box, FormControl, Button } from "@mui/material";

import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import usePutRequest from "../../hooks/usePutRequest";
import { Context } from "../../context/Context";

const UpdateCaseDescription = ({
  caseData,
  onCaseChange,
  ticketId,
  handleStopEditingDescription,
}) => {
  const { putRequest } = usePutRequest();
  const { isDarkModeOn } = useContext(Context);

  const [descriptionData, setDescriptionData] = useState(caseData?.description);

  const handleDescriptionValidation = (descriptionData) => {
    return descriptionData.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleDescriptionValidation(descriptionData)) {
      return;
    }

    const ticket = {
      description: descriptionData,
    };

    try {
      const response = await putRequest(
        `/tickets/updateTicketDescription/${ticketId}`,
        ticket
      );

      if (response) {
        onCaseChange(response);
      } else {
        console.error("Unexpected response format:", response);
      }

      handleStopEditingDescription();
      setDescriptionData("");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <form style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <FormControl fullWidth>
          <Box
            display={"flex"}
            sx={{
              marginBottom: "1rem",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
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
          <Button
            disableElevation
            disableRipple
            onClick={handleStopEditingDescription}
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
              backgroundColor: isDarkModeOn
                ? "var(--color-primary)"
                : "var(--color-secondary)",
              "&:hover": {
                backgroundColor: isDarkModeOn
                  ? "var(--color-primary)"
                  : "var(--color-secondary)",
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
  );
};

export default UpdateCaseDescription;