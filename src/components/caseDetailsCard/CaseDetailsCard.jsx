import {
  Chip,
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
  Collapse,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";

import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CheckIcon from "@mui/icons-material/Check";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LoopIcon from "@mui/icons-material/Loop";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { convertToHumanReadable } from "../../utils/dateFormat";

import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./style.css";
import { useState } from "react";
import UpdateCaseDetails from "../updateCaseDetails/UpdateCaseDetails";
import UpdateCaseDescription from "../updateCaseDescription/UpdateCaseDescription";
import UpdateCasePeople from "../updateCasePeople/UpdateCasePeople";
import { useAuth } from "../../context/AuthContext";

const waitingOnOptions = {
  customer: {
    icon: <PeopleAltIcon />,
    label: "Customer",
  },
  owner: {
    icon: <PersonIcon />,
    label: "Owner",
  },
};

const statusOptions = {
  opened: {
    icon: <EmojiObjectsIcon />,
    color: "info",
    label: "Opened",
  },
  onHold: {
    icon: <PauseCircleIcon />,
    color: "error",
    label: "On Hold",
  },
  inProgress: {
    icon: <LoopIcon />,
    color: "secondary",
    label: "In Progress",
  },
  closed: {
    icon: <CheckIcon />,
    color: "success",
    label: "Closed",
  },
};

const CaseDetailsCard = ({
  rowData,
  handleEditDetailsClick,
  caseId,
  onCaseChange,
  isEditingDetails,
  handleStopEditingDetails,
  isEditingDescription,
  handleEditDescriptionClick,
  handleStopEditingDescription,
  isEditingPeople,
  handleEditPeopleClick,
  handleStopEditingPeople,
}) => {
  const { user } = useAuth();
  const [showDescription, setShowDescription] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showPeople, setShowPeople] = useState(true);

  const handleDescriptionClick = () => {
    const currentValue = showDescription;
    setShowDescription(!currentValue);
  };

  const handleDescriptionEditClick = () => {
    handleEditDescriptionClick();
    setShowDescription(true);
  };
  const handleAttachmentsClick = () => {
    const currentValue = showAttachments;
    setShowAttachments(!currentValue);
  };
  const handleDetailsClick = () => {
    const currentValue = showDetails;
    setShowDetails(!currentValue);
  };
  const handlePeopleClick = () => {
    const currentValue = showPeople;
    setShowPeople(!currentValue);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: { xs: "2rem", md: "4rem" } }}>
      {isEditingDetails && rowData ? (
        <UpdateCaseDetails
          caseData={rowData}
          ticketId={caseId}
          onCaseChange={onCaseChange}
          handleStopEditingDetails={handleStopEditingDetails}
        />
      ) : isEditingPeople && rowData ? (
        <UpdateCasePeople
          caseData={rowData}
          ticketId={caseId}
          onCaseChange={onCaseChange}
          handleStopEditingPeople={handleStopEditingPeople}
        />
      ) : (
        <Card
          elevation={0}
          sx={{
            transition: "all 0.3s ease-in-out",
            padding: { xs: "1rem", md: "3rem" },
            border: "solid 1px #d6d6d6",
            borderRadius: "1.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/view">
                Cases
              </Link>

              <Typography color="text.primary">
                {rowData.ticketNumber}
              </Typography>
            </Breadcrumbs>
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "28px" },
                marginBottom: "2rem",
                fontWeight: "500",
              }}
              component="div"
            >
              {rowData.summary}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showDetails ? (
                    <IconButton
                      sx={{ paddingLeft: 0 }}
                      disableFocusRipple
                      disableRipple
                      onClick={handleDetailsClick}
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
                      onClick={handleDetailsClick}
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
                  <Typography sx={{ fontWeight: "500", marginRight: "0.5rem" }}>
                    Details
                  </Typography>
                  {user._id === rowData?.reporter?._id && (
                    <IconButton
                      sx={{ paddingLeft: 0 }}
                      disableFocusRipple
                      disableRipple
                      onClick={handleEditDetailsClick}
                    >
                      <FiEdit
                        style={{
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
                <Collapse in={showDetails} timeout="auto" unmountOnExit>
                  <Stack
                    sx={{ width: { md: "500px" } }}
                    marginTop={"1rem"}
                    marginBottom={"2rem"}
                    spacing={1}
                    direction={"column"}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Product:
                      </Typography>
                      <Box sx={{}}>{rowData.product}</Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Version:
                      </Typography>
                      <Box sx={{}}>{rowData.version}</Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Issue Type:
                      </Typography>
                      <Box sx={{}}>{rowData.issueType}</Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Severity:
                      </Typography>
                      <Box sx={{}}>{rowData.severity}</Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Created At:
                      </Typography>
                      <Box sx={{}}>
                        {convertToHumanReadable(rowData.createdAt)}
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          paddingRight: "1rem",
                          width: { xs: "30%", md: "25%" },
                          fontWeight: "500",
                        }}
                      >
                        Updated At:
                      </Typography>
                      <Box sx={{}}>
                        {convertToHumanReadable(rowData.updatedAt)}
                      </Box>
                    </Box>
                  </Stack>
                </Collapse>
              </Box>

              <Box>
                <Box
                  sx={{
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {showPeople ? (
                    <IconButton
                      sx={{ paddingLeft: 0 }}
                      disableFocusRipple
                      disableRipple
                      onClick={handlePeopleClick}
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
                      onClick={handlePeopleClick}
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
                  <Typography sx={{ fontWeight: "500", marginRight: "0.5rem" }}>
                    People
                  </Typography>
                  {user._id === rowData?.reporter?._id && (
                    <IconButton
                      sx={{ paddingLeft: 0 }}
                      disableFocusRipple
                      disableRipple
                      onClick={handleEditPeopleClick}
                    >
                      <FiEdit
                        style={{
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
                <Collapse in={showPeople} timeout="auto" unmountOnExit>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      marginBottom={2.5}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        color="text.secondary"
                        sx={{ width: "35%", fontWeight: "500" }}
                        component="span"
                      >
                        Waiting On:{" "}
                      </Typography>
                      <Chip
                        sx={{
                          padding: "5px",
                          fontWeight: "500",
                        }}
                        variant="outlined"
                        icon={
                          waitingOnOptions[rowData.waitingOn]?.icon || (
                            <PeopleAltIcon />
                          )
                        }
                        label={
                          waitingOnOptions[rowData.waitingOn]?.label ||
                          rowData.waitingOn
                        }
                      />
                    </Box>

                    <Box marginBottom={2.5} sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{ width: "35%", fontWeight: "500" }}
                        component="span"
                      >
                        Reporter:{" "}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          borderRadius={"100%"}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            marginRight: "0.5rem",
                            width: "1.2rem",
                            height: "1.2rem",
                          }}
                        >
                          <img
                            style={{ height: "100%", width: "100%" }}
                            src={rowData?.reporter?.avatar || "/avatar1.png"}
                            alt="proflie"
                          />
                        </Box>
                        {`${rowData?.reporter?.firstName} ${rowData?.reporter?.lastName}`}
                      </Box>
                    </Box>
                    <Box marginBottom={2.5} sx={{ display: "flex" }}>
                      <Typography
                        color="text.secondary"
                        sx={{ width: "35%", fontWeight: "500" }}
                        component="span"
                      >
                        Assignee:{" "}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            marginRight: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "100%",
                            backgroundColor: "#8b8b8b",
                            color: "white",
                            width: "1.2rem",
                            height: "1.2rem",
                            padding: "0.5rem",
                          }}
                        >
                          ?
                        </Box>
                        {rowData.assignee}
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        color="text.secondary"
                        sx={{ width: "35%", fontWeight: "500" }}
                        component="span"
                      >
                        Status:{" "}
                      </Typography>
                      <Chip
                        sx={{
                          padding: "5px",
                          fontWeight: "500",
                        }}
                        variant="outlined"
                        color={
                          statusOptions[rowData.status]?.color || "primary"
                        }
                        icon={
                          statusOptions[rowData.status]?.icon || (
                            <EmojiObjectsIcon />
                          )
                        }
                        label={
                          statusOptions[rowData.status]?.label || rowData.status
                        }
                      />
                    </Box>
                  </Stack>
                </Collapse>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                {showDescription ? (
                  <IconButton
                    sx={{ paddingLeft: 0 }}
                    disableFocusRipple
                    disableRipple
                    onClick={handleDescriptionClick}
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
                    onClick={handleDescriptionClick}
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
                <Typography sx={{ fontWeight: "500", marginRight: "0.5rem" }}>
                  Description
                </Typography>
                {user._id === rowData?.reporter?._id && (
                  <IconButton
                    sx={{ paddingLeft: 0 }}
                    disableFocusRipple
                    disableRipple
                    onClick={handleDescriptionEditClick}
                  >
                    <FiEdit
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  </IconButton>
                )}
              </Box>
              <Collapse in={showDescription} timeout="auto" unmountOnExit>
                {!isEditingDescription ? (
                  <MdPreview
                    theme="light"
                    language="en-US"
                    modelValue={rowData.description}
                    previewTheme={"github"}
                  />
                ) : (
                  <UpdateCaseDescription
                    caseData={rowData}
                    ticketId={caseId}
                    onCaseChange={onCaseChange}
                    handleStopEditingDescription={handleStopEditingDescription}
                  />
                )}
              </Collapse>
            </Box>
            {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                {showAttachments ? (
                  <IconButton
                    sx={{ paddingLeft: 0 }}
                    disableFocusRipple
                    disableRipple
                    onClick={handleAttachmentsClick}
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
                    onClick={handleAttachmentsClick}
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
                <Typography sx={{ fontWeight: "500" }}>Attachments</Typography>
              </Box>
              {showAttachments && <Typography>ATTACHMENTS</Typography>}
            </Box> */}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CaseDetailsCard;
