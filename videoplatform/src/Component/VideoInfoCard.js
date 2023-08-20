import {
  Box,
  Fade,
  Typography,
  Card,
  CardMedia,
  CardContent
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
            height="216"
            /* Img Path */
            image="/img/An.jpg"
            alt="green iguana"
            sx={{ backgroundSize: "cover" }}
          />

          {/* Video Info */}
          <CardContent>

            {/* Title */}
            <Typography gutterBottom variant="h5" component="div">
              Title
            </Typography>


          </CardContent>
        </Card>
      </Fade>

    </Box>

  );
}

export default VideoInfoCard;