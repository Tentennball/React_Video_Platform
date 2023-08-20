import {
  Container,
  Box,
  Modal,
  Avatar,
  Typography,
} from '@mui/material';

import ReactPlayer from 'react-player'
const VideoModal = ({handleClose}) => {
  return (
    <Modal
        open={true}
        onClose={handleClose}
      >
        <Container maxWidth="md" 
          disableGutters={true} 
          sx={{   
            width: "70vw",
            height: "100vh", 
            outline: "none", 
            display: "flex", 
            alignItems: "center"
          }}>
          <Box sx={{
            width: "100%", 
            flexDirection: "column", 
            overflow: "hidden", 
            borderRadius: "10px"
          }}>

            {/* Player Area */}
            <Box sx={{ 
              width: "100%", 
              height: "65vh", 
              backgroundColor: "#000000", 
            }}>
              <ReactPlayer
                    //url={'https://firebasestorage.googleapis.com/v0/b/todoapp-3a3c7.appspot.com/o/Video%2FIVE.mp4?alt=media&token=89ee5627-9381-41ed-95e9-d15164ca3cfe'}    // 플레이어 url
                    url={`/img/IVE.mp4`}
                    volume = {0.5}
                    width='100%'         
                    height='100%'        
                    //playing={true}        
                    controls={true}       
                />
            </Box>

            {/* Video Info */}
            <Box sx={{ 
              width: "100%", 
              height: "100px", 
              backgroundColor: "#585858", 
              padding: "20px",
              boxSizing: "border-box",
              display: "flex"
            }}>
              {/* Profile Img */}
              <Avatar alt="Cindy Baker" src="/img/An.jpg" variant="rounded" sx={{width: "60px", height: "60px"}} />
              {/* Title & Uploader Name */}
              <Box sx={{marginLeft: "20px", width:"100%",  overflow:"hidden", backgroundColor: "black"}}>
              <Typography variant="h6" sx={{color: "#FFFFFF", whiteSpace: "nowrap"}}>
                This is Test Title
              </Typography>
              <Typography variant="subtitle1" sx={{color: "#FFFFFF", whiteSpace: "nowrap"}}>
                Uploader Name
              </Typography>

              </Box>
              <Box sx={{marginLeft: "20px", width:"25vw",  overflow:"hidden", backgroundColor: "black"}}></Box>


            </Box>
          </Box>
        </Container>  
      </Modal>
  );
}

export default VideoModal;