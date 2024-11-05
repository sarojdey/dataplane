import { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import { RxCrossCircled } from "react-icons/rx";
import { RxCheckCircled } from "react-icons/rx";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const { signup, error } = useAuth();

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastname, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidFirstName(firstname);
  }, [firstname]);

  useEffect(() => {
    setValidLastName(lastname);
  }, [lastname]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd, firstname, lastname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = firstname;
    const v4 = lastname;
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }

    await signup(email, pwd, firstname, lastname);

    setEmail("");
    setPwd("");
    setMatchPwd("");
    setFirstName("");
    setLastName("");
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
          color: "black",
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
            Sign Up
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
                htmlFor="firstName"
                fontWeight={500}
                variant="body"
              >
                First name
              </Typography>
              <TextField
                id="firstName"
                placeholder="Enter your firstName"
                variant="outlined"
                fullWidth
                required
                ref={firstNameRef}
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="firstnameNote"
                InputProps={{
                  endAdornment: firstname ? (
                    validFirstName ? (
                      <RxCheckCircled
                        style={{ fontSize: "1.5rem", color: "limegreen" }}
                      />
                    ) : (
                      <RxCrossCircled
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    )
                  ) : (
                    <></>
                  ),
                }}
              />
            </Box>
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
                htmlFor="firstName"
                fontWeight={500}
                variant="body"
              >
                Last name
              </Typography>
              <TextField
                id="lastName"
                placeholder="Enter your lastName"
                variant="outlined"
                fullWidth
                required
                ref={lastNameRef}
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="lastnameNote"
                InputProps={{
                  endAdornment: lastname ? (
                    validLastName ? (
                      <RxCheckCircled
                        style={{ fontSize: "1.5rem", color: "limegreen" }}
                      />
                    ) : (
                      <RxCrossCircled
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    )
                  ) : (
                    <></>
                  ),
                }}
              />
            </Box>

            {/* Email */}

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
                InputProps={{
                  endAdornment: email ? (
                    validEmail ? (
                      <RxCheckCircled
                        style={{ fontSize: "1.5rem", color: "limegreen" }}
                      />
                    ) : (
                      <RxCrossCircled
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    )
                  ) : (
                    <></>
                  ),
                }}
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
                Set password
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
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                InputProps={{
                  endAdornment: pwd ? (
                    validPwd ? (
                      <RxCheckCircled
                        style={{ fontSize: "1.5rem", color: "limegreen" }}
                      />
                    ) : (
                      <RxCrossCircled
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    )
                  ) : (
                    <></>
                  ),
                }}
              />
            </Box>

            <Typography
              id="pwdnote"
              sx={{
                fontSize: "0.75rem",
                color: "#fff",
                background: "#000",
                borderRadius: "0.5rem",
                padding: "1rem",
                mt: 1,

                display: pwdFocus && !validPwd ? "block" : "none",
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
              8 to 24 characters. Must include uppercase and lowercase letters,
              a number and a special character.
            </Typography>

            {/* Confirm Password */}
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
                htmlFor="confirm_pwd"
                fontWeight={500}
                variant="body"
              >
                Confirm password
              </Typography>

              <TextField
                id="confirm_pwd"
                placeholder="Enter password"
                variant="outlined"
                fullWidth
                required
                type="password"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirm_pwd_note"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                InputProps={{
                  endAdornment: matchPwd ? (
                    validMatch ? (
                      <RxCheckCircled
                        style={{ fontSize: "1.5rem", color: "limegreen" }}
                      />
                    ) : (
                      <RxCrossCircled
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    )
                  ) : (
                    <></>
                  ),
                }}
              />
            </Box>

            <Typography
              id="confirm_pwd_note"
              sx={{
                fontSize: "0.75rem",
                color: "#fff",
                background: "#000",
                borderRadius: "0.5rem",
                padding: "1rem",
                mt: 1,
                display: matchFocus && !validMatch ? "block" : "none",
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
              Must match the first password input field.
            </Typography>

            {/* Submit Button */}
            <Button
              variant="contained"
              disableElevation
              type="submit"
              disabled={
                !validEmail || !validPwd || !validMatch || !validFirstName
              }
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
              Sign Up
            </Button>
          </Box>

          <Typography>
            Already registered?{" "}
            <span
              onClick={() => {
                navigate("/auth/signin");
              }}
              style={{
                textDecoration: "none",
                fontWeight: "500",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
