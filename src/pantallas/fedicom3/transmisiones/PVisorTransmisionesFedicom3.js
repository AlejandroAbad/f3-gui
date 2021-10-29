import { Container, Grid } from "@mui/material";
import PaperDatosTransmision from "componentes/transmision/contenedores/PaperDatosTransmision";
import PaperHttpTransmision from "componentes/transmision/contenedores/PaperHttpTransmision";
import PaperLogTransmision from "componentes/transmision/contenedores/PaperLogTransmision";
import FediCommons from "common/FediCommons";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";
import BannerError from "common/BannerError";
import BannerCargando from "common/BannerCargando";
import PaperTransmisionCrudo from "componentes/transmision/contenedores/PaperTransmisionCrudo";


export default function PantallaVisorTransmisionesFedicom3({ ...props }) {

	let idTransmision = props?.idTransmision || props?.match?.params?.idTransmision;

	const { consultaTransmision } = useApiFedicom();
	const { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	const obtenerDatosTransmision = useCallback(async () => {
		if (!idTransmision) return;
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
	}, [idTransmision, consultaTransmision, setDatos, setError, setCargando])

	useEffect(obtenerDatosTransmision, [obtenerDatosTransmision]);

	let contenido = null;

	if (error) {
		contenido = <BannerError errores={error} titulo="" onRecargar={obtenerDatosTransmision} />
	} else if (cargando || !datos) {
		contenido = <BannerCargando texto="Cargando datos de la transmisión ..." />
	} else {
		contenido = (<Grid container>
			<Grid item xs={12}>
				<PaperDatosTransmision transmision={datos} />
			</Grid>
			<Grid item xs={12} sx={{ my: 3 }}>
				<PaperHttpTransmision transmision={datos} />
			</Grid>
			<Grid item xs={12}>
				<PaperLogTransmision idTransmision={datos._id} />
			</Grid>
			<Grid item xs={12}>
				<PaperTransmisionCrudo transmision={datos} />
			</Grid>
		</Grid>)
	}

	return (
		<Container fixed maxWidth="xl">
			{contenido}
		</Container>
	)

}