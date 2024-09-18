import { Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

export default function UserLayout({ children }) {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: 'row' },
            justifyContent: "center",
            padding: '20px',
            gap: '20px'
        }}>
            <Box sx={{
                width: { xs: "100%", md: "400px" },
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "20px",
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <Link to='/user'>
                    <Button
                        sx={{ width: '100%' }}
                        variant={pathname === '/user' ? "contained" : "text"}
                    >
                        Profile
                    </Button>
                </Link>
                <Link to='/user/security'>
                    <Button
                        sx={{ width: '100%' }}
                        variant={pathname.startsWith('/user/security') ? "contained" : "text"}
                    >
                        Security
                    </Button>
                </Link>
                
            </Box>

            <Box sx={{
                width: '100%',
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}>
                {children}
            </Box>
        </Box>
    )
}
