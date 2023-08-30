import React, { useState, useEffect, useCallback } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { store } from "../firebase";
import { doc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
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
  const dispatch = useDispatch();

  const logOut = useCallback(async () => {
    await deleteDoc(doc(store, "session", userName));
    dispatch({
      type: 'LOGOUT', 
      userName: "Guest",
      likedVideoList: [],
    });
    // 로그아웃 시 session데이터 삭제
    sessionStorage.removeItem("userName")
    setIsLoggedIn(false);
  }, [dispatch, userName]);
  useEffect(() => {
    const checkSession = async () => {
      const sessionData = sessionStorage.getItem("userName")
      if(sessionData){
        await getDocs(query(collection(store, "session")))  // DB에서 "session"에서 Docs를 받아옴 
          .then((snapShot) => {                             // Docs받아오기 성공 시 각 Doc의 id에 대해 sessionData와 일치여부 검사
            snapShot.forEach(async(sessionDoc) => {
              // Doc의 id와 sessionData일치 시 -> 로그인 처리
              if(sessionDoc.id === sessionData){
                // 로그인 처리 -> DB에서 데이터를 받아와 redux의 state에 저장

                // DB에서 UserData 받아오기
                const userData = await getDoc(doc(store, "Users", sessionData))
                  .then((snapShot) => {
                    return {
                      userName: snapShot.get("name"),
                      likedVideoList: snapShot.get("likedVideoList")
                    }
                  })
                  .catch((e) => {
                    console.log(e)
                    alert("Login Data Get Error")
                    logOut()
                  })
                
                // UserData를 redux state에 저장
                dispatch({
                  type: 'LOGIN', 
                  ...userData
                });
                setIsLoggedIn(true)
              }
            })
          })
          .catch((e) => {
            // DB에서 "session"에서 Docs를 받아오기 실패 시 -> LogOut처리
            console.log(e)
            alert("Session Error")
            logOut()
          })
      } else {
        // sessionData가 없는 경우 -> 로그인 X
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, [dispatch, logOut, isLoggedIn]);


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
              {isLoggedIn ? (
                <Button
                  onClick={handleVideoOpen}
                  sx={{
                    my: 2,
                    color: "inherit",
                    textTransform: "none", // 대문자 변경을 수정
                    display: "block",
                    fontSize: "18px",
                  }}
                >
                  Upload Video
                </Button>
              ) : null}

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
