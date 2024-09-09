import DefaultLayout from "~/layouts/DefaultLayout";
import ForgotPassword from "~/pages/auth/forgot-password/ForgotPassword";
import Login from "~/pages/auth/login/Login";
import Register from "~/pages/auth/register/Register";
import Homepage from "~/pages/home/Homepage";
import AboutUs from "~/pages/about-us/AboutUs";

const publicRoutes = [
  { path: "/", component: Homepage, layout: DefaultLayout },
  { path: "/about-us", component: AboutUs, layout: DefaultLayout },
];

const authRoutes = [
  { path: "/auth/login", component: Login, layout: DefaultLayout },
  { path: "/auth/register", component: Register, layout: DefaultLayout },
  {
    path: "/auth/forgot-password",
    component: ForgotPassword,
    layout: DefaultLayout,
  },
];

const userRoutes = [];

const managementRoutes = [];

export { publicRoutes, userRoutes, authRoutes, managementRoutes };
