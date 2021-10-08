import { memo, useContext } from "react";

import { Typography } from "@mui/material";
import ContextoPedido from "../../ContextoPedido";


const InfoCliente = () => {
	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros
	return <>
		<Typography component="span" sx={{ fontWeight: 'bold' }}>{cabeceraPedido.codigoCliente}</Typography>{' » '}<Typography component="span">{cabeceraPedido.puntoEntrega}</Typography>
		<Typography component="div" variant='caption'>Código SAP: {cabeceraPedido.clienteSap}</Typography>
	</>
}

export default memo(InfoCliente);
