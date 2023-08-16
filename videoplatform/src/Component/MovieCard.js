import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const MovieCard = () => {

  const [isMouseOn, setIsMouseOn] = useState(false)



  return (
    <Grid xs sx={{ 
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "250px",
      maxWidth: "292px",
      height: "180px", 
      backgroundImage: "url(/img/An.jpg)", 
      backgroundSize: "cover", 
      margin: "5px",
      padding: "0px",
      borderRadius: "10px"
    }}
      onMouseEnter={() => {console.log("Enter");setIsMouseOn(true)}}
      onMouseLeave={() => {console.log("leave"); setIsMouseOn(false)}}
    >
      {isMouseOn && 
        <Card sx={{
          position:"absolute",  
          width: "350px", 
          zIndex: 1,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}>
          <CardMedia
            component="img"
            height="216"
            image="/img/An.jpg"
            alt="green iguana"
            sx={{backgroundSize: "cover"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Title
            </Typography>
          </CardContent>
        </Card>
    }</Grid>
  );
}

export default MovieCard;