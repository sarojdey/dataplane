import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { RxCheckCircled } from "react-icons/rx";
import Avatars from "./Avatars";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const UserDetailsUpdate = ({ userDetails, setUserDetails }) => {
  return (
    <>
      <Box
        borderRadius={5}
        sx={{
          width: "100%",
          padding: { xs: "1rem", md: "3rem" },
          backgroundColor: "white",
          border: "solid 1px #d6d6d6",
          color: "var(--color-bg-secondary)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { md: "20rem" },
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Box
            borderRadius={"100%"}
            sx={{
              width: { xs: "12rem", md: "18rem" },
              height: { xs: "12rem", md: "18rem" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={userDetails.avatar || "/avatar1.png"}
              alt="proflie"
            />
          </Box>
        </Box>
        <Avatars userDetails={userDetails} setUserDetails={setUserDetails} />

        <Box
          display={"flex"}
          sx={{
            gap: { md: "1rem" },
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              mt: 2,
              gap: 2,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/* First Name Field */}
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
              placeholder="Enter your first name"
              variant="outlined"
              fullWidth
              required
              autoComplete="off"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  firstName: e.target.value,
                })
              }
              value={userDetails.firstName}
              aria-invalid={userDetails.firstName ? "false" : "true"}
              InputProps={{
                endAdornment: userDetails.firstName ? (
                  <RxCheckCircled
                    style={{ fontSize: "1.5rem", color: "limegreen" }}
                  />
                ) : (
                  <></>
                ),
              }}
            />

            {/* Last Name Field */}
            <Typography
              component="label"
              htmlFor="lastName"
              fontWeight={500}
              variant="body"
            >
              Last name
            </Typography>
            <TextField
              id="lastName"
              placeholder="Enter your last name"
              variant="outlined"
              fullWidth
              required
              autoComplete="off"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  lastName: e.target.value,
                })
              }
              value={userDetails.lastName}
              aria-invalid={userDetails.lastName ? "false" : "true"}
              InputProps={{
                endAdornment: userDetails.lastName ? (
                  <RxCheckCircled
                    style={{ fontSize: "1.5rem", color: "limegreen" }}
                  />
                ) : (
                  <></>
                ),
              }}
            />

            {/* Date of Birth Field */}
            <Typography
              component="label"
              htmlFor="dob"
              fontWeight={500}
              variant="body"
            >
              Date of Birth
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dob"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                onChange={(newValue) =>
                  setUserDetails({
                    ...userDetails,
                    dob: newValue,
                  })
                }
                value={userDetails.dob ? dayjs(userDetails.dob) : dayjs()}
                aria-invalid={userDetails.dob ? "false" : "true"}
              />
            </LocalizationProvider>

            {/* Gender Field */}
            <Typography
              component="label"
              htmlFor="gender"
              fontWeight={500}
              variant="body"
            >
              Gender
            </Typography>
            <Select
              id="gender"
              fullWidth
              required
              displayEmpty
              value={userDetails.gender}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  gender: e.target.value,
                })
              }
            >
              <MenuItem value="" disabled>
                <span>Select</span>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </Select>

            {/* Phone Number Field */}
            <Typography
              component="label"
              htmlFor="phone"
              fontWeight={500}
              variant="body"
            >
              Phone Number
            </Typography>
            <TextField
              id="phone"
              placeholder="Enter your phone number"
              variant="outlined"
              fullWidth
              required
              autoComplete="off"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  phone: e.target.value,
                })
              }
              value={userDetails.phone}
              aria-invalid={userDetails.phone ? "false" : "true"}
              InputProps={{
                endAdornment: userDetails.phone ? (
                  <RxCheckCircled
                    style={{ fontSize: "1.5rem", color: "limegreen" }}
                  />
                ) : (
                  <></>
                ),
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                mt: 2,
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Address Fields */}

              <Typography
                component="label"
                htmlFor="role"
                fontWeight={500}
                variant="body"
              >
                Role
              </Typography>

              <Select
                id="role"
                fullWidth
                required
                displayEmpty
                aria-invalid={userDetails.role ? "false" : "true"}
                value={userDetails.role}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
              >
                <MenuItem value="" disabled>
                  <span>Select</span>
                </MenuItem>
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Professional"}>Professional</MenuItem>
              </Select>

              <Typography
                component="label"
                htmlFor="addressType"
                fontWeight={500}
                variant="body"
              >
                Address Type
              </Typography>

              <Select
                id="addressType"
                fullWidth
                required
                displayEmpty
                aria-invalid={
                  userDetails.address.addressType ? "false" : "true"
                }
                value={userDetails.address.addressType}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    address: { ...prev.address, addressType: e.target.value },
                  }))
                }
              >
                <MenuItem value="" disabled>
                  <span>Select</span>
                </MenuItem>
                <MenuItem value={"Home"}>Home</MenuItem>
                <MenuItem value={"Office"}>Office</MenuItem>
              </Select>

              <Typography
                component="label"
                htmlFor="country"
                fontWeight={500}
                variant="body"
              >
                Country
              </Typography>
              <TextField
                id="country"
                placeholder="Enter your country"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    address: { ...prev.address, country: e.target.value },
                  }))
                }
                value={userDetails.address.country}
                aria-invalid={userDetails.address.country ? "false" : "true"}
                InputProps={{
                  endAdornment: userDetails.address.country ? (
                    <RxCheckCircled
                      style={{ fontSize: "1.5rem", color: "limegreen" }}
                    />
                  ) : (
                    <></>
                  ),
                }}
              />
              <Typography
                component="label"
                htmlFor="state"
                fontWeight={500}
                variant="body"
              >
                State
              </Typography>
              <TextField
                id="state"
                placeholder="Enter your state"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    address: { ...prev.address, state: e.target.value },
                  }))
                }
                value={userDetails.address.state}
                aria-invalid={userDetails.address.state ? "false" : "true"}
                InputProps={{
                  endAdornment: userDetails.address.state ? (
                    <RxCheckCircled
                      style={{ fontSize: "1.5rem", color: "limegreen" }}
                    />
                  ) : (
                    <></>
                  ),
                }}
              />

              <Typography
                component="label"
                htmlFor="postalCode"
                fontWeight={500}
                variant="body"
              >
                Postal Code
              </Typography>
              <TextField
                id="postalCode"
                placeholder="Enter your postal code"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    address: { ...prev.address, postalCode: e.target.value },
                  }))
                }
                value={userDetails.address.postalCode}
                aria-invalid={userDetails.address.postalCode ? "false" : "true"}
                InputProps={{
                  endAdornment: userDetails.address.postalCode ? (
                    <RxCheckCircled
                      style={{ fontSize: "1.5rem", color: "limegreen" }}
                    />
                  ) : (
                    <></>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetailsUpdate;
