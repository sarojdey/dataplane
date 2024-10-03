import { Box } from "@mui/material";

const Avatars = ({ setUserDetails, userDetails }) => {
  return (
    <Box
      sx={{
        height: "15rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "1",
      }}
    >
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar1.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar1.png"
          alt="proflie"
        />
      </Box>
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar2.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar2.png"
          alt="proflie"
        />
      </Box>
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar3.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar3.png"
          alt="proflie"
        />
      </Box>
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar4.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar4.png"
          alt="proflie"
        />
      </Box>
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar5.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar5.png"
          alt="proflie"
        />
      </Box>
      <Box
        borderRadius={"100%"}
        sx={{
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "1.5rem",
        }}
      >
        <img
          onClick={() => {
            setUserDetails({ ...userDetails, avatar: "/avatar6.png" });
          }}
          style={{ height: "100%", width: "100%", cursor: "pointer" }}
          src="/avatar6.png"
          alt="proflie"
        />
      </Box>
    </Box>
  );
};

export default Avatars;
