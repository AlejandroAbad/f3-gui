import { Avatar, Chip, Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";

const InfoPedidoOrigen = () => {

	let { pedido } = useContext(ContextoPedido);

	let { numeroPedidoOrigen } = pedido;

	if (!numeroPedidoOrigen) return null
	return <BoxInfo titulo="Pedido Origen:">
		<Typography component="div" variant="body1" sx={{ color: 'text.secondary' }} >{numeroPedidoOrigen}</Typography>
	</BoxInfo>
}


export default memo(InfoPedidoOrigen)