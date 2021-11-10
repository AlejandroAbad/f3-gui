import { createTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

const TEMAS = {
	default: {
		nombre: 'default',
		...createTheme({
			palette: {
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
				primary: {
					main: '#ff0000'
				},
				secondary: {
					main: '#00ff00'
				}
			}
		})
	},
}


function ContextoTema() {
	const [tema, _setTema] = useState(TEMAS.default);

	const setTema = useCallback((nombreTema) => {
		if (nombreTema && TEMAS[nombreTema]) {
			_setTema(TEMAS[nombreTema]);
		} else {
			_setTema(TEMAS.default);
		}
	}, [_setTema])

	return { tema, setTema };
}



export default ContextoTema;