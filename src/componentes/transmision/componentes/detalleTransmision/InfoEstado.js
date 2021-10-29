import { Chip, CircularProgress } from "@mui/material";
import ContextoMaestros from "contexto/contextoMaestros";

import {  useContext } from "react";


import BoxInfo from "./BoxInfo";



export default function InfoEstado({ codigoEstado}) {

	let { maestroEstados } = useContext(ContextoMaestros);
	if (codigoEstado !== 0 && !codigoEstado) return null;

	let eleEstado = <Chip
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`TIPO ${codigoEstado}`}
	/>

	if (maestroEstados.cargando) {
		eleEstado = <Chip
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={14} color="secondary" />}
			label={`TIPO ${codigoEstado}`}
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