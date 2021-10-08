import { Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";




const InfoNumeroPedidoOrigen =  () => {
	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros

	return <Typography variant="button">
		{cabeceraPedido.numeroPedidoOrigen}
	</Typography>

}


export default memo(InfoNumeroPedidoOrigen)