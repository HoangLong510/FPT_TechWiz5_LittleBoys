import { Box, Button, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

export default function RegisterSupplier() {
  const { t } = useTranslation()
  const loading = useSelector(state => state.loading.value)
 
  return (
      <>
          <Helmet>
              <title>{import.meta.env.VITE_PROJECT_NAME} | {t("CreateAccount")}</title>
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
                          {t("Register Supplier")}
                      </span>
                      <span style={{
                          fontSize: '15px',
                          paddingBottom: '10px'
                      }}>
                          {t("Fill full information to become our supplier")}
                      </span>
                  </Box>
                  {/* onSubmit={handleUserRegister} */}
                  <form  style={{
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
                          // value={fullname}
                          // onChange={(e) => setFullname(e.target.value)}
                          // helperText={t(errorFullname)}
                          // color={!errorFullname ? "success" : "error"}
                      />
                      <TextField sx={{ width: '100%' }}
                          id="address"
                          autoComplete="off"
                          label={t("Address")}
                          variant="outlined"
                          // value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                          // helperText={t(errorAddress)}
                          // color={!errorAddress ? "success" : "error"}
                      />
                      <TextField sx={{ width: '100%' }}
                          id="email"
                          autoComplete="off"
                          label="email"
                          variant="outlined"
                          disabled
                      />
                      
                      <TextField sx={{ width: '100%' }}
                          id="phone"
                          autoComplete="off"
                          label="phone"
                          variant="outlined"
                          disabled
                      />
                      

                      {/* disabled={loading || error} */}
                      <Button type='submit' variant='contained' >
                          {t("CreateAccount")}
                      </Button>
                  </form>
                  <Box sx={{
                      fontSize: '15px',
                      paddingBottom: '10px',
                      userSelect: 'none',
                      paddingTop: '15px'
                  }}>
                  </Box>
              </Box>
          </Box>
      </>
  )
}
