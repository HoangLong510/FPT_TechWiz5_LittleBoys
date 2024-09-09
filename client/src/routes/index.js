import DefaultLayout from "~/layouts/DefaultLayout"
import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"
import Homepage from "~/pages/home/Homepage"
import Management from "~/pages/management/Management"
import ManagementLayout from "~/layouts/ManagementLayout"
import AccountManagement from "~/pages/management/account/Account"
import ForgotPassword from "~/pages/auth/forgot-password/ForgotPassword"

const publicRoutes = [
    { path: '/', component: Homepage, layout: DefaultLayout }
]

const authRoutes = [
    {  path: '/auth/login', component: Login, layout: DefaultLayout},
    {  path: '/auth/register', component: Register, layout: DefaultLayout},
    { path: '/auth/forgot-password', component: ForgotPassword, layout: DefaultLayout}
]

const userRoutes = [
    
]

const managementRoutes = [
    { path: '/management', component: Management, layout: ManagementLayout },
    { path: '/management/account', component: AccountManagement, layout: ManagementLayout }
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes }