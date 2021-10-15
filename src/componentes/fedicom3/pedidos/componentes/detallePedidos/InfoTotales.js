import { Typography } from "@mui/material";
import { memo, useContext } from "react"

import ContextoPedido from "../../ContextoPedido";
import BoxTexto from "../navegadorPedidos/BoxTexto";
import { Box } from "@mui/system";


const InfoTotales = () => {

	let { pedido } = useContext(ContextoPedido);
	let totales = pedido.totales || {}

	return <BoxTexto titulo="Totales:">
		<Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Unidades:</Typography>
			<Typography variant="subtitle2" component="span" color={totales.cantidad === totales.cantidadIncidencias ? 'error' : 'success'}>{totales.cantidad - totales.cantidadIncidencias} servida{totales.cantidad - totales.cantidadIncidencias === 1 ? '' : 's'}</Typography>
			{totales.cantidadIncidencias > 0 && <Typography variant="subtitle2" component="span" color={totales.cantidadIncidencias ? 'error' : 'success'}> + {totales.cantidadIncidencias} en falta</Typography>}
		</Box>

		<Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Líneas:</Typography>
			<Typography variant="subtitle2" component="span" color={totales.lineas === totales.lineasIncidencias ? 'error' : 'success'}>{totales.lineas - totales.lineasIncidencias} servida{totales.lineas - totales.lineasIncidencias === 1 ? '' : 's'}</Typography>
			{totales.lineasIncidencias > 0 && <Typography variant="subtitle2" component="span" color={totales.lineasIncidencias ? 'error' : 'success'}> + {totales.lineasIncidencias} en falta</Typography>}
		</Box>

		{totales.cantidadEstupe > 0 && <Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Estupes:</Typography>
			<Typography variant="subtitle2" component="span" >{totales.cantidadEstupe} unidad{totales.cantidadEstupe === 1 ? '' : 'es'} en {totales.lineasEstupe} línea{totales.lineasEstupe === 1 ? '' : 's'}</Typography>
		</Box>}


	</BoxTexto >
}


export default memo(InfoTotales);