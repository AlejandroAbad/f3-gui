import { Chip, CircularProgress } from "@mui/material";
import ContextoMaestros from "contexto/contextoMaestros";

import {  useContext } from "react";


import BoxInfo from "./BoxInfo";



export default function InfoTipo({ codigoTipo}) {

	let { maestroTipos } = useContext(ContextoMaestros);
	if (codigoTipo !== 0 && !codigoTipo) return null;

	let eleTipo = <Chip
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`TIPO ${codigoTipo}`}
	/>

	if (maestroTipos.cargando) {
		eleTipo = <Chip
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={14} color="secondary" />}
			label={`TIPO ${codigoTipo}`}
		/>
	}

	if (maestroTipos.datos) {
		let datosTipo = maestroTipos.datos.find(e => e.codigo === codigoTipo);
		if (datosTipo) {
			eleTipo = <Chip
				color={datosTipo.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosTipo.nombre}
			/>
		}
	}

	return <BoxInfo titulo="Tipo:">
		{eleTipo}
	</BoxInfo>


}