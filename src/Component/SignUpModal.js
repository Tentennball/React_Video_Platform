import {
  Box,
  Typography,
  Container,
  Button,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
import { store } from "../firebase";
import { useState } from "react";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "500px",
  height: "600px",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#585858",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const SignUpModal = ({ handleClose }) => {
  const [emailMsg, setEmailMsg] = useState("Email Address");
  const [pwdMsg, setPwdMsg] = useState("Password");
  const [nameMsg, setNameMsg] = useState("Your Nickname");
  const [isEmail, setIsEmail] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isName, setIsName] = useState(false);
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const nameRegex = /^[\s!@#$%^&*(),.?":;`/'+=-_{}|<>]+$/;

  const changeName = (e) => {
    console.log(isName);
    if (e.target.value.length > 0 && nameRegex.test(e.target.value)) {
      setNameMsg("올바른 닉네임을 작성하세요");
      setIsName(false);
      return;
    } else {
      setNameMsg("Your Nickname");
      if (e.target.value.length > 0)setIsName(true);
    }
  };
  const changeEmail = (e) => {
    if (e.target.value.length > 0 && !emailRegex.test(e.target.value)) {
      setEmailMsg("올바른 이메일 형식이 아닙니다");
      setIsEmail(false);
      return;
    } else {
      setEmailMsg("Email Address");
      if (e.target.value.length > 0) setIsEmail(true);
    }
  };
  const changePwd = (e) => {
    if (e.target.value.length > 0 && !passwordRegex.test(e.target.value)) {
      setPwdMsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.");
      setIsPwd(false);
      return;
    } else {
      setPwdMsg("Password");
      if (e.target.value.length > 0) setIsPwd(true);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    console.log(name);
    await setDoc(doc(store, "Users", email), {
      name: name,
      email: email,
      password: password,
      likedVideoList: [],
    });
    alert("SignUp Completed");
    handleClose();
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
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
          <Typography
            gutterBottom
            component="h1"
            variant="h5"
            sx={{ color: "#FFFFFF", marginBottom: "20px" }}
          >
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
                  onChange={changeName}
                  required
                  fullWidth
                  id="name"
                  label={nameMsg}
                  name="name"
                  autoComplete="name"
                  color="white"
                  sx={{
                    "& label": {
                      color: "white !important",
                    },
                    "& input": {
                      backgroundColor: "#585858 !important",
                      color: "white !important",
                      borderBottom: "3px solid white",
                      "&:focus": {
                        border: "none",
                        borderBottom: "3px solid white",
                      },
                      "&:-webkit-autofill": {
                        WebkitTextFillColor: "#fff",
                        backgroundClip: "text",
                      },
                    },
                    "& fieldset": {
                      border: "none",
                    },
                    borderColor: "white !important",
                    color: "white !important",
                    display: "block",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={emailMsg}
                  onChange={changeEmail}
                  name="email"
                  autoComplete="email"
                  color="white"
                  sx={{
                    "& label": {
                      color: "white !important",
                    },
                    "& input": {
                      backgroundColor: "#585858 !important",
                      color: "white !important",
                      borderBottom: "3px solid white",
                      "&:focus": {
                        border: "none",
                        borderBottom: "3px solid white",
                      },
                      "&:-webkit-autofill": {
                        WebkitTextFillColor: "#fff",
                        backgroundClip: "text",
                      },
                    },
                    "& fieldset": {
                      border: "none",
                    },
                    borderColor: "white !important",
                    color: "white !important",
                    display: "block",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={pwdMsg}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changePwd}
                  color="white"
                  sx={{
                    "& label": {
                      color: "white !important",
                    },
                    "& input": {
                      backgroundColor: "#585858 !important",
                      color: "white !important",
                      borderBottom: "3px solid white",
                      "&:focus": {
                        border: "none",
                        borderBottom: "3px solid white",
                      },
                      "&:-webkit-autofill": {
                        WebkitTextFillColor: "#fff",
                        backgroundClip: "text",
                      },
                    },
                    "& fieldset": {
                      border: "none",
                    },
                    borderColor: "white !important",
                    color: "white !important",
                    display: "block",
                    marginBottom: "20px",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="darkGray"
              sx={{ mt: 3, mb: 2, color: "#FFFFFF" }}
              disabled={!(isEmail&&isPwd&&isName)}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default SignUpModal;
