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
import ManagementProductList from "~/pages/management/product/ProductList";
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
import Orders from "~/pages/user/orders/oders"
import RegisterSupplier from "~/pages/auth/register/RegisterSupplier"
import Blog from "~/pages/blog/Blog"
import SupplierDetail from "~/pages/supplier/supplierDetail/SupplierDetail"
import BlogDetail from "~/pages/blog/blogDetail/BlogDetailOne"
import SupplierProductList from "~/pages/supplier/product/SupplierProductList"
import SupplierProductDetails from "~/pages/supplier/product/SupplierProductDetails"

import Meetings from "~/pages/supplier/meetings/Meetings"
import Feedback from "~/pages/supplier/feedback/Feedback"
import Supplier from "~/pages/supplier/Supplier"

import Favorite from "~/pages/user/favorite/Favorite"
import OrderDetail from "~/pages/user/orders/orderDetail"
import OrderManagement from "~/pages/management/order/OrderManagement"
import OrderDetailManagement from "~/pages/management/order/OrderDetailManagement"
import ManagementProductCreate from "~/pages/management/product/productCreate"
import ManagementProductDetail from "~/pages/management/product/productDetails"
import Gallery from "~/pages/gallery/Gallery"
import ProjectDetail from "../pages/gallery/ProjectDetail";

const publicRoutes = [
    { path: '/', component: Home, layout: NavEffectLayout },
    { path: '/about-us', component: AboutUs, layout: NavEffectLayout },
    { path: '/contact-us', component: ContactUs, layout: DefaultLayout },
    { path: '/product', component: Product, layout: DefaultLayout },
    { path: '/product/:productId', component: ProductDetailPage, layout: DefaultLayout },
    { path: '/register-supplier', component: RegisterSupplier, layout: DefaultLayout },
    { path: '/blog', component: Blog, layout: DefaultLayout },
    { path: '/supplier/detail', component: SupplierDetail, layout: DefaultLayout },
    { path: '/blog/blogdetailone', component: BlogDetail, layout: DefaultLayout },
    { path: '/gallery', component: Gallery , layout: DefaultLayout },
    { path: '/project/detail', component: ProjectDetail , layout: DefaultLayout },
]

const authRoutes = [
    { path: '/auth/login', component: Login, layout: DefaultLayout },
    { path: '/auth/register', component: Register, layout: DefaultLayout },
    { path: '/auth/register-supplier/:{id}', component: RegisterSupplier, layout: DefaultLayout },
    { path: '/auth/forgot-password', component: ForgotPassword, layout: DefaultLayout }
]

const userRoutes = [
    { path: '/user', component: Profile, layout: DefaultLayout },
    { path: '/payments', component: Payments, layout: PaymentsLayout },
    { path: '/user/security', component: Security, layout: DefaultLayout },
    { path: '/user/notification', component: notification, layout: DefaultLayout },
    { path: '/user/favorite', component: Favorite, layout: DefaultLayout },
    { path: '/user/orders', component: Orders, layout: DefaultLayout },
    { path: '/user/orders/:id', component: OrderDetail, layout: DefaultLayout },
]

const managementRoutes = [
    { path: '/management', component: Management, layout: DefaultLayout },
    { path: '/management/account', component: AccountManagement, layout: DefaultLayout },
    { path: '/management/account/:userId', component: AccountDetail, layout: DefaultLayout },

    { path: '/management/suppliers', component: BrandList, layout: DefaultLayout },

    { path: '/management/categories', component: CategoryList, layout: DefaultLayout },
    { path: '/management/categories/create', component: CategoryCreate, layout: DefaultLayout },
    { path: '/management/categories/:categoryId', component: CategoryDetail, layout: DefaultLayout },

    { path: '/management/products', component: ManagementProductList, layout: DefaultLayout },
    { path: '/management/products/create', component: ManagementProductCreate, layout: DefaultLayout },
    { path: '/management/products/:productId', component: ManagementProductDetail, layout: DefaultLayout },

    { path: '/management/order', component: OrderManagement, layout: DefaultLayout },
    { path: '/management/order/:id', component: OrderDetailManagement, layout: DefaultLayout },
]

const supplierRoutes = [
    { path: '/supplier', component: Supplier, layout: DefaultLayout },
    { path: '/supplier/products/', component: SupplierProductList, layout: DefaultLayout },
    { path: '/supplier/products/:productId', component: SupplierProductDetails, layout: DefaultLayout },

    { path: '/supplier/categories', component: CategoryList, layout: DefaultLayout },
    { path: '/supplier/meetings', component: Meetings, layout: DefaultLayout },
    { path: '/supplier/feedback', component: Feedback, layout: DefaultLayout },
]

export { publicRoutes, userRoutes, authRoutes, managementRoutes, supplierRoutes }