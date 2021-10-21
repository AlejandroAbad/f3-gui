import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";



export default function useMaestro(tipoMaestro) {

	let { consultaMaestro } = useApiFedicom();
	let { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	let cargarMaestro = useCallback(async () => {

		if (datos || cargando) return;

		setCargando();
		try {
			let resultado = await consultaMaestro(tipoMaestro)
			if (resultado?.length) {
				setDatos(resultado);
				return;
			} else {
				console.group(`Resultado vacío al cargar el maestro ${tipoMaestro}`);
				console.error(resultado);
				setError(resultado);
			}
		} catch (error) {
			console.error(`Error al cargar el maestro ${tipoMaestro}`);
			console.error(error);
			setError(error);
		}
		console.groupEnd();
		console.warn(`Se reintenta la carga del maestro ${tipoMaestro} en 5 segs`);

		setTimeout(cargarMaestro, 5000);

	}, [tipoMaestro, cargando, datos, setCargando, setDatos, setError, consultaMaestro])

	useEffect(cargarMaestro, [cargarMaestro])

	return { datos, error, cargando };

}

