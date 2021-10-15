import { CircularProgress, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import BoxTexto from "./BoxTexto";
import { useContext } from "react";
import ContextoMaestros from "contexto/contextoMaestros";



export default function TextoProgramaFarmacia({ idPrograma }) {

	let { maestroProgramas } = useContext(ContextoMaestros);
	let componentePrograma = <>{idPrograma}</>;

	if (!idPrograma) 		return null;

	if (maestroProgramas.cargando) {
		componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
			{idPrograma}
		</Typography>

	}

	if (maestroProgramas.error) {
		componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
			{idPrograma} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
		</Typography>
	}

	if (maestroProgramas.datos) {
		let datosPrograma = maestroProgramas.datos.find(e => e.id === idPrograma);
		componentePrograma = <>
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datosPrograma.nombre ?? 'Desconocido'}</Typography>
			<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosPrograma.id ?? idPrograma})</Typography>
		</>
	}

	return <BoxTexto titulo="Programa:">
		{componentePrograma}
	</BoxTexto>


}