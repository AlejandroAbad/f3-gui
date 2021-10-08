import { Card, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react"
import InfoAlmacen from "./componentes/detallePedidos/InfoAlmacen";
import InfoCliente from "./componentes/detallePedidos/InfoCliente";
import InfoCrc from "./componentes/detallePedidos/InfoCrc";
import InfoNumeroPedidoOrigen from "./componentes/detallePedidos/InfoNumeroPedidoOrigen";
import InfoPedidosSap from "./componentes/detallePedidos/InfoPedidosSap";
import InfoTipoPedido from "./componentes/detallePedidos/InfoTipoPedido";
import InfoTotales from "./componentes/detallePedidos/InfoTotales";
// import ContextoPedido from "./ContextoPedido";


const TheBox = ({ titulo, children }) => {

	return <Grid item xs={12} >
		<Card sx={{ m: 1, py: 1, px: 2 }} >
			<Typography variant='caption'>{titulo}</Typography>
			<Box>
				{children}
			</Box>
		</Card>
	</Grid>
}

const BoxCabeceraPedido = () => {

	// let { pedido } = useContext(ContextoPedido);

	return <Box>
		<Paper elevation={10} sx={{ p: 1 }}>
			<Typography sx={{ px: 2 }} variant='h6' component="h2">Datos de cabecera</Typography>
			<Grid container>
				<Grid item xs={4}>
					<Grid container>
						<TheBox titulo='Cliente'><InfoCliente /></TheBox>
						<TheBox titulo='Almacén'><InfoAlmacen /></TheBox>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<TheBox titulo='CRC'><InfoCrc /></TheBox>
						<TheBox titulo='Números pedido SAP'><InfoPedidosSap /></TheBox>
						<TheBox titulo='Número pedido origen'><InfoNumeroPedidoOrigen /></TheBox>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<TheBox titulo='Tipo de pedido'><InfoTipoPedido /></TheBox>
						<TheBox titulo='Resumen de posiciones'><InfoTotales /></TheBox>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	</Box>
}

export default memo(BoxCabeceraPedido);