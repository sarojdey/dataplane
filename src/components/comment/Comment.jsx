import { useState } from "react";

import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./style.css";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { convertToHumanReadable } from "../../utils/dateFormat";

import { useAuth } from "../../context/AuthContext";

const Comment = ({
  comment,
  onEditClick,
  onEditChangeCommentContent,
  onEditSetEditingComment,
}) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditMenuClick = () => {
    onEditClick();
    handleClose();
    onEditChangeCommentContent(comment.content);
    onEditSetEditingComment(comment.commentId);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "1.5rem",
      }}
    >
      <Card
        elevation={0}
        sx={{
          padding: "1.5rem",
          borderRadius: "1.5rem",
          border: "solid 1px #d6d6d6",
        }}
      >
        <Typography
          sx={{
            color: "var(--color-secondary)",
            fontSize: 20,
            marginRight: "2rem",
            marginTop: "1rem",
          }}
          display={"flex"}
          justifyContent={"end"}
          color="text.secondary"
          gutterBottom
        >
          #{comment.commentId}
        </Typography>

        <CardHeader
          avatar={
            <Box
              borderRadius={"100%"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "2.5rem",
                height: "2.5rem",
              }}
            >
              <img
                style={{ height: "100%", width: "100%" }}
                src={comment?.user?.avatar || "/avatar1.png"}
                alt="proflie"
              />
            </Box>
          }
          action={
            user._id === comment?.user?._id && (
              <IconButton
                id="options"
                aria-controls={open ? "options-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
          subheader={convertToHumanReadable(comment.updatedAt)}
        />

        {user._id === comment?.user?._id && (
          <Menu
            elevation={2}
            sx={{
              borderRadius: 6,
              marginTop: "1rem",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleEditMenuClick}
              sx={{ fontSize: "16" }}
              disableRipple
            >
              Edit
            </MenuItem>
          </Menu>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          <Divider flexItem sx={{ width: "100%" }} />
        </div>

        <CardContent sx={{ paddingX: { md: "3rem" } }}>
          <MdPreview
            theme="light"
            language="en-US"
            modelValue={comment.content}
            previewTheme={"github"}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
