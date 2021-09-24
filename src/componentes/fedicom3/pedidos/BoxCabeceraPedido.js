import { Card, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react"
import InfoAlmacen from "./componentes/InfoAlmacen";
import InfoCliente from "./componentes/InfoCliente";
import InfoCrc from "./componentes/InfoCrc";
import InfoNumeroPedidoOrigen from "./componentes/InfoNumeroPedidoOrigen";

import InfoPedidosSap from "./componentes/InfoPedidosSap";
import InfoTipoPedido from "./componentes/InfoTipoPedido";
import InfoTotales from "./componentes/InfoTotales";
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