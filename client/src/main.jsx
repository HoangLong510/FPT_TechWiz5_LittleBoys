import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { store } from '~/libs/store.js'
import App from './App.jsx'
import theme from './theme'
import './i18n'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>
)
