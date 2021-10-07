import { useCallback, useEffect } from "react";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { CircularProgress, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';


import BoxTexto from "./BoxTexto";



export default function TextoAlmacen({ codigoAlmancenServicio,	almacenesDeRebote,	esCodigoAlmacenDesconocido,	esCodigoAlmacenSaneado,}) {


	let { consultaMaestro } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();


	let cargarDatosPrograma = useCallback(async () => {

		if (!codigoAlmancenServicio) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('almacenes', codigoAlmancenServicio)
			if (resultado?.id) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}

	}, [codigoAlmancenServicio, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarDatosPrograma, [cargarDatosPrograma])


	let componenteNombreAlmacen = <>{codigoAlmancenServicio}</>;

	if (!codigoAlmancenServicio) {
		return null;
		// componentePrograma = <Typography component="span" variant="subtitle2" sx={{ color: 'warning.main', fontWeight: 'bold' }}>N/D</Typography>
	}

	if (cargando) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
			{codigoAlmancenServicio}
		</Typography>

	}

	if (error) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
			{codigoAlmancenServicio} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
		</Typography>
	}

	if (datos) {
		componenteNombreAlmacen = <>
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datos.nombre ?? 'Desconocido'}</Typography>
			<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datos.id ?? codigoAlmancenServicio})</Typography>
		</>
	}



	if (!codigoAlmancenServicio) return null;
	return <BoxTexto titulo="Almacén:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>
			{componenteNombreAlmacen}
			<Stack direction="row" sx={{ display: 'inline', ml: 1 }}>
				{esCodigoAlmacenDesconocido && <Typography title="El cliente usó un código de almacén Desconocido" component="span" variant="overline" sx={{ fontWeight: 'bold', color: 'warning.main', fontSize: "14px" }}>D</Typography>}
				{esCodigoAlmacenSaneado && <Typography title="Se hizo una Conversión del tipo del almacén" component="span" variant="overline" sx={{ fontWeight: 'bold', color: 'info.main', fontSize: "14px" }}>C</Typography>}
			</Stack>
		</Typography>

		{
			(almacenesDeRebote?.length > 0) && <Typography component="div" variant="body2">
				Rebote por: <Stack divider=", " sx={{ display: 'inline', ml: 1 }}>
					{almacenesDeRebote.map(almacenRebote => <Typography key={almacenRebote} variant="caption" component="span">{almacenRebote}</Typography>)}
				</Stack>
			</Typography>
		}


	</BoxTexto>






}