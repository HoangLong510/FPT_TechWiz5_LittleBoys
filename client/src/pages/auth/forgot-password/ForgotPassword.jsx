import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { checkVerificationCodeApi, resetPasswordApi, sendVerificationCodeApi } from "./service"
import { useDispatch, useSelector } from "react-redux"
import { setPopup } from "~/libs/features/popup/popupSlice"
import { clearLoading, setLoading } from "~/libs/features/loading/loadingSlice"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function ForgotPassword() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading.value)
    const navigate = useNavigate()

    const [step, setStep] = useState(1)

    const [email, setEmail] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSendVerificationCode = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        const data = {
            email
        }

        const res = await sendVerificationCodeApi(data)

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setStep(2)
            dispatch(clearLoading())
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            dispatch(clearLoading())
        }
    }

    const handleCheckVerificationCode = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        const data = {
            email,
            verificationCode
        }

        const res = await checkVerificationCodeApi(data)

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setStep(3)
            dispatch(clearLoading())
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            dispatch(clearLoading())
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        const data = {
            email,
            verificationCode,
            password,
            confirmPassword
        }

        const res = await resetPasswordApi(data)

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            dispatch(clearLoading())
            navigate('/auth/login')
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
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("ForgotPassword")}</title>
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
                    padding: '20px 20px 30px 20px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}>
                    {/*  */}
                    {step === 1 && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                paddingBottom: '5px'
                            }}>
                                {t("ForgotPassword")}
                            </span>
                            <span style={{
                                fontSize: '15px',
                                paddingBottom: '10px',
                                userSelect: 'none'
                            }}>
                                {t("EnterEmailToContinue")}
                            </span>
                            <form onSubmit={handleSendVerificationCode} style={{
                                padding: '10px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <TextField sx={{ width: '100%' }}
                                    id="email"
                                    autoComplete="off"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type='submit' variant='contained' disabled={loading}>
                                    {t("Agree")}
                                </Button>
                            </form>
                            <Link to='/auth/login' style={{ width: '100%' }}>
                                <Button variant='outlined' style={{ width: '100%' }}>
                                    {t("BackToLoginPage")}
                                </Button>
                            </Link>
                        </Box>
                    )}
                    {step === 2 && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                paddingBottom: '5px'
                            }}>
                                {t("EnterVerificationCode")}
                            </span>
                            <span style={{
                                fontSize: '15px',
                                paddingBottom: '10px',
                                userSelect: 'none'
                            }}>
                                {t("VerificationCodeHasBeenSentToYourEmail")}
                            </span>
                            <form onSubmit={handleCheckVerificationCode} style={{
                                padding: '10px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <TextField sx={{ width: '100%' }}
                                    id="verificationCode"
                                    autoComplete="off"
                                    label={t("VerificationCode")}
                                    variant="outlined"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                />
                                <Button type='submit' variant='contained' disabled={loading}>
                                    {t("Agree")}
                                </Button>
                            </form>
                            <Link to='/auth/login' style={{ width: '100%' }}>
                                <Button variant='outlined' style={{ width: '100%' }}>
                                    {t("BackToLoginPage")}
                                </Button>
                            </Link>
                        </Box>
                    )}
                    {step === 3 && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                paddingBottom: '5px'
                            }}>
                                {t("ResetPassword")}
                            </span>
                            <span style={{
                                fontSize: '15px',
                                paddingBottom: '10px',
                                userSelect: 'none'
                            }}>
                                {t("ForSecurityReasonsPleaseDoNotShareYourPasswordWithAnyone")}
                            </span>
                            <form onSubmit={handleResetPassword} style={{
                                padding: '10px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <TextField sx={{ width: '100%' }}
                                    id="password"
                                    type="password"
                                    autoComplete="off"
                                    label={t("Password")}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <TextField sx={{ width: '100%' }}
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="off"
                                    label={t("ConfirmPassword")}
                                    variant="outlined"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button type='submit' variant='contained' disabled={loading}>
                                    {t("Agree")}
                                </Button>
                            </form>
                            <Link to='/auth/login' style={{ width: '100%' }}>
                                <Button variant='outlined' style={{ width: '100%' }}>
                                    {t("BackToLoginPage")}
                                </Button>
                            </Link>
                        </Box>
                    )}
                    {/*  */}
                </Box>
            </Box>
        </>
    )
}
