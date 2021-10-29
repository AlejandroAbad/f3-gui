import { Avatar, Chip, CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useContext } from "react";
import BoxTexto from "./BoxTexto";

import ContextoMaestros from "contexto/contextoMaestros";



export default function TextoEstado({ codigoEstado }) {

	let { maestroEstados } = useContext(ContextoMaestros);
	if (!codigoEstado) return null;

	let componenteEstado = <Chip
		size="small"
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`Estado ${codigoEstado}`}
	/>

	if (maestroEstados.cargando) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={10} color="secondary" />}
			label={`${codigoEstado} - Cargando`}
		/>
	}

	if (maestroEstados.error) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<Avatar sx={{ bgcolor: 'transparent' }}><ErrorIcon sx={{ color: 'warning.main' }} /></Avatar>}
			label={`${codigoEstado}`}
		/>
	}

	if (maestroEstados.datos) {

		let datosEstado = maestroEstados.datos.find(e => e.codigo === codigoEstado);
		if (datosEstado) {
			componenteEstado = <Chip
				size="small"
				color={datosEstado.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosEstado.nombre}
			/>
		}
	}

	return <BoxTexto titulo="Estado:">
		{componenteEstado}
	</BoxTexto>


}