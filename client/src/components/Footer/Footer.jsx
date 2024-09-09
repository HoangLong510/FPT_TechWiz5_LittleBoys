import { Box } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        color: "primary.main",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        userSelect: "none",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        fontSize: "15px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "25%" },
            gap: "20px",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "2px solid #000",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            {t("Introduce")}
          </span>
          <span>{t("IntroduceValue")}</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "25%" },
            gap: "20px",
          }}
        >
          <Box
            style={{
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "2px solid #000",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            {t("Contact")}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <PhoneAndroidIcon />
              <span>0911 789 450</span>
              <span>|</span>
              <span>0931 313 329</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <RoundaboutRightIcon />
              <span>
                62 Đường 36, KDC Vạn Phúc, P.Hiệp Bình Phước, Tp.Thủ Đức
              </span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <MailOutlineIcon />
              <Link to="mailto:aptech.fpt@fe.edu.vn" style={{ color: "#000" }}>
                aptech.fpt@fe.edu.vn
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "25%" },
            gap: "20px",
            paddingBottom: "10px",
          }}
        >
          <Box
            style={{
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "2px solid #000",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            {t("Location")}
          </Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800.3229281438996!2d106.71128585234372!3d10.845522484687999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529564f2b4679%3A0x92c1b5bfdc78c98!2zRlBUIEFwdGVjaCBW4bqhbiBQaMO6Yw!5e0!3m2!1svi!2s!4v1724439564098!5m2!1svi!2s"
            width="100%"
            height="200px"
            style={{ border: 0, marginRight: 50 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#000",
          padding: "20px",
          color: "#fff",
        }}
      >
        &copy; All Rights Reserved By {import.meta.env.VITE_PROJECT_NAME}
      </Box>
    </Box>
  );
}
