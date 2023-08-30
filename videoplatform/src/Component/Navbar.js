import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import VideoUploadModal from "./VidoeUploadModal";
import ElevationScroll from "./ElevationScroll";
import { useSelector } from "react-redux";
const pages = ["Upload Video"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const handleVideoOpen = () => setIsVideoOpen(true);
  const handleVideoClose = () => setIsVideoOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const userName = useSelector((state) => state.userName);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const logOut = () => setIsLoggedIn(false);

  return (
    <ElevationScroll>
      <AppBar position="fixed" sx={{ backgroundColor: "#424242" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginRight: "50px",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleVideoOpen}
                  sx={{
                    my: 2,
                    color: "inherit",
                    textTransform: "none", // 대문자 변경을 수정
                    display: "block",
                    fontSize: "18px",
                  }}
                >
                  {page}
                </Button>
              ))}
              {isVideoOpen && (
                <VideoUploadModal
                  isOpen={isVideoOpen}
                  handleClose={handleVideoClose}
                ></VideoUploadModal>
              )}
            </Box>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                  <div>
                    <IconButton sx={{ p: 0, pr: "5px" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                    {userName}
                    <Button
                      sx={{
                        color: "inherit",
                        textTransform: "none", // 대문자 변경을 수정
                        fontSize: "18px",
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      onClick={logOut}
                      sx={{
                        color: "inherit",
                        textTransform: "none", // 대문자 변경을 수정
                        fontSize: "18px",
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <Box>
                <Button
                  onClick={handleLoginOpen}
                  sx={{
                    color: "inherit",
                    textTransform: "none", // 대문자 변경을 수정
                    fontSize: "18px",
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignUpOpen}
                  sx={{
                    color: "inherit",
                    textTransform: "none", // 대문자 변경을 수정
                    fontSize: "18px",
                  }}
                >
                  SignUp
                </Button>
              </Box>
            )}
            {loginOpen && (
              <LoginModal
                isOpen={loginOpen}
                handleClose={handleLoginClose}
                setIsLoggedIn={setIsLoggedIn}
              ></LoginModal>
            )}
            {signUpOpen && (
              <SignUpModal
                isOpen={signUpOpen}
                handleClose={handleSignUpClose}
              ></SignUpModal>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
