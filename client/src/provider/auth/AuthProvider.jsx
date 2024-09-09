import { useEffect, useState } from 'react'
import { fetchDataUserApi, refreshTokenApi } from './service'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from '~/libs/features/user/userSlice'
import LoadingPage from '~/components/Loading/LoadingPage'

export default function AuthProvider({ children }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const fetchDataUser = async (token) => {
        const user = await fetchDataUserApi(token)
        if (!user) {
            dispatch(clearUser())
            localStorage.removeItem('token')
        } else {
            dispatch(setUser(user))
        }
    }

    const refreshToken = async (token) => {
        const res = await refreshTokenApi(token)

        if (res) {
            const newToken = {
                value: res.token,
                expIn: Date.now() + res.expIn * 1000
            }
            localStorage.setItem('token', JSON.stringify(newToken))

            fetchDataUser(res.token)
        } else {
            dispatch(clearUser())
            localStorage.removeItem('token')
        }
    }

    const checkToken = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (token) {
            if (token.expIn > Date.now()) {     // token còn hạn
                if (token.expIn > Date.now() + 30 * 60 * 1000) {    // thời hạn token trên 30 phút
                    await fetchDataUser(token.value)
                } else {    // refresh token nếu thời hạn dưới 30 phút
                    await refreshToken(token.value)
                }
            } else {    // token hết hạn
                dispatch(clearUser())
                localStorage.removeItem('token')
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        checkToken()
        setInterval(() => {
            checkToken()
        }, 5 * 60 * 1000)   // 5 phút sẽ check 1 lần
    }, [])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <>
            {children}
        </>
    )
}
