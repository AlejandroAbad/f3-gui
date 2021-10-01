import { memo, useCallback, useEffect } from "react";
import { Typography } from "@mui/material";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";



const InfoPrograma = ({ programa }) => {

	let { consultaMaestro } = useApiFedicom();
	let {  datos, setCargando, setDatos, setError } = useEstadoCarga();

	let cargarDatosPrograma = useCallback(async () => {
		if (!programa) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('programas', programa)
			if (resultado?.id) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}
	}, [programa, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarDatosPrograma, [cargarDatosPrograma])

	let contenido = null;
	
	if (!datos?.nombre) {
		contenido = programa;
	} else {
		contenido = <>{datos.nombre} <Typography variant="caption">({datos.id})</Typography></>
	}

	return <>
		<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">
			{contenido}
		</Typography>
	</>
}

export default memo(InfoPrograma);
