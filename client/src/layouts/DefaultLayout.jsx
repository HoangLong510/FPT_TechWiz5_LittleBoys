import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from '~/components/Navbar/Navbar'
import Footer from '~/components/Footer/Footer'

export default function DefaultLayout({ children }) {

    const loading = useSelector(state => state.loading.value)

    return (
        <div className="default-layout">
            <div className="header">
                <div className="header-loading">
                    {loading && (
                        <LinearProgress />
                    )}
                </div>
                <Navbar />
            </div>
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
    )
}
