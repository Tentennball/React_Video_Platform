import {
  Container,
  Box,
  Modal,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import ReactPlayer from 'react-player'

const VideoModal = ({ handleClose, videoData }) => {
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
              url={videoData.videoUrl}
              volume={0.5}
              width='100%'
              height='100%'
              //playing={true}        
              controls={true}
            />
          </Box>

          {/* Video Info */}
          <Box sx={{
            width: "100%",
            backgroundColor: "#585858",
            boxSizing: "border-box",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}>

            {/* Profile Img */}
            <Avatar alt="Cindy Baker" src="/img/An.jpg" variant="rounded" sx={{ width: "60px", height: "60px", margin: "10px" }} />


            {/* Video Info */}
            <Box sx={{  
              flexGrow: 10,
              minWidth: "300px",
              overflow: "hidden", 
              color: "#FFFFFF", 
              whiteSpace: "nowrap",
              margin: "10px", 
            }}>

              {/* Title */}
              <Typography variant="h6">
                {videoData.title}
              </Typography>

              <Box sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap",}}>

                {/* Uploader Name */}
                <Typography variant="subtitle1">
                  {videoData.uploader}
                </Typography>

                {/* Watch & Like */}
                <Box sx={{display: "flex", opacity: 0.75}}>
                  <Typography variant="subtitle1" sx={{ marginRight: "20px" }}>
                    Watch : {videoData.watch}
                  </Typography>
                  <Typography variant="subtitle1">
                    Like : {videoData.like}
                  </Typography>
                </Box>
              </Box>

            </Box>


            {/* Like & Bookmark Btn */}
            <Box sx={{ 
              flexGrow: 1,
              width: "220px",
              overflow: "hidden", 
              display: "flex",
              margin: "10px",
            }}>
              <Button variant="outlined" startIcon={<FavoriteIcon />} color='white' sx={{overflow: 'hidden', marginRight: "10px", flexGrow: 1}}>
                Like
              </Button>
              <Button variant="outlined" startIcon={<BookmarkAddIcon />} color='white' sx={{flexGrow: 1}}>
                BookMark
              </Button>
            </Box>


          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default VideoModal;