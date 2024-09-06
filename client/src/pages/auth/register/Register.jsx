import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { registerApi } from './service'
import { Link, useNavigate } from 'react-router-dom'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { useTranslation } from 'react-i18next'

export default function Register() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.loading.value)

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const handleUserRegister = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        const data = {
            fullname,
            email,
            password,
            confirmPassword,
            phone,
            address
        }

        const res = await registerApi(data)
        dispatch(clearLoading())

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            navigate("/auth/login")
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', md: '700px' },
                maxWidth: '700px',
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
                        {t("Register")}
                    </span>
                    <span style={{
                        fontSize: '15px',
                        paddingBottom: '10px'
                    }}>
                        {t("RegisterToShopAndTrackOrdersSaveFavoriteProductListsAndReceiveManyOffers")}
                    </span>
                </Box>

                <form onSubmit={handleUserRegister} style={{
                    padding: '10px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <TextField sx={{ width: '100%' }}
                        id="fullname"
                        autoComplete="off"
                        label={t("Fullname")}
                        variant="outlined"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <TextField sx={{ width: '100%' }}
                        id="email"
                        autoComplete="off"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField sx={{ width: '100%' }}
                        type='password'
                        id="password"
                        label={t("Password")}
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField sx={{ width: '100%' }}
                        type='password'
                        id="confirmPassword"
                        label={t("ConfirmPassword")}
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <TextField sx={{ width: '100%' }}
                        id="phone"
                        autoComplete="off"
                        label={t("PhoneNumber")}
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <TextField sx={{ width: '100%' }}
                        id="address"
                        autoComplete="off"
                        label={t("Address")}
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <Button type='submit' variant='contained' disabled={loading}>
                        {t("CreateAccount")}
                    </Button>
                </form>

                <Link to='/auth/login' style={{ width: '100%' }}>
                    <Button variant='outlined' style={{ width: '100%' }}>
                        {t("YouAlreadyHaveAnAccount")}
                    </Button>
                </Link>

                <Box sx={{
                    fontSize: '15px',
                    paddingBottom: '10px',
                    userSelect: 'none',
                    paddingTop: '15px'
                }}>
                    {t("ByClicking")} <span style={{ fontWeight: 'bold' }}>{t("CreateAccount")}</span>, {t("YouAgreeToOurTermsOfServiceAndPrivacyPolicy")}.
                </Box>
            </Box>
        </Box>
    )
}
