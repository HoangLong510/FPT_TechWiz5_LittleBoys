import { Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

export default function ManagementLayout({ children }) {
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
                <Link to='/management'>
                    <Button
                        sx={{ width: '100%' }}
                        variant={pathname === '/management' ? "contained" : "text"}
                    >
                        General
                    </Button>
                </Link>
                <Link to='/management/account'>
                    <Button
                        sx={{ width: '100%' }}
                        variant={pathname.startsWith('/management/account') ? "contained" : "text"}
                    >
                        Account
                    </Button>
                </Link>
                <Link to='/management/brands'>
                    <Button
                        sx={{ width: '100%' }}
                        variant={pathname.startsWith('/management/brands') ? "contained" : "text"}
                    >
                        Brands
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
