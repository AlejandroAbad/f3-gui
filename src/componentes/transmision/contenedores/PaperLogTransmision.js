import { Paper, Typography } from "@mui/material";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import FediCommons from "common/FediCommons";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { memo, useCallback, useEffect } from "react"
import LineaLogTransmision from "../log/LineaLogTransmision";



const PaperLogTransmision = ({ idTransmision }) => {

	const { consultaTransmision } = useApiFedicom();
	const { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	const obtenerLogTransmision = useCallback(async () => {
		setCargando(true);
		try {
			let resultado = await consultaTransmision(idTransmision, 'logs');
			if (FediCommons.esRespuestaErroresFedicom(resultado)) {
				setError(resultado)
			} else {
				setDatos(resultado);
			}
		} catch (excepcion) {
			setError(excepcion);
		}
	}, [idTransmision, consultaTransmision, setDatos, setError, setCargando])

	useEffect(obtenerLogTransmision, [obtenerLogTransmision]);


	if (cargando) return <BannerCargando titulo="Obteniendo log de la transmisión" />
	if (error) return <BannerError titulo="Obteniendo log de la transmisión" errores={error} />
	if (!datos?.length) return <BannerVacio titulo="No hay logs para la transmisión" />

	let primeraFecha = new Date(datos[0].fecha);

	if (isNaN(primeraFecha)) primeraFecha = new Date();

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Log de transmisión</Typography>
		{datos.map((lineaLog, i) => <LineaLogTransmision key={i} lineaLog={lineaLog} />)}
	</Paper>
}



export default memo(PaperLogTransmision);