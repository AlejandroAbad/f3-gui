import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react"
import InfoAlmacen from "./componentes/detallePedidos/InfoAlmacen";
import InfoCliente from "./componentes/detallePedidos/InfoCliente";
import InfoCrc from "./componentes/detallePedidos/InfoCrc";
import InfoEstado from "./componentes/detallePedidos/InfoEstado";
import InfoPedidoOrigen from "./componentes/detallePedidos/InfoPedidoOrigen";
import InfoPedidosSap from "./componentes/detallePedidos/InfoPedidosSap";
import InfoTipoPedido from "./componentes/detallePedidos/InfoTipoPedido";
import InfoTotales from "./componentes/detallePedidos/InfoTotales";
// import ContextoPedido from "./ContextoPedido";

const BoxCabeceraPedido = () => {

	// let { pedido } = useContext(ContextoPedido);

	return <Box>
		<Paper elevation={10} sx={{ p: 1, pt: 3, pb: 2 }}>
			<Typography sx={{ px: 2 }} variant='h5' component="h2">Datos de cabecera</Typography>
			<Grid container sx={{ mx: 2 }}>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoCliente />
						</Grid>
						<Grid item xs={12}>
							<InfoCrc />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoAlmacen />
						</Grid>
						<Grid item xs={12}>
							<InfoPedidosSap />
						</Grid>
						<Grid item xs={12}>
							<InfoTipoPedido />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoEstado />
						</Grid>
						<Grid item xs={12}>
							<InfoPedidoOrigen />
						</Grid>
						<Grid item xs={12}>
							<InfoTotales />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	</Box>
}

export default memo(BoxCabeceraPedido);