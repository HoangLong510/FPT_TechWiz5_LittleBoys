import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import { DialogTitle, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProceedToCheckout() {
    const user = useSelector(state => state.user.value)
    const carts = useSelector(state => state.cart.value)

    const { t } = useTranslation()

    const [open, setOpen] = React.useState(false)
    const [fullname, setFullname] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [note, setNote] = React.useState("")

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
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label={t("PhoneNumber")}
                            variant="outlined"
                            value={phone}
                            onChange={setPhoneNumber}
                        />
                        <TextField fullWidth InputLabelProps={{ shrink: true }}
                            label={t("Address")}
                            variant="outlined"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
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
                    <Button variant='contained' onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
