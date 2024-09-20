import { useEffect, useState } from 'react'
import { fetchDataCartApi, fetchDataUserApi } from './service'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from '~/libs/features/user/userSlice'
import LoadingPage from '~/components/Loading/LoadingPage'
import { setCart } from '~/libs/features/cart/cartSlice'

export default function AuthProvider({ children }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const fetchDataUser = async () => {
        const user = await fetchDataUserApi()
        if (!user) {
            dispatch(clearUser())
        } else {
            dispatch(setUser(user))
            const cart = await fetchDataCartApi()
            if(cart){
                dispatch(setCart(cart))
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDataUser()
        setInterval(() => {
            fetchDataUser()
        }, 5 * 60 * 1000)
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
