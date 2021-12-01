import { Avatar, Chip, CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useContext } from "react";
import BoxTexto from "./BoxTexto";

import ContextoMaestros from "contexto/contextoMaestros";



export default function TextoTipo({ codigoTipo }) {

	let { maestroTipos } = useContext(ContextoMaestros);
	
	if (codigoTipo !== 0 && !codigoTipo) return null;

	let componenteTipo = <Chip
		size="small"
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`Tipo ${codigoTipo}`}
	/>

	if (maestroTipos.cargando) {
		componenteTipo = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={10} color="secondary" />}
			label={`${codigoTipo} - Cargando`}
		/>
	}

	if (maestroTipos.error) {
		componenteTipo = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<Avatar sx={{ bgcolor: 'transparent' }}><ErrorIcon sx={{ color: 'warning.main' }} /></Avatar>}
			label={`${codigoTipo}`}
		/>
	}

	if (maestroTipos.datos) {

		let datosTipo = maestroTipos.datos.find(e => e.id === codigoTipo);
		if (datosTipo) {
			componenteTipo = <Chip
				size="small"
				color={datosTipo.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosTipo.nombre}
			/>
		}
	}

	return <BoxTexto titulo="Tipo:">
		{componenteTipo}
	</BoxTexto>


}