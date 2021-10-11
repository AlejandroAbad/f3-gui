import { CircularProgress, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";
import BoxInfo from "./BoxInfo";



export default function InfoProgramaFarmacia({ idPrograma }) {

	let { consultaMaestro } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();

	let cargarDatosPrograma = useCallback(async () => {

		if (!idPrograma) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('programas', idPrograma)
			if (resultado?.id) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}

	}, [idPrograma, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarDatosPrograma, [cargarDatosPrograma])

	let componentePrograma = <>{idPrograma}</>;

	if (!idPrograma) {
		componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1, color: 'warning.main' }}>
			No especificado
		</Typography>
	} else {

		if (cargando) {
			componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
				<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
				{idPrograma}
			</Typography>

		}

		if (error) {
			componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
				{idPrograma} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
			</Typography>
		}

		if (datos) {
			componentePrograma = <>
				<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datos.nombre ?? 'Desconocido'}</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datos.id ?? idPrograma})</Typography>
			</>
		}
	}
	return <BoxInfo titulo="Programa de farmacia:">
		{componentePrograma}
	</BoxInfo>


}