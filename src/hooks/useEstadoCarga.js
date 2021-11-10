import { useCallback, useState } from "react";




function useEstadoCarga() {

	let [estado, setEstado] = useState({
		cargando: false,
		error: null,
		datos: null
	})

	return {
		setCargando: useCallback((reiniciar = false) => {
			if (reiniciar) setEstado({ error: null, datos: null, cargando: true })
			else setEstado(v => { v.cargando = true ; return v })
		}, [setEstado]),
		setDatos: useCallback((datos) => setEstado({ cargando: false, error: null, datos: datos }), [setEstado]),
		setError: useCallback((error) => setEstado({ cargando: false, error: error, datos: null }), [setEstado]),
		cargando:  estado.cargando,
		error: estado.error,
		datos: estado.datos
	}
}

export default useEstadoCarga;