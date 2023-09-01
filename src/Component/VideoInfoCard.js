import {
  Box,
  Fade,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar
} from '@mui/material';

const VideoInfoCard = ({handleOpen, videoData}) => {

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
            image={videoData.thumbnailUrl}
            alt="green iguana"
            sx={{ backgroundSize: "cover", aspectRatio: "16 / 9" }}
          />

          {/* Video Info */}
          <CardContent sx={{boxSizing: "border-box", padding: "5px !important", color: "#FFFFFF", backgroundColor: "#585858"}}>
            <Box sx={{display: "flex", alignItems: "center"}}>

              {/* Profile Img */}
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: "45px", height: "45px", margin: "5px" }} />


              <Box sx={{flexGrow: 1, display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>

                {/* Title & Uploader */}
                <Box sx={{margin: "5px", color: "white"}}>
                  <Typography  variant="subtitle1" component="div">
                    {videoData.title}
                  </Typography>
                  <Typography  variant="caption" component="div">
                    {videoData.uploader}
                  </Typography>
                </Box>

                {/* Watch & Like */}
                <Box sx={{ margin: "5px", bottom: "0px", opacity: 0.5}}>
                  <Typography variant="caption" component="div" align='right'>
                    Watch : {videoData.watch}
                  </Typography>
                  <Typography variant="caption" component="div" align='right'>
                    Like : {videoData.like}
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