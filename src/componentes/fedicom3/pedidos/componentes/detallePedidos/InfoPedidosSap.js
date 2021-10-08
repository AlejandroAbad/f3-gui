import { Avatar, Chip, Stack, Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";
import InfoIcon from "@mui/icons-material/Info"

const InfoPedidosSap = () => {

	let { pedido } = useContext(ContextoPedido);
	let cabeceraPedido = pedido.datosMaestros

	let { pedidosAsociadosSap, pedidoAgrupadoSap } = cabeceraPedido;
	

	if (!pedidosAsociadosSap?.length) {
		return <>
			<Chip avatar={<Avatar ><InfoIcon sx={{ color: 'error.main' }} /></Avatar>} label='Sin número de pedido' color='error' variant="outlined" size="small" />
		</>
	}

	return <Stack
		divider={<Typography variant='button' sx={{ mr: 0.5 }}>,</Typography>}
		direction="row"
		justifyContent="flex-start"
		alignItems="flex-end"
		flexWrap="wrap"
		spacing={0}
	>
		{pedidosAsociadosSap.map(nPed =>
			<Typography component="span" variant='button' key={nPed} color={pedidosAsociadosSap.length > 1 && nPed === pedidoAgrupadoSap ? 'secondary' : ''} >
				{nPed}
			</Typography>
		)}
	</Stack>
}


export default memo(InfoPedidosSap)