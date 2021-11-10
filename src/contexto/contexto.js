import { ThemeProvider } from '@mui/material/styles';
import React, { createContext } from 'react';
import ContextoAutenticacion from './contextoAutenticacion';
import ContextoTema from './contextoTema';

const ContextoAplicacion = createContext(null);

const { Provider } = ContextoAplicacion;

const ProveedorContextoAplicacion = ({ children }) => {

	let contextoAutenticacion = ContextoAutenticacion();
	let contextoTema = ContextoTema();

	let contexto = {
		...contextoAutenticacion,
		...contextoTema
	}

	return <Provider value={contexto}>
		<ThemeProvider theme={contextoTema.tema}>
			{children}
		</ThemeProvider>
	</Provider>;
};

export { ContextoAplicacion, ProveedorContextoAplicacion };
export default ContextoAplicacion;