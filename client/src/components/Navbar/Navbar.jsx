import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useTranslation } from 'react-i18next'

export default function Navbar() {

    const { t } = useTranslation()
    const user = useSelector((state) => state.user.value)

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
                    <img src="/Images/Logo/logo-navbar-white.png" alt="logo"  height={'55px'} />
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px' }}>
                    <Link to="/product" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button sx={{fontSize: '16px'}}>
                            {t("Products")}
                        </Button>
                    </Link>
                    <Link to="/about-us" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button sx={{fontSize: '16px'}}>
                            {t("AboutUs")}
                        </Button>
                    </Link>
                    <Link to="/contact-us" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button sx={{fontSize: '16px'}}>
                            {t("ContactUs")}
                        </Button>
                    </Link>
                    <Link to="https://www.facebook.com/aptech.fpt" style={{ display: 'flex', alignItems: 'center' }} target='_blank'>
                        <Button sx={{fontSize: '16px'}}>
                            Fanpage
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
                {!user.exist && (
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px' }}>
                        <Link to="/auth/login" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button sx={{fontSize: '16px'}}>
                                {t("Login")}
                            </Button>
                        </Link>
                        <Link to="/auth/register" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" sx={{fontSize: '16px'}}>
                                {t("CreateAccount")}
                            </Button>
                        </Link>
                    </Box>
                )}
                <NavbarMenu />
            </Box>
        </Box>
    )
}
