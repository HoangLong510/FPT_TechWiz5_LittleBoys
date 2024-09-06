import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { clearPopup } from '~/libs/features/popup/popupSlice'
import { Slide } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Popup() {

    const popup = useSelector(state => state.popup.value)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const handleClose = () => {
        dispatch(clearPopup())
    }

    return (
        <React.Fragment>
            <Dialog sx={{ zIndex: 9999 }}
                open={popup.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {popup.data.type === 'error' && (
                    <DialogTitle color={'primary'}>
                        {t("Error")}
                    </DialogTitle>
                )}
                {popup.data.type === 'success' && (
                    <DialogTitle color={'primary'}>
                        {t("Success")}
                    </DialogTitle>
                )}
                <DialogContent sx={{
                    width: { xs: '100%', md: '500px' }
                }}>
                    {popup.data.message && (
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {popup.data.message.map((msg, index) => {
                                return <span key={index}>{msg[i18n.language]}</span>
                            })}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    {popup.data.type === 'success' && (
                        <Button variant='contained' onClick={handleClose}>
                            {t("Agree")}
                        </Button>
                    )}
                    {popup.data.type === 'error' && (
                        <Button onClick={handleClose} color='primary' variant='outlined'>
                            {t("Close")}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}