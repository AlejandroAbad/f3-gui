import { Typography } from "@mui/material";
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";

const InfoTipoPedido = () => {

	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros

	return <Typography component="div" sx={{ fontWeight: 'bold' }}>{cabeceraPedido.tipoPedido}</Typography>;
}

export default memo(InfoTipoPedido)