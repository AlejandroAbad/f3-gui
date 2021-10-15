import { Paper, Table, TableBody, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";
import InfoLineaPedido from "./InfoLineaPedido";




const BoxLineasPedido = () => {

	let { pedido } = useContext(ContextoPedido);

	let lineas = pedido.lineas;

	return <Box>
		<Paper elevation={10} sx={{ p: 1, pt: 3, pb: 2 }}>
			<Typography sx={{ px: 2 }} variant='h5' component="h2">Posiciones</Typography>
			<Table aria-label="collapsible table">
				<TableBody>
					{lineas.map((linea) => (
						<InfoLineaPedido key={linea.orden} linea={linea} almacenOriginal={pedido.codigoAlmacenServicio} />
					))}
				</TableBody>
			</Table>
		</Paper>
	</Box>
}

export default memo(BoxLineasPedido);