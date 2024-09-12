import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { getAccountDetailApi, lockAccountApi, unlockAccountApi, updateAccountRoleApi } from "./service"
import { formatDate } from "~/function"
import { useDispatch, useSelector } from "react-redux"
import { setPopup } from "~/libs/features/popup/popupSlice"
import { setUser } from "~/libs/features/user/userSlice"

export default function AccountDetail() {

    const { t } = useTranslation()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)

    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(false)

    const getAccountDetail = async () => {
        setLoading(true)
        const res = await getAccountDetailApi(userId)

        if (res) {
            setAccount(res.account)
        }

        setLoading(false)
    }

    const handleupdateAccountRole = async (event) => {
        setLoading(true)

        if (event.target.value === account.role) {
            setLoading(false)
        } else {
            const data = {
                id: userId,
                role: event.target.value
            }

            const res = await updateAccountRoleApi(data)

            if (res.success) {
                if (user.data.id == userId) {
                    dispatch(setUser({
                        ...user.data,
                        role: event.target.value
                    }))
                } else {
                    setAccount({
                        ...account,
                        role: event.target.value
                    })
                }
                const dataPopup = {
                    type: "success",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                setLoading(false)
            } else {
                const dataPopup = {
                    type: "error",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                setLoading(false)
            }
        }
    }

    const handleLockAccount = async () => {
        setLoading(true)

        const res = await lockAccountApi(userId)

        if (res.success) {
            setAccount({
                ...account,
                active: 0
            })
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setLoading(false)
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setLoading(false)
        }
    }

    const handleUnlockAccount = async () => {
        setLoading(true)

        const res = await unlockAccountApi(userId)

        if (res.success) {
            setAccount({
                ...account,
                active: 1
            })
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setLoading(false)
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            setLoading(false)
        }
    }

    useEffect(() => {
        getAccountDetail()
    }, [])

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("ManagementAccount")}</title>
            </Helmet>
            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: '20px',
                userSelect: 'none'
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '40px'
                }}>
                    <Box sx={{ fontWeight: 'bold' }}>
                        ACCOUNT DETAIL
                    </Box>
                    <Link to="/management/account">
                        <Button>
                            View all accounts
                        </Button>
                    </Link>
                </Box>

                {!loading && account && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        <TextField fullWidth
                            value={account?.fullname}
                            label={t("Fullname")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={account?.email}
                            label="Email"
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={account?.phone}
                            label={t("PhoneNumber")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={account?.gender === 'male' ? t("Male") : t("Female")}
                            label={t("Gender")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="select-role">{t("Role")}</InputLabel>
                            <Select
                                labelId="select-role"
                                value={account?.role}
                                label={t("Role")}
                                onChange={handleupdateAccountRole}
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField fullWidth
                            value={formatDate(account?.created_at)}
                            label="Created At"
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={formatDate(account?.updated_at)}
                            label="Updated At"
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        {account?.active === 1 && (
                            <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                                <Button fullWidth variant="contained" color="error" onClick={handleLockAccount}>
                                    Lock Account
                                </Button>
                            </Box>
                        )}
                        {account?.active === 0 && (
                            <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                                <Button fullWidth variant="contained" color="success" onClick={handleUnlockAccount}>
                                    Unlock Account
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
                {loading && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px'
                    }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>


        </>
    )
}
