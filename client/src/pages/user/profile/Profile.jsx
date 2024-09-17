import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '~/function'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { userUpdateApi } from './service'
import { setUser } from '~/libs/features/user/userSlice'
import { setPopup } from '~/libs/features/popup/popupSlice'

export default function Profile() {

    const user = useSelector((state) => state.user.value)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(true)

    const [email, setEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [createdAt, setCreatedAt] = useState("")

    const setData = (data) => {
        setEmail(data.email)
        setFullname(data.fullname)
        setPhone(data.phone)
        setGender(data.gender)
        setAddress(data.address)
        setCreatedAt(formatDate(data.created_at))
    }

    const handleUserUpdate = async (event) => {
        event.preventDefault()
        dispatch(setLoading())

        if (
            fullname !== user.data.fullname ||
            phone !== user.data.phone ||
            gender !== user.data.gender ||
            address !== user.data.address
        ) {
            const data = {
                fullname,
                phone,
                gender,
                address
            }

            const res = await userUpdateApi(data)

            if (res.success) {
                dispatch(setUser({
                    ...user.data,
                    fullname,
                    phone,
                    gender,
                    address
                }))
                setDisabled(true)
                const dataPopup = {
                    type: "success",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            } else {
                setData(user.data)
                const dataPopup = {
                    type: "error",
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            }
            dispatch(clearLoading())
        } else {
            dispatch(clearLoading())
        }
    }

    useEffect(() => {
        setData(user.data)
    }, [])

    useEffect(() => {
        if (
            fullname !== user.data.fullname ||
            phone !== user.data.phone ||
            gender !== user.data.gender ||
            address !== user.data.address
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [
        fullname,
        phone,
        gender,
        address
    ])

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("Profile")}</title>
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
                        {t("Profile")}
                    </Box>
                </Box>

                <form onSubmit={handleUserUpdate} style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <TextField fullWidth
                        value={email}
                        label="Email"
                        variant="standard"
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            },
                            input: {
                                disabled: true,
                            },
                        }}
                    />
                    <TextField fullWidth
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        autoComplete='none'
                        label={t("Fullname")}
                        variant="standard"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                    />

                    <TextField fullWidth
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        label={t("PhoneNumber")}
                        variant="standard"
                        slotProps={{
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

                    <TextField fullWidth
                        value={createdAt}
                        label={t("CreatedAt")}
                        variant="standard"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                            input: {
                                disabled: true,
                            },
                        }}
                    />

                    <Box sx={{ padding: '5px 0px', width: '100%' }}>
                        <Button type="submit" fullWidth variant="contained" disabled={disabled}>
                            {t("Update")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}
