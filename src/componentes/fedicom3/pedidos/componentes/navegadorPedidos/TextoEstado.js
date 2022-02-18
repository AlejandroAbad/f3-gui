import { Avatar, Chip, CircularProgress, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useContext } from "react";
import BoxTexto from "./BoxTexto";

import ContextoMaestros from "contexto/contextoMaestros";

function TextoEstadoCompacto({ codigoEstado }) {
	let { maestroEstados } = useContext(ContextoMaestros);
	if (!codigoEstado) return null;



	if (maestroEstados.cargando) {
		return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
			<CircularProgress size={10} color="secondary" /> {codigoEstado}
		</Typography>
	}

	if (maestroEstados.error) {
		return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }} >
			<ErrorIcon sx={{ color: 'secondary.main', height: 14 }} />
			{codigoEstado}
		</Typography>
	}

	if (maestroEstados.datos) {

		let datosEstado = maestroEstados.datos.find(e => e.id === codigoEstado);
		if (datosEstado) {

			return <Typography sx={{ fontWeight: 'bold', color: `${datosEstado.color}.main`, fontFamily: 'monospace' }} >
				{datosEstado.nombre}
			</Typography >
		}
	}

	return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}		>
		{codigoEstado}
	</Typography>


}

export default function TextoEstado({ codigoEstado, compacto }) {

	let { maestroEstados } = useContext(ContextoMaestros);
	if (!codigoEstado) return null;

	if (compacto) return <TextoEstadoCompacto codigoEstado={codigoEstado} />

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

		let datosEstado = maestroEstados.datos.find(e => e.id === codigoEstado);
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