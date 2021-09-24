import { Avatar, Chip, Stack, Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../ContextoPedido";
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
		mt={1}
	>
		{pedidosAsociadosSap.map(nPed =>
			<Typography variant='button' key={nPed} color={nPed === pedidoAgrupadoSap ? 'secondary' : ''} >
				{/*nPed === pedidoAgrupadoSap && <Typography variant='caption' sx={{ ml: 1 }}>Agrupando » </Typography>*/}
				{nPed}
			</Typography>
		)}
	</Stack>
}


export default memo(InfoPedidosSap)