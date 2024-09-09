import React from "react";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";

export default function DefaultLayout({ children }) {
  const loading = useSelector((state) => state.loading.value);

  return (
    <div
      className="default-layout"
      data-theme={
        document.documentElement.getAttribute("data-theme") || "light"
      }
    >
      <div className="header">
        <div className="header-loading">{loading && <LinearProgress />}</div>
        <Navbar />
      </div>
      <div className="content">{children}</div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      ></div>
      <Footer />
    </div>
  );
}
