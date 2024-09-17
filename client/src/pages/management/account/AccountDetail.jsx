import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { updateAccountApi, fetchAccountDetailApi } from "./service"
import { formatDate } from "~/function"
import { useDispatch } from "react-redux"
import { setPopup } from "~/libs/features/popup/popupSlice"
import { clearLoading, setLoading } from "~/libs/features/loading/loadingSlice"
import { clearUser, setUser } from "~/libs/features/user/userSlice"

export default function AccountDetail() {

    const { t } = useTranslation()
    const { userId } = useParams()
    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(true)

    const [account, setAccount] = useState(false)
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [updatedAt, setUpdatedAt] = useState("")
    const [active, setActive] = useState(0)

    const setData = (data) => {
        setFullname(data.fullname)
        setEmail(data.email)
        setPhone(data.phone)
        setGender(data.gender)
        setAddress(data.address)
        setRole(data.role)
        setCreatedAt(formatDate(data.created_at))
        setUpdatedAt(formatDate(data.updated_at))
        setActive(data.active)
    }

    const fetchAccountDetail = async () => {
        dispatch(setLoading())
        const res = await fetchAccountDetailApi(userId)

        if (res) {
            setAccount(res.account)
            setData(res.account)
        }

        dispatch(clearLoading())
    }

    const handleUpdateAccount = async (event) => {
        event.preventDefault()

        if (
            fullname !== account.fullname ||
            gender !== account.gender ||
            address !== account.address ||
            role !== account.role ||
            active !== account.active
        ) {
            dispatch(setLoading())

            const data = {
                id: userId,
                fullname,
                gender,
                address,
                role,
                active
            }

            const res = await updateAccountApi(data)
            dispatch(clearLoading())

            if (res.success) {
                if (res.user) {
                    if (!res.user.active) {
                        dispatch(clearUser())
                    } else {
                        dispatch(setUser(res.user))
                    }
                }
                if (!res.user || (res.user && res.user.role === 'admin')) {
                    await fetchAccountDetail()
                }
                const dataPopup = {
                    type: "success",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                setDisabled(true)
            } else {
                setData(account)
                const dataPopup = {
                    type: "error",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                setDisabled(true)
            }
        }
    }

    useEffect(() => {
        fetchAccountDetail()
    }, [])

    useEffect(() => {
        if (
            fullname !== account.fullname ||
            gender !== account.gender ||
            address !== account.address ||
            role != account.role ||
            active !== account.active
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [
        fullname,
        gender,
        address,
        role,
        active
    ])

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
                    <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {t("AccountDetail")}
                    </Box>
                    <Link to="/management/account">
                        <Button>
                            {t("ViewAllAccounts")}
                        </Button>
                    </Link>
                </Box>

                <form onSubmit={handleUpdateAccount}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        <TextField fullWidth
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            label={t("Fullname")}
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={email}
                            label="Email"
                            variant="standard"
                            slotProps={{
                                input: {
                                    disabled: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={phone}
                            label={t("PhoneNumber")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    disabled: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="select-gender">{t("Gender")}</InputLabel>
                            <Select
                                labelId="select-gender"
                                value={gender}
                                label={t("Gender")}
                                onChange={e => setGender(e.target.value)}
                            >
                                <MenuItem value={'male'}>{t("Male")}</MenuItem>
                                <MenuItem value={'female'}>{t("Female")}</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField fullWidth
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            label={t("Address")}
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="select-role">{t("Role")}</InputLabel>
                            <Select
                                labelId="select-role"
                                value={role}
                                label={t("Role")}
                                onChange={e => setRole(e.target.value)}
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField fullWidth
                            value={createdAt}
                            label={t("CreatedAt")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    disabled: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField fullWidth
                            value={updatedAt}
                            label={t("UpdatedAt")}
                            variant="standard"
                            slotProps={{
                                input: {
                                    disabled: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="select-active">{t("Active")}</InputLabel>
                            <Select
                                labelId="select-active"
                                value={active}
                                label={t("Active")}
                                onChange={e => setActive(e.target.value)}
                            >
                                <MenuItem value={1}>{t("Yes")}</MenuItem>
                                <MenuItem value={0}>{t("No")}</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ padding: '5px 0px', width: '100%' }}>
                            <Button type="submit" fullWidth variant="contained" disabled={disabled}>
                                {t("Update")}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}
