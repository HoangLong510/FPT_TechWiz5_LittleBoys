import ForgotPassword from "~/pages/auth/forgot-password/ForgotPassword"
import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"
import Homepage from "~/pages/home/Homepage"
import Management from "~/pages/management/Management"
import AccountManagement from "~/pages/management/account/Account"
import AboutUs from "~/pages/about-us/AboutUs"
import ContactUs from "~/pages/contact-us/ContactUs"
import AboutusLayout from "~/layouts/AboutusLayout"
import AccountDetail from "~/pages/management/account/AccountDetail"
import DefaultLayout from "~/layouts/DefaultLayout"


const publicRoutes = [
    { path: '/', component: Homepage, layout: DefaultLayout },
    { path: '/about-us', component: AboutUs, layout: AboutusLayout },
    { path: '/contact-us', component: ContactUs, layout: DefaultLayout },
]

const authRoutes = [
    { path: '/auth/login', component: Login, layout: DefaultLayout },
    { path: '/auth/register', component: Register, layout: DefaultLayout },
    { path: '/auth/forgot-password', component: ForgotPassword, layout: DefaultLayout }
]

const userRoutes = [

]

const managementRoutes = [
    { path: '/management', component: Management, layout: DefaultLayout },
    { path: '/management/account', component: AccountManagement, layout: DefaultLayout },
    { path: '/management/account/:userId', component: AccountDetail, layout: DefaultLayout }
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes }