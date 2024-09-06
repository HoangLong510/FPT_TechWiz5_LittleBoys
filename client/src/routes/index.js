import DefaultLayout from "~/layouts/DefaultLayout"
import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"
import Homepage from "~/pages/home/Homepage"


const publicRoutes = [
    { path: '/', component: Homepage, layout: DefaultLayout }
]

const authRoutes = [
    {  path: '/auth/login', component: Login, layout: DefaultLayout},
    {  path: '/auth/register', component: Register, layout: DefaultLayout}
]

const userRoutes = [
    
]

const managementRoutes = [

]

export { publicRoutes, userRoutes, authRoutes, managementRoutes }