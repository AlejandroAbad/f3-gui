import FediCommons from "common/FediCommons";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";
import useInterval from "./useInterval";



export default function useMaestro(tipoMaestro) {

	let { consultaMaestro } = useApiFedicom();
	let { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	
	let cargarMaestro = useCallback(async () => {

		if (datos || cargando) return;

		setCargando();
		try {
			let resultado = await consultaMaestro(tipoMaestro)
			if (!resultado?.length || FediCommons.esRespuestaErroresFedicom(resultado)) {
				console.error(`Error al cargar el maestro ${tipoMaestro}`);
				console.error(resultado);
				setError(resultado);
			}
			else {
				setDatos(resultado);
				return;
			}
		} catch (error) {
			console.error(`Error al cargar el maestro ${tipoMaestro}`);
			console.error(error);
			setError(error);
		}
		
		//console.warn(`Se reintenta la carga del maestro ${tipoMaestro} en 5 segs`);
		// setTimeout(refCargarMaestro.current, 5000);

	}, [tipoMaestro, cargando, datos, setCargando, setDatos, setError, consultaMaestro])

	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(cargarMaestro, [])
	useInterval(cargarMaestro, 5000);

	return { datos, error, cargando };

}

