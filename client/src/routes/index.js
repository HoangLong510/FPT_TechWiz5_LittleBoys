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
import BrandList from "~/pages/management/brand/BrandList";
import BrandCreate from "~/pages/management/brand/BrandCreate";
import BrandDetail from "~/pages/management/brand/BrandDetail";
import DefaultLayout from "~/layouts/DefaultLayout"
import Profile from "~/pages/user/profile/Profile"


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
    { path: '/user', component: Profile, layout: DefaultLayout}
]

const managementRoutes = [
    { path: '/management', component: Management, layout: DefaultLayout },
    { path: '/management/account', component: AccountManagement, layout: DefaultLayout },
    { path: '/management/account/:userId', component: AccountDetail, layout: DefaultLayout },
    { path: '/management/brands', component: BrandList, layout: DefaultLayout }, // Route mới cho Brand
    { path: '/management/brands/create', component: BrandCreate, layout: DefaultLayout }, // Route tạo thương hiệu
    { path: '/management/brands/:brandId', component: BrandDetail, layout: DefaultLayout }, // Route mới cho Brand
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes }