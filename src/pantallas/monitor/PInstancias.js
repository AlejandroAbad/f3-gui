import { memo, useCallback, useEffect } from "react";
import { Container, LinearProgress } from "@mui/material";
import CuadriculaInstancias from "componentes/monitor/instancias/CuadriculaInstancias";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import useTickTack from "hooks/useTickTack";
import TituloPantalla from "navegacion/TituloPantalla";
import FediCommons from "common/FediCommons";
import useTema from "hooks/useTema";



function PantallaMonitorInstancias() {

	useTema('Estado de instancias Fedicom v3');
	let { getEstadoInstancias } = useApiFedicom();
	let { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	let cargaEstadoInstancias = useCallback(async () => {
		setCargando();
		try {
			let datosInstancias = await getEstadoInstancias();
			if (FediCommons.esRespuestaErroresFedicom(datosInstancias)) setError(datosInstancias)
			else setDatos(datosInstancias);
		} catch (error) {
			setError(error);
		}
	}, [getEstadoInstancias, setCargando, setDatos, setError])

	useEffect(cargaEstadoInstancias, [cargaEstadoInstancias]);
	let tiempoParaRefrescar = useTickTack(cargando, cargaEstadoInstancias, 1000, 10);


	return (
		<Container fixed maxWidth="lg">
			<TituloPantalla titulo="Instancias" />
			<LinearProgress
				variant={cargando ? "indeterminate" : "determinate"}
				value={cargando ? null : Math.min(100, tiempoParaRefrescar + 5)}
				color={cargando ? "secondary" : "primary"}
			/>
			<CuadriculaInstancias cargando={cargando} instancias={datos} errores={error} />
		</Container>
	)
}

export default memo(PantallaMonitorInstancias);






