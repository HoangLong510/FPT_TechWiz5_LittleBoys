import ForgotPassword from "~/pages/auth/forgot-password/ForgotPassword"
import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"
import Management from "~/pages/management/Management"
import AccountManagement from "~/pages/management/account/Account"
import AboutUs from "~/pages/about-us/AboutUs"
import ContactUs from "~/pages/contact-us/ContactUs"
import AboutusLayout from "~/layouts/AboutusLayout"
import AccountDetail from "~/pages/management/account/AccountDetail"
import BrandList from "~/pages/management/brand/BrandList";
import BrandCreate from "~/pages/management/brand/BrandCreate";
import BrandDetail from "~/pages/management/brand/BrandDetail";
import CategoryList from "~/pages/management/category/CategoryList"; 
import CategoryCreate from "~/pages/management/category/CategoryCreate"; 
import CategoryDetail from "~/pages/management/category/CategoryDetail"; 
import ProductList from "~/pages/management/product/ProductList";
import ProductCreate from "~/pages/management/product/ProductCreate";
import ProductDetail from "~/pages/management/product/ProductDetail";
import DefaultLayout from "~/layouts/DefaultLayout"
import PaymentsLayout from "~/layouts/PaymentsLayout"
import Payments from "~/pages/payments/Payments"
import Home from "~/pages/home/Home"
import NavEffectLayout from "~/layouts/NavEffectLayout"
import Profile from "~/pages/user/profile/Profile"
import Product from "~/pages/productPages/Product"
import ProductDetailPage from "~/pages/productPages/ProductDetailPage"
import dashboard from "../pages/supplier/dashboard"
import SupplierLayout from "../layouts/SupplierLayout"
import Security from "../pages/user/security/security"
import notification from "../pages/user/notification/notification"
import favorite from "~/pages/user/favorite/favorite"
import orders from "~/pages/user/orders/oders"
import RegisterSupplier from "~/pages/auth/register/RegisterSupplier"

const publicRoutes = [
    { path: '/', component: Home, layout: NavEffectLayout },
    { path: '/about-us', component: AboutUs, layout: NavEffectLayout },
    { path: '/contact-us', component: ContactUs, layout: DefaultLayout },
    { path: '/product', component: Product, layout: DefaultLayout },
    { path: '/product/:productId', component: ProductDetailPage, layout: DefaultLayout },
    { path: '/register-supplier', component: RegisterSupplier , layout: DefaultLayout },
]

const authRoutes = [
    { path: '/auth/login', component: Login, layout: DefaultLayout },
    { path: '/auth/register', component: Register, layout: DefaultLayout },
   
    { path: '/auth/forgot-password', component: ForgotPassword, layout: DefaultLayout }
]

const userRoutes = [
    { path: '/user', component: Profile, layout: DefaultLayout},
    { path: '/payments', component: Payments, layout: PaymentsLayout },
    { path: '/user/security', component: Security, layout: DefaultLayout },
    { path: '/user/notification', component: notification, layout: DefaultLayout },
    { path: '/user/favorite', component: favorite , layout: DefaultLayout },
    { path: '/user/orders', component: orders , layout: DefaultLayout },
    
]

const managementRoutes = [
    { path: '/management', component: Management, layout: DefaultLayout },
    { path: '/management/account', component: AccountManagement, layout: DefaultLayout },
    { path: '/management/account/:userId', component: AccountDetail, layout: DefaultLayout },
  
    { path: '/management/brands', component: BrandList, layout: DefaultLayout }, 
    { path: '/management/brands/create', component: BrandCreate, layout: DefaultLayout }, 
    { path: '/management/brands/:brandId', component: BrandDetail, layout: DefaultLayout }, 
  
    { path: '/management/categories', component: CategoryList, layout: DefaultLayout }, 
    { path: '/management/categories/create', component: CategoryCreate, layout: DefaultLayout }, 
    { path: '/management/categories/:categoryId', component: CategoryDetail, layout: DefaultLayout }, 

    { path: '/management/products', component: ProductList, layout: DefaultLayout }, 
    { path: '/management/products/create', component: ProductCreate, layout: DefaultLayout }, 
    { path: '/management/products/:productId', component: ProductDetail, layout: DefaultLayout }, 
]

const supplierRoutes =[
    {path: '/supplier', component: dashboard, layout: SupplierLayout },
    
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes, supplierRoutes }