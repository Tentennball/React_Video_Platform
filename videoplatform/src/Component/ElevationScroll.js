import { useScrollTrigger } from "@mui/material";
import React from "react";

function ElevationScroll(props) {
    const { children } = props;
  
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      sx: {
        backgroundColor: trigger ? '#424242' : 'transparent',
        transition: '0.3s'
      }
    });
  }

export default ElevationScroll;