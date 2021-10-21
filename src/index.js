
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom';
import { ProveedorContextoAplicacion } from './contexto/contexto';
import App from 'App';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ProveedorContextoMaestros } from 'contexto/contextoMaestros';
import { IconContext } from "react-icons";


ReactDOM.render(
	<ThemeProvider theme={theme}>
		<IconContext.Provider value={{ size: '1.5em'}}>
			<ProveedorContextoAplicacion>
				<ProveedorContextoMaestros>
					<App />
				</ProveedorContextoMaestros>
			</ProveedorContextoAplicacion>
		</IconContext.Provider>
	</ThemeProvider>
	,
	document.getElementById('root')
);
