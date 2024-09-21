import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Backtotop() {
  const [backtotopbtn, setBacktotopbtn] = useState(false);

  useEffect(() => {
    const hidebacktotopbtn = () => {
      if (window.scrollY >= 200) {
        setBacktotopbtn(true);
      } else {
        setBacktotopbtn(false);
      }
    };
    window.addEventListener("scroll", hidebacktotopbtn);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", hidebacktotopbtn);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        right: 15,
        bottom: 15,
        zIndex: 996,
        visibility: backtotopbtn ? "visible" : "hidden",
        opacity: backtotopbtn ? 1 : 0,
        transition: "all 0.4s",
      }}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <IconButton
        sx={{
          backgroundColor: "#ffc451",
          width: 40,
          height: 40,
          borderRadius: 1, // 4px
          "&:hover": {
<<<<<<< Updated upstream
            backgroundColor: "#bf995c",
            svg: {
              color: "#fff",
              },
=======
            backgroundColor: "#b5884e",
            svg: {
              color: "#fff",
            },
>>>>>>> Stashed changes
          },
        }}
      >
        <ArrowUpwardIcon sx={{ fontSize: 28, color: "#151515" }} />
      </IconButton>
    </Box>
  );
}
