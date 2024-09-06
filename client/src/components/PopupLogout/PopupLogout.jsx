import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { clearLogout } from '~/libs/features/logout/logoutSlice'
import { clearUser } from '~/libs/features/user/userSlice'
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function PopupLogout() {

    const { t } = useTranslation()
    const loading = useSelector((state) => state.loading.value)
    const openLogout = useSelector((state) => state.logout.value)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        dispatch(setLoading())

        localStorage.removeItem('token')
        dispatch(clearUser())

        handleClose()
        dispatch(clearLoading())
    }

    const handleClose = () => {
        dispatch(clearLogout())
    }

    return (
        <React.Fragment>
            <Dialog
                open={openLogout}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle color={'primary'}>{t("Logout")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t("AreYouSureYouWantToLogoutOfTheApplication")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' disabled={loading} onClick={handleClose}>{t("Close")}</Button>
                    <Button variant='contained' disabled={loading} onClick={handleLogout}>
                        {t("Agree")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
