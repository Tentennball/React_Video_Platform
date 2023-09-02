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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SignUpModal = ({ handleClose }) => {
  const [emailMsg, setEmailMsg] = useState("Email Address");
  const [pwdMsg, setPwdMsg] = useState("Password");
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const changeEmail = (e) => {
    if (e.target.value.length > 0 && !emailRegex.test(e.target.value)) {
      setEmailMsg("올바른 이메일 형식이 아닙니다");
      return;
    } else {
      setEmailMsg("Email Address");
    }
  };
  const changePwd = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length > 0 && !passwordRegex.test(e.target.value)) {
      setPwdMsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.");
      return;
    } else {
      setPwdMsg("Password");
    }
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
                  label={emailMsg}
                  onChange={changeEmail}
                  name="email"
                  autoComplete="email"
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
  );
};

export default SignUpModal;