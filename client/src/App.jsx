import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  authRoutes,
  managementRoutes,
  publicRoutes,
  userRoutes,
  designerRoutes,
} from "./routes";
import Popup from "./components/Popup/Popup";
import AuthProvider from "./provider/auth/AuthProvider";
import { useSelector } from "react-redux";
import PopupLogout from "./components/PopupLogout/PopupLogout";
import { Helmet } from "react-helmet";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ManagementLayout from "./layouts/ManagementLayout";
import DesignerLayout from "./layouts/DesignerLayout";
import UserLayout from "./layouts/UserLayout";

function App() {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_PROJECT_NAME}</title>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </Helmet>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {authRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    !user.exist ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              );
            })}

            {userRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    user.exist ? (
                      <Layout>
                        <UserLayout>
                          <Page />
                        </UserLayout>
                      </Layout>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              );
            })}

            {managementRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    user.exist && user.data.role === "admin" ? (
                      <Layout>
                        <ManagementLayout>
                          <Page />
                        </ManagementLayout>
                      </Layout>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              );
            })}

            {designerRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    user.exist && user.data.role === "designer" ? (
                      <Layout>
                        <DesignerLayout>
                          <Page />
                        </DesignerLayout>
                      </Layout>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              );
            })}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/*  */}
          <Popup />
          <PopupLogout />
          <ScrollToTop />
          {/*  */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
