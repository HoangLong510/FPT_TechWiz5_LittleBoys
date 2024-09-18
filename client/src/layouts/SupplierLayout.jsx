import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import Footer from '~/components/Footer/Footer'
import Backtotop from "~/components/Backtotop/Backtotop"



export default function SupplierLayout({ children }) {

    const loading = useSelector(state => state.loading.value)

    return (
        <div className="supplier-layout">
            <div className="header">
                <div className="header-loading">
                    {loading && (
                        <LinearProgress />
                    )}
                </div>
                <Navbar />
            </div>
            <div className="content" >
                {children}
            </div>
            <Footer />
            <Backtotop/>
        </div>
    )
}
