import { Grid, Paper, Typography } from "@mui/material";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import FediCommons from "common/FediCommons";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { memo, useCallback, useEffect } from "react"
import BoxTransmisionHttp from "../http/BoxTransmisionHttp";



const PaperHttpTransmision = ({ idTransmision, transmision }) => {

	const { consultaTransmision } = useApiFedicom();
	const { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	const obtenerDatosTransmision = useCallback(async () => {
		if (transmision) {
			setDatos(transmision)
			return;
		}
		
		setCargando(true);
		try {
			let resultado = await consultaTransmision(idTransmision);
			if (FediCommons.esRespuestaErroresFedicom(resultado)) {
				setError(resultado)
			} else {
				setDatos(resultado);
			}
		} catch (excepcion) {
			setError(excepcion);
		}
	}, [transmision, idTransmision, consultaTransmision, setDatos, setError, setCargando])

	useEffect(obtenerDatosTransmision, [obtenerDatosTransmision]);


	if (cargando) return <BannerCargando titulo="Obteniendo datos de la transmisión" />
	if (error) return <BannerError titulo="Obteniendo datos de la transmisión" errores={error} />
	if (!datos) return <BannerVacio titulo="No hay datos de la conexión" />

	let paperCliente = <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación HTTP</Typography>
		<BoxTransmisionHttp {...{ ...datos.conexion }} />
	</Paper>

	let paperSap = null;
	if (datos.sap) {
		paperSap = <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
			<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación SAP</Typography>
			<BoxTransmisionHttp {...{ ...datos.sap }} />
		</Paper>
	}

	return <Grid container spacing={2} >
		<Grid item xs={12}>{paperCliente}</Grid>
		<Grid item xs={12}>{paperSap}</Grid>
	</Grid>
}



export default memo(PaperHttpTransmision);