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
  MenuItem,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import ElevationScroll from "./ElevationScroll";
import { doc, setDoc, collection, query, getDocs } from "firebase/firestore";
import { store } from "../firebase";

const pages = ["Upload Video"];
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "500px",
  height: "600px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("tlqkf");
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const q = query(collection(store, "Users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(email!==doc.data().email){
        return;
      }
      else{
        if(password===doc.data().password){
          setIsLoggedIn(true);
          handleLoginClose();
          setUserName(doc.data().name);
          return;
        }
        else{
          alert('일치하는 로그인 정보가 없습니다.');
          return;
        }
      }
    });
    // } else {
      
    // }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    await setDoc(doc(store, "Users", name), {
      name: name,
      email: email,
      password: password,
    });
    alert("SignUp Completed");
    handleSignUpClose();
  };

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
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
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
            </Box>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                  <div>
                  <IconButton sx={{ p: 0, pr: "5px"}}>
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
            <Modal
              open={loginOpen}
              onClose={handleLoginClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Container component="main" maxWidth="xs" sx={modalStyle}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleLoginSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Container>
            </Modal>
            <Modal
              open={signUpOpen}
              onClose={handleSignUpClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Container component="main" maxWidth="xs" sx={modalStyle}>
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSignUpSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Your Nickname"
                          name="name"
                          autoComplete="name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Modal>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
