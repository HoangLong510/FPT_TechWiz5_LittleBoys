import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { authRoutes, publicRoutes } from "./routes";
import AuthProvider from "./provider/auth/AuthProvider";
import Popup from "./components/Popup/Popup";
import PopupLogout from "./components/PopupLogout/PopupLogout";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="contained"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function App() {
  const user = useSelector((state) => state.user.value);

  return (
    <AuthProvider>
      <ModeToggle />
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
        </Routes>
        {/*  */}
        <Popup />
        <PopupLogout />
        {/*  */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
