import { useRef, useState, useEffect } from "react";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignIn = () => {
  const { login, error } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(pwd.length > 0);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = pwd.length > 0;
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    await login(email, pwd);

    setEmail("");
    setPwd("");
  };

  return (
    <>
      <Box
        sx={{
          paddingY: "2rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "whitesmoke",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "350px" },
            padding: "2rem",
            backgroundColor: "#ffff",
            border: "solid 1px #d6d6d6",
            borderRadius: "10px",
            boxShadow: 1,
            color: "black",
          }}
        >
          <Typography
            ref={errRef}
            sx={{
              color: "firebrick",
              display: errMsg ? "block" : "none",
              mb: 2,
            }}
            aria-live="assertive"
          >
            {errMsg}
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: "2.8rem", fontWeight: "600" }}
            gutterBottom
          >
            Welcome to <br />
            <span
              style={{
                color: "var(--color-primary-darker)",
                fontSize: "2.8rem",
              }}
            >
              DataPlane.
            </span>
          </Typography>
          <Divider></Divider>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.8rem", fontWeight: "600", mt: 4 }}
            gutterBottom
          >
            Sign In
          </Typography>
          {error && (
            <Typography fontWeight={500} sx={{ color: "red" }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {/* Username */}

            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="label"
                htmlFor="emailname"
                fontWeight={500}
                variant="body"
              >
                Email address
              </Typography>
              <TextField
                id="emailname"
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                required
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </Box>

            <Typography
              id="emailnote"
              sx={{
                fontSize: "0.75rem",
                color: "#fff",
                background: "#000",
                borderRadius: "0.5rem",
                padding: "1rem",
                mt: 1,
                display: emailFocus && email && !validEmail ? "block" : "none",
              }}
            >
              <InfoIcon
                sx={{
                  mr: 0.5,
                  fontSize: "1.1rem",
                  position: "relative",
                  top: "0.2rem",
                  color: "red",
                }}
              />
              Please enter a valid email address. Must contain an &quot;@&quot;
              and a valid domain.
            </Typography>

            {/* Password */}

            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="label"
                htmlFor="password"
                fontWeight={500}
                variant="body"
              >
                Password
              </Typography>

              <TextField
                id="password"
                placeholder="Enter password"
                variant="outlined"
                fullWidth
                required
                type="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              />
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              disableElevation
              type="submit"
              disabled={!validEmail || !validPwd}
              sx={{
                mt: 4,
                mb: 2,
                backgroundColor: "var(--color-primary-darker)",
                height: "3rem",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "var(--color-primary)",
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography>
            Need an account?{" "}
            <span
              onClick={() => {
                navigate("/auth/signup");
              }}
              style={{
                textDecoration: "none",
                fontWeight: "500",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign Up
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
