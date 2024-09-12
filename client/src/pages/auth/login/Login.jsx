import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { loginApi } from './service'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { setUser } from '~/libs/features/user/userSlice'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading.value)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleUserLogin = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        const data = {
            email,
            password
        }

        const res = await loginApi(data)

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))

            dispatch(clearLoading())

            dispatch(setUser(res.user))
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            dispatch(clearLoading())
        }
    }

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("Login")}</title>
            </Helmet>

            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '600px' },
                    maxWidth: '600px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        userSelect: 'none'
                    }}>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            paddingBottom: '5px'
                        }}>
                            {t("Login")}
                        </span>
                        <span style={{
                            fontSize: '15px',
                            paddingBottom: '20px'
                        }}>
                            {t("LoginToShopAndTrackOrdersSaveFavoriteProductListsAndReceiveManyOffers")}
                        </span>
                    </Box>

                    <form onSubmit={handleUserLogin} style={{
                        padding: '10px 0px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px'
                    }}>
                        <FormControl fullWidth>
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                                label="Email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>{t("Password")}</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setShowPassword(!showPassword)

                                        }}>
                                        {!showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                                    </InputAdornment>
                                }
                                type={!showPassword ? 'password' : 'text'}
                                label={t("Password")}
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            <Link to='/auth/forgot-password' style={{ fontSize: '15px', color: '#000' }}>
                                {t("ForgotPassword")}?
                            </Link>
                        </Box>
                        <Button type='submit' variant='contained' disabled={loading}>
                            {t("Login")}
                        </Button>
                    </form>

                    <Box sx={{ paddingBottom: '10px' }}>
                        <Link to='/auth/register' style={{ width: '100%' }}>
                            <Button variant='outlined' style={{ width: '100%' }}>
                                {t("DontHaveAnAccount")}
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
