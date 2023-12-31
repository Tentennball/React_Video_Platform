import {
  Box,
  Typography,
  Container,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { store } from "../firebase";


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
const LoginModal = ({ handleClose, setIsLoggedIn }) => {
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if(email.length===0||password.length===0){
      alert("이메일, 비밀번호 공백x");
      return;
    }
    const loginData = await getDoc(doc(store, "Users", email));
    if (loginData.data()!==undefined) {
        if (password === loginData.data().password) {
          await setDoc(doc(store, "session", loginData.data().email), {});
          // SessionStorage(Local)에 사용자 이름 저장
          sessionStorage.setItem("userName", loginData.data().email);
          setIsLoggedIn(true);
          handleClose();
          return;
        } else {
          alert("일치하는 로그인 정보가 없습니다.");
          return;
        }
    } else {
      alert("일치하는 로그인 정보가 없습니다.");
    }
  };
  return (
    <div>
      <Modal open={true} onClose={handleClose}>
        <Container component="main" maxWidth="xs" sx={modalStyle}>
          <Typography
            gutterBottom
            component="h1"
            variant="h5"
            sx={{ color: "#FFFFFF", marginBottom: "20px" }}
          >
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
              color="white"
              sx={{
                "& label": {
                  color: "white !important",
                },
                "& input" : {
                  backgroundColor: "#585858 !important",
                  color: "white !important", 
                  borderBottom: "3px solid white",  
                  "&:focus" : {
                    border: "none",
                    borderBottom: "3px solid white"
                  },
                  "&:-webkit-autofill": {
                    WebkitTextFillColor: '#fff',
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="white"
              sx={{
                "& label": {
                  color: "white !important",
                },
                "& input" : {
                  backgroundColor: "#585858 !important",
                  color: "white !important", 
                  borderBottom: "3px solid white",  
                  "&:focus" : {
                    border: "none",
                    borderBottom: "3px solid white"
                  },
                  "&:-webkit-autofill": {
                    WebkitTextFillColor : '#fff',
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="darkGray"
              sx={{ mt: 3, mb: 2, color: "#FFFFFF" }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default LoginModal;
