import { createTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

const TEMAS = {
	default: {
		nombre: 'default',
		...createTheme({
			palette: {
				barraSuperior: {
					main: '#0C39A6',
					contrastText: '#FAFAFA'
				},
				primary: {
					main: '#0C39A6'
				},
				secondary: {
					main: '#9971FF'
				}
			}
		})
	},
	transmisiones: {
		nombre: 'transmisiones',
		...createTheme({
			palette: {
				barraSuperior: {
					main: '#FFAB00',
				},
				primary: {
					main: '#0C39A6'
				},
				secondary: {
					main: '#9971FF'
				}
			}
		})
	},
}


function ContextoTema() {
	const [tema, _setTema] = useState(TEMAS.default);
	const [tituloPantalla, setTituloPantalla] = useState("");

	const setTema = useCallback((nombreTema) => {
		if (nombreTema && TEMAS[nombreTema]) {
			_setTema(TEMAS[nombreTema]);
		} else {
			_setTema(TEMAS.default);
		}
	}, [_setTema])

	return { tema, setTema, tituloPantalla, setTituloPantalla };
}



export default ContextoTema;