import { Avatar, Chip, CircularProgress, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";
import BoxTexto from "./BoxTexto";



export default function TextoEstado({ codigoEstado }) {


	let { consultaMaestro } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();

	let cargarMaestroEstado = useCallback(async () => {

		if (codigoEstado === null || codigoEstado === undefined) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('estados', codigoEstado)
			if (resultado?.codigo) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}

	}, [codigoEstado, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarMaestroEstado, [cargarMaestroEstado])

	let componenteEstado = <>{codigoEstado}</>;

	if (!codigoEstado) {
		return null;
		// componentePrograma = <Typography component="span" variant="subtitle2" sx={{ color: 'warning.main', fontWeight: 'bold' }}>N/D</Typography>
	}

	if (cargando) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={10} color="secondary" />}
			label={`${codigoEstado} - Cargando`}
		/>
	}

	if (error) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<Avatar sx={{ bgcolor: 'transparent' }}><ErrorIcon sx={{ color: 'warning.main' }} /></Avatar>}
			label={`${codigoEstado}`}
		/>
	}

	if (datos) {
		componenteEstado = <>
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datos.nombre ?? 'Desconocido'}</Typography>
			<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datos.id ?? codigoEstado})</Typography>
		</>

		componenteEstado = <Chip
			size="small"
			color={datos.color}
			sx={{ fontWeight: 'bold', px: 1 }}
			label={datos.nombre}
		/>
	}

	return <BoxTexto titulo="Estado:">
		{componenteEstado}
	</BoxTexto>


}