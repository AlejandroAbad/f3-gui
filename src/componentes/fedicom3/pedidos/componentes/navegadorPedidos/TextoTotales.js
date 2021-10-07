import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BoxTexto from "./BoxTexto";



export default function TextoTotales({ totales }) {

	if (!totales?.cantidad) return null;

	return <BoxTexto titulo="Totales:">
		<Box>
			<Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Unidades:</Typography>
			<Typography variant="body1" component="span" color={totales.cantidad === totales.cantidadIncidencias ? 'error' : 'success'}>{totales.cantidad - totales.cantidadIncidencias} servida{totales.cantidad - totales.cantidadIncidencias === 1 ? '' : 's'}</Typography>
			{totales.cantidadIncidencias > 0 && <Typography variant="body1" component="span" color={totales.cantidadIncidencias ? 'error' : 'success'}> + {totales.cantidadIncidencias} en falta</Typography>}
		</Box>

		<Box>
			<Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Líneas:</Typography>
			<Typography variant="body1" component="span" color={totales.lineas === totales.lineasIncidencias ? 'error' : 'success'}>{totales.lineas - totales.lineasIncidencias} servida{totales.lineas - totales.lineasIncidencias === 1 ? '' : 's'}</Typography>
			{totales.lineasIncidencias > 0 && <Typography variant="body1" component="span" color={totales.lineasIncidencias ? 'error' : 'success'}> + {totales.lineasIncidencias} en falta</Typography>}
		</Box>

		{totales.cantidadEstupe > 0 && <Box>
			<Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Estupes:</Typography>
			<Typography variant="body1" component="span" >{totales.cantidadEstupe} unidad{totales.cantidadEstupe === 1 ? '' : 'es'} en {totales.lineasEstupe} líneas</Typography>
		</Box>}


	</BoxTexto >



}