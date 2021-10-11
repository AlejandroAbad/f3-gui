import { Chip, CircularProgress } from "@mui/material";

import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useContext, useEffect } from "react";
import ContextoPedido from "../../ContextoPedido";

import BoxInfo from "./BoxInfo";



export default function InfoEstado() {

	let { pedido } = useContext(ContextoPedido);
	let codigoEstado = pedido.estado;

	let { consultaMaestro } = useApiFedicom();
	let { cargando, datos, setCargando, setDatos, setError } = useEstadoCarga();

	let cargarMaestroEstado = useCallback(async () => {

		if (codigoEstado === null || codigoEstado === undefined) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('estados', codigoEstado)
			if (resultado?.codigo) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}

	}, [codigoEstado, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarMaestroEstado, [cargarMaestroEstado])

	if (!codigoEstado) return null;

	let eleEstado = <Chip
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`ESTADO ${codigoEstado}`}
	/>

	if (cargando) {
		eleEstado = <Chip
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={14} color="secondary" />}
			label={`ESTADO ${codigoEstado}`}
		/>
	}

	if (datos) {
		eleEstado = <Chip
			color={datos.color}
			sx={{ fontWeight: 'bold', px: 1 }}
			label={datos.nombre}
		/>
	}

	return <BoxInfo titulo="Estado:">
		{eleEstado}
	</BoxInfo>


}