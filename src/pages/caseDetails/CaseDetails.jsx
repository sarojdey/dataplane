import {
  Box,
  Button,
  Collapse,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import CommentList from "../../components/comment/CommentList";
import CaseDetailsCard from "../../components/caseDetailsCard/CaseDetailsCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useGetRequest from "../../hooks/useGetRequest";
import { useRef } from "react";
import ThereDotLoader from "../../components/loaders/ThereDotLoader";
import usePostRequest from "../../hooks/usePostRequest";
import usePutRequest from "../../hooks/usePutRequest";
import { useAuth } from "../../context/AuthContext";

const CaseDetails = () => {
  const { user } = useAuth();
  const location = useLocation();

  const editorRef = useRef(null);

  const { rowData } = location.state || {};
  const [showComment, setShowComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingPeople, setIsEditingPeople] = useState(false);

  const [issue, setIssue] = useState(null);
  const ticketId = rowData._id;
  const { postRequest } = usePostRequest();

  const [commentContent, setCommentContent] = useState("");

  const [commentId, setCommentId] = useState(null);
  const { putRequest } = usePutRequest();

  const handleCommentClick = () => {
    const currentValue = showComment;
    setShowComment(!currentValue);
  };

  const { data: response, loading } = useGetRequest(
    `/tickets/getTicket/${ticketId}`
  );
  useEffect(() => {
    if (response) {
      setIssue(response);
    }
  }, [response]);

  const handleCancle = () => {
    if (setIsEditing) {
      setIsEditing(false);

      setCommentId(null);
    }
    setShowEditor(false);
    setCommentContent("");
  };

  const handleStopEditingDetails = () => {
    setIsEditingDetails(false);
  };
  const handleStopEditingPeople = () => {
    setIsEditingPeople(false);
  };
  const handleStopEditingDescription = () => {
    setIsEditingDescription(false);
  };
  const handleEditClick = () => {
    if (editorRef.current) {
      setShowEditor(true);
      setIsEditing(true);
      editorRef.current.scrollIntoView({ behavior: "smooth" });
      editorRef.current.focus();
    }
  };
  const handleEditDetailsClick = () => {
    setIsEditingDetails(true);
  };
  const handleEditDescriptionClick = () => {
    setIsEditingDescription(true);
  };
  const handleEditPeopleClick = () => {
    setIsEditingPeople(true);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!isEditing) {
      try {
        const response = await postRequest(`/comments/addComment/${ticketId}`, {
          userId: user._id,
          content: commentContent,
        });

        if (response) {
          setShowEditor(false);
          setIssue(response);
          setCommentContent("");
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        alert(
          "An error occurred while adding your comment. Please try again later."
        );
      }
    } else {
      try {
        const response = await putRequest(
          `/comments/updateComment/${ticketId}/${commentId}`,
          {
            userId: user._id,
            content: commentContent,
          }
        );
        if (response) {
          setIssue(response);
          handleCancle();
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  return loading ? (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThereDotLoader />
    </div>
  ) : (
    <>
      <Box
        sx={{
          paddingBottom: "1rem",
          paddingTop: "1rem",
          backgroundColor: "var(--color-bg-primary)",
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            width: { xs: "95%", md: "80%" },
            margin: "auto",
            paddingTop: { xs: "1rem", md: "2rem" },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {issue && (
            <CaseDetailsCard
              caseId={ticketId}
              rowData={issue}
              handleEditDetailsClick={handleEditDetailsClick}
              onCaseChange={setIssue}
              handleStopEditingDetails={handleStopEditingDetails}
              isEditingDetails={isEditingDetails}
              isEditingDescription={isEditingDescription}
              handleEditDescriptionClick={handleEditDescriptionClick}
              handleStopEditingDescription={handleStopEditingDescription}
              isEditingPeople={isEditingPeople}
              handleEditPeopleClick={handleEditPeopleClick}
              handleStopEditingPeople={handleStopEditingPeople}
            />
          )}

          {issue?.comments?.length > 0 && (
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                {showComment ? (
                  <IconButton
                    sx={{ paddingLeft: 0 }}
                    disableFocusRipple
                    disableRipple
                    onClick={handleCommentClick}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        border: "solid 1px #d6d6d6",
                        borderRadius: "5px",
                        backgroundColor: "#fafafa",
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ paddingLeft: 0 }}
                    disableFocusRipple
                    disableRipple
                    onClick={handleCommentClick}
                  >
                    <KeyboardArrowRightIcon
                      sx={{
                        border: "solid 1px #d6d6d6",
                        borderRadius: "5px",
                        backgroundColor: "#fafafa",
                      }}
                    />
                  </IconButton>
                )}
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="text.secondary"
                  sx={{
                    marginLeft: "0.2rem",
                    width: "100%",
                    textAlign: "left",
                    color: "var(--color-secondary)",
                  }}
                >
                  Comments({issue?.comments?.length})
                </Typography>
              </Box>

              {showComment && (
                <CommentList
                  onEditSetEditingComment={setCommentId}
                  onEditChangeCommentContent={setCommentContent}
                  onEditClose={setIsEditing}
                  onEditClick={handleEditClick}
                  comments={issue?.comments}
                />
              )}
            </div>
          )}

          <div
            ref={editorRef}
            style={{ width: "100%", borderRadius: "5px", overflow: "hidden" }}
          >
            <Box
              onClick={() => {
                const prev = showEditor;
                setShowEditor(!prev);
              }}
              sx={{
                backgroundColor: "white",
                borderTop: "solid 1px #e4e4e4",
                borderLeft: "solid 1px #e4e4e4",
                borderRight: "solid 1px #e4e4e4",
                borderBottom: showEditor ? "none" : "solid 1px #e4e4e4",
                height: "4rem",
                padding: "1rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                },
                display: "flex",
              }}
            >
              <Typography
                fontSize={18}
                fontWeight={600}
                color="text.secondary"
                variant="h6"
                sx={{ marginLeft: "0.5rem", width: "100%", textAlign: "left" }}
              >
                Add a comment..
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!showEditor ? (
                  <AddCommentIcon
                    sx={{
                      color: "text.secondary",
                      marginRight: "0.5rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                ) : (
                  <KeyboardArrowUpIcon
                    sx={{
                      border: "solid 1px #d6d6d6",
                      borderRadius: "5px",
                      backgroundColor: "#fafafa",
                      marginRight: "0.5rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                )}
              </Box>
            </Box>

            <Collapse in={showEditor} timeout="auto" unmountOnExit>
              <form
                id="casedetails"
                onSubmit={handleCommentSubmit}
                style={{ width: "100%", marginBottom: "2rem" }}
              >
                <FormControl fullWidth>
                  <MdEditor
                    preview={false}
                    style={{ marginBottom: "1rem" }}
                    language="en-US"
                    modelValue={commentContent}
                    onChange={setCommentContent}
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
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      disableElevation
                      disableRipple
                      onClick={handleCancle}
                      sx={{
                        backgroundColor: "white",
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
            </Collapse>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default CaseDetails;
