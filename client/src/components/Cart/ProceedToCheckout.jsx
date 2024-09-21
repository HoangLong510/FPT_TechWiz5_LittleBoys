import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { DialogTitle, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createOrderApi } from './service';
import { setPopup } from '~/libs/features/popup/popupSlice';
import { clearCart } from '~/libs/features/cart/cartSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProceedToCheckout() {
    const user = useSelector(state => state.user.value)
    const carts = useSelector(state => state.cart.value)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false)
    const [fullname, setFullname] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [note, setNote] = React.useState("")

    const [error, setError] = React.useState(true)
    const [errorFullname, setErrorFullname] = React.useState("")
    const [errorPhone, setErrorPhone] = React.useState("")
    const [errorAddress, setErrorAddress] = React.useState("")

    React.useEffect(() => {
        if (
            errorFullname ||
            errorPhone ||
            errorAddress
        ) {
            setError(true)
        } else {
            setError(false)
        }
    }, [
        errorFullname,
        errorPhone,
        errorAddress
    ])

    React.useEffect(() => {
        const regexFullname = /^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u
        const regexPhone = /^0[9|8|1|7|3|5]([-. ]?[0-9]{7,9})$/

        // fullname
        if (!fullname || fullname.trim() === "") {
            setErrorFullname("PleaseEnterYourFullName")
        } else if (!regexFullname.test(fullname)) {
            setErrorFullname("RegexFullname")
        } else {
            setErrorFullname("")
        }

        // phone
        if (!phone || phone.trim() === "") {
            setErrorPhone("PleaseEnterYourPhoneNumber")
        } else if (!regexPhone.test(phone)) {
            setErrorPhone("RegexPhoneNumber")
        } else {
            setErrorPhone("")
        }

        // address
        if (!address || address.trim() === "") {
            setErrorAddress("PleaseEnterYourAddress")
        } else {
            setErrorAddress("")
        }
    }, [
        fullname,
        phone,
        address
    ])

    const setPhoneNumber = (e) => {
        const regex = /^\d+$/
        if (regex.test(e.target.value) || e.target.value === "") {
            setPhone(e.target.value)
        }
    }

    const handleClickOpen = () => {
        setFullname(user.data.fullname)
        setPhone(user.data.phone)
        setAddress(user.data.address)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCreateOrder = async () => {
        const data = {
            fullname,
            phone,
            address,
            note
        }

        const res = await createOrderApi(data)

        if (res.success) {
            const dataPopup = {
                type: "success",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
            dispatch(clearCart())
            setOpen(false)
            Navigate('/user/orders')
        } else {
            const dataPopup = {
                type: "error",
                message: res.message
            }
            dispatch(setPopup(dataPopup))
        }
    }

    return (
        <React.Fragment>
            <Button fullWidth variant="contained" onClick={handleClickOpen} disabled={carts.data.length > 0 ? false : true}>
                Proceed to checkout
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    padding: '20px',
                    '& .MuiPaper-root': {
                        width: '100%',
                        margin: 0,
                    },
                }}
            >
                <DialogTitle>
                    Confirm Order Infomation
                </DialogTitle>
                <DialogContent>
                    <form style={{
                        padding: '20px 0px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label="Email"
                            variant="outlined"
                            value={user.data.email}
                            disabled
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label={t("Fullname")}
                            variant="outlined"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            color={!errorFullname ? "success" : "error"}
                            helperText={t(errorFullname)}
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label={t("PhoneNumber")}
                            variant="outlined"
                            value={phone}
                            onChange={setPhoneNumber}
                            helperText={t(errorPhone)}
                            color={!errorPhone ? "success" : "error"}
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label={t("Address")}
                            variant="outlined"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            helperText={t(errorAddress)}
                            color={!errorAddress ? "success" : "error"}
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            minRows={2}
                            label={t("Note")}
                            variant="outlined"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button variant='contained' onClick={() => handleCreateOrder()} disabled={error}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
