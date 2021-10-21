import { useContext } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import ContextoMaestros from 'contexto/contextoMaestros';

import BoxTexto from "./BoxTexto";



export default function TextoAlmacen({ codigoAlmacenServicio, almacenesDeRebote, esCodigoAlmacenDesconocido, esCodigoAlmacenSaneado, }) {


	let { maestroAlmacenes } = useContext(ContextoMaestros);


	let componenteNombreAlmacen = <>{codigoAlmacenServicio}</>;

	if (!codigoAlmacenServicio) return null;


	if (maestroAlmacenes.cargando) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
			{codigoAlmacenServicio}
		</Typography>

	}

	if (maestroAlmacenes.error) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
			{codigoAlmacenServicio} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
		</Typography>
	}

	if (maestroAlmacenes.datos) {

		let datosAlmacen = maestroAlmacenes.datos.find(a => a.id === codigoAlmacenServicio)
		if (datosAlmacen) {
			componenteNombreAlmacen = <>
				<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datosAlmacen.nombre ?? 'Desconocido'}</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosAlmacen.id ?? codigoAlmacenServicio})</Typography>
			</>
		}
	}


	return <BoxTexto titulo="Almacén:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>
			{componenteNombreAlmacen}
		</Typography>

		{
			(almacenesDeRebote?.length > 0) && <Typography component="div" variant="body2">
				Rebote por: <Stack divider=", " sx={{ display: 'inline', ml: 1 }}>
					{almacenesDeRebote.map(almacenRebote => <Typography key={almacenRebote} variant="caption" component="span">{almacenRebote}</Typography>)}
				</Stack>
			</Typography>
		}


	</BoxTexto>






}