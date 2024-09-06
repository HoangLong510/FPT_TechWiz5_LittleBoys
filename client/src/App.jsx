import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { authRoutes, publicRoutes } from "./routes"
import Popup from "./components/Popup/Popup"
import AuthProvider from "./provider/auth/AuthProvider"
import { useSelector } from "react-redux"
import PopupLogout from "./components/PopupLogout/PopupLogout"

function App() {

	const user = useSelector((state) => state.user.value)

	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{publicRoutes.map((route, index) => {
						const Page = route.component
						const Layout = route.layout
						return (
							<Route key={index} path={route.path} element={
								<Layout>
									<Page />
								</Layout>
							} />
						)
					})}
					{authRoutes.map((route, index) => {
						const Page = route.component
						const Layout = route.layout
						return (
							<Route key={index} path={route.path} element={!user.exist ? (
								<Layout>
									<Page />
								</Layout>
							) : (<Navigate to="/" replace />)} />
						)
					})}
				</Routes>
				{/*  */}
				<Popup />
				<PopupLogout />
				{/*  */}
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
