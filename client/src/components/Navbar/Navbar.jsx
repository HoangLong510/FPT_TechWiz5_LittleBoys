import { Box, Button, Tooltip, IconButton, Badge  } from '@mui/material'
import { useSelector  } from 'react-redux'
import { Link } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useTranslation } from 'react-i18next'
import {TextField, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Cart from '~/components/Cart/Cart'
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Navbar() {

    const { t } = useTranslation()
    const user = useSelector((state) => state.user.value)

    const activityLogs = [];


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '60px',
            padding: '0px 20px'
        }}>
            {/* Left */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/Images/Logo/logo-navbar-white.png" alt="logo" height={'50px'} />
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px' }}>
                    <Link to="/product" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button>
                            {t("Products")}
                        </Button>
                    </Link>
                    <Link to="/about-us" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button>
                            {t("AboutUs")}
                        </Button>
                    </Link>
                    <Link to="/contact-us" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button>
                            {t("ContactUs")}
                        </Button>
                    </Link>
                    <Link to="/blog" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button>
                            Blog
                        </Button>
                    </Link>
                    
                </Box>
            </Box>

            {/* Right */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                 {/* Search */}
              <Box
                className="search"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width:'100%'
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="What can we help you find?"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    
                    "& .MuiInputBase-root": {
                      height: "35px", 
                      width: "350px",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "2px solid black", 
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "2px solid #fff", 
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid #e64a19", 
                    },
                  }}
                />
                  
                        
              </Box>
                {!user.exist && (
                    <Box sx={{ display: { xs: 'none', md: 'flex', width:'100%'}, alignItems: 'center', gap: '8px' }}>
                        <Link to="/auth/login" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button>
                                {t("Login")}
                            </Button>
                        </Link>
                        <Link to="/auth/register" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained">
                                {t("CreateAccount")}
                            </Button>
                        </Link>
                    </Box>
                )}
                {user.exist && (
                    <>
                        <Cart />
                        <Tooltip title="Upcoming Appointments">
                          <IconButton
                            aria-label="notifications"
                            color="primary"
                            sx = {{
                              marginLeft : "10px"
                            }}
                          >
                            <Badge
                              badgeContent={activityLogs.length}
                              color="error"
                            >
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                  </Tooltip>
                    </>
                )}
                <NavbarMenu />
            </Box>
        </Box>
    )
}
