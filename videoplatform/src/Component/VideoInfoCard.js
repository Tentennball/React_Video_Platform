import {
  Box,
  Fade,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar
} from '@mui/material';
import { useEffect } from 'react';

const VideoInfoCard = ({handleOpen}) => {

  useEffect(() => {
    console.log("Info Card")
  }, [])

  return (
    <Box style={{position: "absolute", zIndex: 1,}}>

      <Fade in={true}>
        <Card
          onClick={handleOpen}
          sx={{
            width: "350px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          {/* Video Thumbnail */}
          <CardMedia
            component="img"
            /* Img Path */
            image="/img/An.jpg"
            alt="green iguana"
            sx={{ backgroundSize: "cover", aspectRatio: "16 / 9" }}
          />

          {/* Video Info */}
          <CardContent sx={{boxSizing: "border-box", padding: "5px !important", color: "#FFFFFF", backgroundColor: "#585858"}}>
            <Box sx={{display: "flex", alignItems: "center"}}>

              {/* Profile Img */}
              <Avatar alt="Cindy Baker" src="/img/An.jpg" variant="rounded" sx={{ width: "45px", height: "45px", margin: "5px" }} />


              <Box sx={{flexGrow: 1, display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>

                {/* Title & Uploader */}
                <Box sx={{margin: "5px", color: "white"}}>
                  <Typography  variant="subtitle1" component="div">
                    This is Test Title
                  </Typography>
                  <Typography  variant="caption" component="div">
                    Uploader Name
                  </Typography>
                </Box>

                {/* Watch & Like */}
                <Box sx={{ margin: "5px", bottom: "0px", opacity: 0.5}}>
                  <Typography variant="caption" component="div" align='right'>
                    Like : {1234}
                  </Typography>
                  <Typography variant="caption" component="div" align='right'>
                    Watch : {1234}
                  </Typography>
                </Box>

              </Box>

            </Box>



          </CardContent>
        </Card>
      </Fade>

    </Box>

  );
}

export default VideoInfoCard;