import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { useDispatch } from "react-redux";
import { setIsProfile } from "../../redux/reducers/misc";
import checkpic from "/check.png";
import "./Profile.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [openBenefits, setOpenBenefits] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const benefits = {
    google: "https://google.com",
    youtube: "https://youtube.com",
    flipkart: "https://flipkart.com",
  };

  const userBenefits = {
    Manish: "Exclusive Benefits for Manish",
    Shiva: "Special Benefits for Shiva",
    Alice: "Premium Benefits for Alice",
  };

  const verificationLink = "https://forms.gle/SyDXGTycAN3P1hui6"; // Real verification link

  const isVerified = ["Manish"].includes(user?.username);

  const handleCloseProfile = () => {
    dispatch(setIsProfile(false));
  };

  const handleBenefitOpen = () => {
    setSelectedBenefit("menu");
    setOpenBenefits(true);
  };

  const handleCloseBenefits = () => {
    setOpenBenefits(false);
    setSelectedBenefit(null);
  };

  const Profilecard = ({ text, Icon, heading }) => (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      {/* Mobile Close Button */}
      <IconButton
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'absolute',
          right: '1rem',
          top: '1rem',
          color: 'white'
        }}
        onClick={handleCloseProfile}
      >
        {/* <CloseIcon /> */}
      </IconButton>

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar
          src={transformImage(user?.avatar?.url)}
          sx={{
            width: 170,
            height: 170,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white",
            position: "relative",
            zIndex: 1,
          }}
        />
        {isVerified && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
              animation: "glow 2s infinite",
              zIndex: 0,
            }}
          />
        )}
      </Box>

      <Profilecard
        heading="Username"
        text={
          <>
            {user?.username}
            {isVerified && (
              <img
                style={{ height: "14px", marginLeft: "3px" }}
                src={checkpic}
                alt="verified"
              />
            )}
          </>
        }
        Icon={<UserNameIcon />}
      />

      <Profilecard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />

      <Profilecard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />

{/*       {isVerified ? (
        <Profilecard
          heading="Verified Benefits"
          text={
            <Button
              variant="contained"
              color="success"
              onClick={handleBenefitOpen}
              sx={{ textTransform: "none" }}
            >
              {userBenefits[user?.username]}
            </Button>
          }
        />
      ) : (
        <Profilecard
          heading="Get Verified"
          text={
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(verificationLink, "_blank")}
              sx={{ textTransform: "none" }}
            >
              Verify Now
            </Button>
          }
        />
      )} */}

      <Modal
        open={openBenefits}
        onClose={handleCloseBenefits}
        aria-labelledby="benefits-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: selectedBenefit === "menu" ? "360px" : "95vw",
            height: selectedBenefit === "menu" ? "auto" : "95vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {selectedBenefit === "menu" ? (
            <>
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Select Benefit
                </Typography>
                <IconButton onClick={handleCloseBenefits}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setSelectedBenefit("google")}
                  sx={{ py: 1.5 }}
                >
                  Google Access
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => setSelectedBenefit("youtube")}
                  sx={{ py: 1.5 }}
                >
                  YouTube Access
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => setSelectedBenefit("flipkart")}
                  sx={{ py: 1.5 }}
                >
                  Flipkart Access
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography variant="h6">
                  {selectedBenefit?.charAt(0).toUpperCase() +
                    selectedBenefit?.slice(1)}
                </Typography>
                <IconButton onClick={() => setSelectedBenefit("menu")}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  height: "calc(100% - 64px)",
                  width: "100%",
                  position: "relative",
                }}
              >
                <iframe
                  src={benefits[selectedBenefit]}
                  title="benefit-frame"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Stack>
  );
};

export default Profile;
