import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import Paper from '@mui/material/Paper'
import { useEffect, useState } from "react"
import { getAccountsManagementApi } from "./service"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"

export default function Account() {

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [search, setSearch] = useState("")

    const getAllAccount = async () => {
        setLoading(true)
        const res = await getAccountsManagementApi("")
        if (res) {
            setAccounts(res)
        }
        setLoading(false)
    }

    useEffect(() => {
        getAllAccount()
    }, [])

    useEffect(() => {
        setLoading(true)
        const handleSearchChange = setTimeout(async () => {
            const res = await getAccountsManagementApi(search)
            if (res) {
                setAccounts(res)
            }
            setLoading(false)
        }, 1000)

        return () => {
            clearTimeout(handleSearchChange)
        }
    }, [search])

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
                    alignItems: 'center'
                }}>
                    <Box sx={{ fontWeight: 'bold' }}>
                        ACCOUNT MANAGEMENT
                    </Box>
                </Box>

                <Box>
                    <TextField fullWidth
                        size="small"
                        id="search"
                        label="Search..."
                        variant="outlined"
                        autoComplete="off"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ minHeight: '300px', border: '1px solid #e6e6e6', boxShadow: 'none' }}>
                    <Table sx={{ height: (loading || accounts.length === 0) ? "100%" : "" }}>
                        <TableHead sx={{ height: '60px' }}>
                            <TableRow sx={{ textTransform: 'uppercase', backgroundColor: '#000' }}>
                                <TableCell sx={{ color: '#fff', width: '30%' }}>
                                    Email
                                </TableCell>
                                <TableCell align="center" sx={{ color: '#fff', width: '30%', display: { xs: 'none', md: 'revert' } }}>
                                    {t("Fullname")}
                                </TableCell>
                                <TableCell align="center" sx={{ color: '#fff', width: '20%', display: { xs: 'none', md: 'revert' } }}>
                                    {t("PhoneNumber")}
                                </TableCell>
                                <TableCell align="center" sx={{ color: '#fff', width: '10%', display: { xs: 'none', md: 'revert' } }}>
                                    {t("Gender")}
                                </TableCell>
                                <TableCell align="right" sx={{ color: '#fff', width: '10%' }}>
                                    {t("Role")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && accounts.length > 0 && accounts.map((account) => (
                                <TableRow
                                    key={account.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'pointer',
                                        }
                                    }}
                                >
                                    <TableCell>{account.email}</TableCell>
                                    <TableCell align="center" sx={{
                                        textTransform: 'capitalize',
                                        display: { xs: 'none', md: 'revert' }
                                    }}>
                                        {account.fullname}
                                    </TableCell>
                                    <TableCell align="center" sx={{ display: { xs: 'none', md: 'revert' } }}>
                                        {account.phone}
                                    </TableCell>
                                    <TableCell align="center" sx={{ textTransform: 'capitalize', display: { xs: 'none', md: 'revert' } }}>
                                        {account.gender === 'male' ? t("Male") : t("Female")}
                                    </TableCell>
                                    <TableCell align="right" style={{ textTransform: 'capitalize' }}>
                                        {account.role}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && accounts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No data
                                    </TableCell>
                                </TableRow>
                            )}
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
