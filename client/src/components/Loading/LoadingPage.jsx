import { Box, CircularProgress } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function LoadingPage() {

    const { t } = useTranslation()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'primary.main',
            width: '100%',
            color: '#fff',
            gap: '20px'
        }}>
            <CircularProgress sx={{ color: '#fff' }} />
            <Box>
                {t("PleaseWaitAMoment")}
            </Box>
        </Box>
    )
}
