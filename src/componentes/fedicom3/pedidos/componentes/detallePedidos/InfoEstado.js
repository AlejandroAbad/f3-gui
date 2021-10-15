import { Chip, CircularProgress } from "@mui/material";
import ContextoMaestros from "contexto/contextoMaestros";
import ContextoPedido from "../../ContextoPedido";

import {  useContext } from "react";


import BoxInfo from "./BoxInfo";



export default function InfoEstado() {

	let { pedido } = useContext(ContextoPedido);
	let { maestroEstados } = useContext(ContextoMaestros);
	let codigoEstado = pedido.estado;

	if (!codigoEstado) return null;

	let eleEstado = <Chip
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`ESTADO ${codigoEstado}`}
	/>

	if (maestroEstados.cargando) {
		eleEstado = <Chip
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={14} color="secondary" />}
			label={`ESTADO ${codigoEstado}`}
		/>
	}

	if (maestroEstados.datos) {
		let datosEstado = maestroEstados.datos.find(e => e.codigo === codigoEstado);
		if (datosEstado) {
			eleEstado = <Chip
				color={datosEstado.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosEstado.nombre}
			/>
		}
	}

	return <BoxInfo titulo="Estado:">
		{eleEstado}
	</BoxInfo>


}