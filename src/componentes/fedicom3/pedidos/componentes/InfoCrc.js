import { Avatar, Chip, Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../ContextoPedido";

const InfoCrc = () => {

	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros

	let crcSap = cabeceraPedido.crcSap.toString(16).toUpperCase()
	let crc = cabeceraPedido.crc.toUpperCase();
	let tipoCrc = cabeceraPedido.tipoCrc.charAt(0).toUpperCase()

	return <>
		<Typography component="div" sx={{ fontWeight: 'bold' }}>{crcSap}</Typography>
		<Chip avatar={<Avatar>{tipoCrc}</Avatar>} label={crc} color='primary' variant="outlined" />
	</>
}

export default memo(InfoCrc)