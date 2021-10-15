
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


ReactDOM.render(
	<ThemeProvider theme={theme}>
		<ProveedorContextoAplicacion>
			<ProveedorContextoMaestros>
				<App />
			</ProveedorContextoMaestros>
		</ProveedorContextoAplicacion>
	</ThemeProvider>
	,
	document.getElementById('root')
);
