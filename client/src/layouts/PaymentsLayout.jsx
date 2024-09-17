import { LinearProgress } from "@mui/material";
import Footer from "~/components/Footer/Footer";
import Backtotop from "~/components/Backtotop/Backtotop";
import { Box,Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"

export default function DefaultLayout({ children }) {
  const { t } = useTranslation();
  
  const loading = useSelector(state => state.loading.value)
  return (
    <div className="default-layout">
      <div className="header">
        <div className="header-loading">{loading && <LinearProgress />}</div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            padding: "0px 20px",
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src="/logo.png" alt="logo" width={"147px"} height={"40px"} />
            </Link>
            <Typography variant="h6">Payments</Typography>
          </Box>
        </Box>
      </div>
      <div className="content">{children}</div>
      <Footer />
      <Backtotop />
    </div>
  );
}
