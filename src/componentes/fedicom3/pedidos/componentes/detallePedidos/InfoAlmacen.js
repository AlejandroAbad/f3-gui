import { Chip, Stack, Typography } from "@mui/material";
import { memo, useContext } from "react"

import ContextoPedido from "../../ContextoPedido";


const InfoAlmacen = () => {

	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros
	return <>
		<Typography component="span" sx={{ fontWeight: 'bold' }}>{cabeceraPedido.codigoAlmacenServicio}</Typography> - <Typography component="span">Alicante</Typography>
		<Stack direction="row" spacing={1}>
			{cabeceraPedido.codigoAlmacenDesconocido && <Chip size="small" label="Almacén desconocido" color='warning' variant="outlined" />}
			{cabeceraPedido.codigoAlmacenSaneado && <Chip size="small" label="Código convertido" color="info" variant="outlined" />}
			{cabeceraPedido.reboteFaltas && <Chip size="small" label="Rebote de faltas" color="info" variant="outlined" />}
		</Stack>
	</>
}


export default memo(InfoAlmacen);