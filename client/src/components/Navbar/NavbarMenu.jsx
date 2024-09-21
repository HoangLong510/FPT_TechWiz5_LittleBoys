import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Drawer, List } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '~/libs/features/logout/logoutSlice'
import SelectLocale from './SelectLocale'
import { useTranslation } from 'react-i18next'

export default function NavbarMenu() {

    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}
                className='button'
                onClick={toggleDrawer(true)}
            >
                <MoreVertIcon />
            </Box>
            <Box className='button' onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' } }}>
                <MenuIcon />
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"} PaperProps={{ sx: { width: { xs: "100%", md: "auto" } } }}>
                <Box sx={{ width: { xs: '100%', md: 350 } }} role="presentation">
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'end',
                        alignItems: 'center',
                        height: '61px',
                        padding: '0px 20px',
                    }}>
                        <Box className='button' onClick={toggleDrawer(false)} sx={{ display: 'flex', alignItems: 'center' }}>
                            <CloseIcon sx={{ fontSize: '30px' }} />
                        </Box>
                    </Box>

                    <List sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexDirection: 'column',
                        padding: '20px',
                        gap: '20px'
                    }}>
                        <Link onClick={toggleDrawer(false)} to="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                {t("Homepage")}
                            </Button>
                        </Link>
                        <Link onClick={toggleDrawer(false)} to="/product" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                {t("Products")}
                            </Button>
                        </Link>
                        <Link onClick={toggleDrawer(false)} to="/gallery" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                {t("Gallery")}
                            </Button>
                        </Link>
                        <Link onClick={toggleDrawer(false)} to="/about-us" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                {t("About Us")}
                            </Button>
                        </Link>
                        <Link onClick={toggleDrawer(false)} to="/contact-us" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                {t("Contact Us")}
                            </Button>
                        </Link>

                        <Link onClick={toggleDrawer(false)} to="/blog" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                Blog
                            </Button>
                        </Link>
                        <Link onClick={toggleDrawer(false)} to="/faq" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{ width: '100%' }}>
                                FAQ
                            </Button>
                        </Link>
                    </List>

                    <Box sx={{ padding: { xs: '0px 20px', md: '20px 20px 0px 20px' } }}>
                        <SelectLocale />
                    </Box>

                    {!user.exist && (
                        <List sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexDirection: 'column',
                            padding: '20px',
                            gap: '20px'
                        }}>
                            <Link onClick={toggleDrawer(false)} to="/auth/login" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Button sx={{ width: '100%' }}>
                                    {t("Login")}
                                </Button>
                            </Link>
                            <Link onClick={toggleDrawer(false)} to="/auth/register" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Button sx={{ width: '100%' }}>
                                    {t("CreateAccount")}
                                </Button>
                            </Link>
                        </List>
                    )}

                    {user.exist && (
                        <List sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            gap: { xs: '20px', md: '10px' }
                        }}>
                            <Link onClick={toggleDrawer(false)} to="/user" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Button sx={{ width: '100%' }} variant='contained'>
                                    {t("Hi")},
                                    <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
                                        {user.data.fullname}
                                    </span>
                                </Button>
                            </Link>
                            {user.data.role === 'user' && (
                                <Link onClick={toggleDrawer(false)} to="/auth/register-supplier" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button sx={{ width: '100%' }}>
                                        {t("RegisterSupplier")}
                                    </Button>
                                </Link>
                            )}
                            {user.data.role === 'admin' && (
                                <Link onClick={toggleDrawer(false)} to="/management" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button sx={{ width: '100%' }}>
                                        {t("Management")}
                                    </Button>
                                </Link>
                            )}
                             {user.data.role === 'supplier' && (
                                <Link onClick={toggleDrawer(false)} to="/supplier" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button sx={{ width: '100%' }}>
                                        {t("Supplier")}
                                    </Button>
                                </Link>
                            )}
                            
                            <Button sx={{ width: '100%' }} onClick={() => {
                                setOpen(false)
                                dispatch(setLogout())
                            }}>
                                {t("Logout")}
                            </Button>
                            
                        </List>
                    )}
                </Box>
            </Drawer>
        </>
    )
}
