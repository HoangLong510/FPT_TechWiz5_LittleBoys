import ForgotPassword from "~/pages/auth/forgot-password/ForgotPassword"
import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"
import Management from "~/pages/management/Management"
import AccountManagement from "~/pages/management/account/Account"
import AboutUs from "~/pages/about-us/AboutUs"
import ContactUs from "~/pages/contact-us/ContactUs"
import AccountDetail from "~/pages/management/account/AccountDetail"
import BrandList from "~/pages/management/brand/BrandList";
import CategoryList from "~/pages/management/category/CategoryList"; 
import CategoryCreate from "~/pages/management/category/CategoryCreate"; 
import CategoryDetail from "~/pages/management/category/CategoryDetail"; 
import ProductList from "~/pages/management/product/ProductList";
import DefaultLayout from "~/layouts/DefaultLayout"
import PaymentsLayout from "~/layouts/PaymentsLayout"
import Payments from "~/pages/payments/Payments"
import Home from "~/pages/home/Home"
import NavEffectLayout from "~/layouts/NavEffectLayout"
import Profile from "~/pages/user/profile/Profile"
import Product from "~/pages/productPages/Product"
import ProductDetailPage from "~/pages/productPages/ProductDetailPage"
import Security from "../pages/user/security/security"
import notification from "../pages/user/notification/notification"
import favorite from "~/pages/user/favorite/Favorite"
import orders from "~/pages/user/orders/oders"
import RegisterDesigner from "~/pages/auth/register/RegisterDesigner"
import Blog from "~/pages/blog/Blog"
import DesignProjectCreate from "~/pages/supplier/project/DesignProjectCreate"
import DesignDetails from "~/pages/supplier/DesignDetail/DesignDetails"
import BlogDetail from "~/pages/blog/blogDetail/BlogDetailOne"
import DesignProjectList from "~/pages/supplier/project/DesignProjectList"
import DesignProjectDetails from "~/pages/supplier/project/DesignProjectDetails"

import Meetings from "~/pages/supplier/meetings/Meetings"
import Feedback from "~/pages/supplier/feedback/Feedback"
import Supplier from "~/pages/supplier/Design"

import Favorite from "~/pages/user/favorite/Favorite"


const publicRoutes = [
    { path: '/', component: Home, layout: NavEffectLayout },
    { path: '/about-us', component: AboutUs, layout: NavEffectLayout },
    { path: '/contact-us', component: ContactUs, layout: DefaultLayout },
    { path: '/product', component: Product, layout: DefaultLayout },
    { path: '/product/:productId', component: ProductDetailPage, layout: DefaultLayout },
    { path: '/register-designer', component: RegisterDesigner , layout: DefaultLayout },
    { path: '/blog', component: Blog, layout: DefaultLayout },
    { path: '/designer/detail/userId', component: DesignDetails, layout: DefaultLayout },
    { path: '/blog/blogdetailone', component: BlogDetail , layout: DefaultLayout },
]

const authRoutes = [
    { path: '/auth/login', component: Login, layout: DefaultLayout },
    { path: '/auth/register', component: Register, layout: DefaultLayout },
    { path: '/auth/register-designer', component: RegisterDesigner, layout: DefaultLayout },
    { path: '/auth/forgot-password', component: ForgotPassword, layout: DefaultLayout }
]

const userRoutes = [
    { path: '/user', component: Profile, layout: DefaultLayout},
    { path: '/payments', component: Payments, layout: PaymentsLayout },
    { path: '/user/security', component: Security, layout: DefaultLayout },
    { path: '/user/notification', component: notification, layout: DefaultLayout },
    { path: '/user/favorite', component: Favorite , layout: DefaultLayout },
    { path: '/user/orders', component: orders , layout: DefaultLayout },
    
]

const managementRoutes = [
    { path: '/management', component: Management, layout: DefaultLayout },
    { path: '/management/account', component: AccountManagement, layout: DefaultLayout },
    { path: '/management/account/:userId', component: AccountDetail, layout: DefaultLayout },
  
    { path: '/management/suppliers', component: BrandList, layout: DefaultLayout }, 
  
    { path: '/management/categories', component: CategoryList, layout: DefaultLayout }, 
    { path: '/management/categories/create', component: CategoryCreate, layout: DefaultLayout }, 
    { path: '/management/categories/:categoryId', component: CategoryDetail, layout: DefaultLayout }, 

    { path: '/management/products', component: ProductList, layout: DefaultLayout }, 

]

const designerRoutes =[
    {path : '/designer' ,  component: Supplier , layout: DefaultLayout},
    {path :'/designer/projects/', component: DesignProjectList , layout: DefaultLayout},
    {path :'/designer/projects/:projectId', component: DesignProjectDetails , layout: DefaultLayout},

    {path :'/designer/projects/create', component: DesignProjectCreate , layout: DefaultLayout},
    {path : '/designer/meetings', component: Meetings, layout: DefaultLayout},
    {path : '/designer/feedback', component: Feedback, layout: DefaultLayout},
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes, designerRoutes }