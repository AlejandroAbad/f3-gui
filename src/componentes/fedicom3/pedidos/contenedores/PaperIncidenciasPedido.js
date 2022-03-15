import { Alert, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useContext } from "react"
import ContextoPedido from "../ContextoPedido";

const PaperIncidenciasPedido = () => {

	let { pedido } = useContext(ContextoPedido);
	let incidencias = pedido.incidenciasCliente;

	if (!incidencias || !incidencias.length) return null;

	let eleIncidencias = incidencias.map(i => {
		let severity = 'info'
		if (i.codigo.startsWith('PED-ERR') && i.codigo !== 'PED-ERR-008') severity = 'error'
		if (i.codigo.startsWith('PED-WARN')) severity = 'warning'

		return <Alert severity={severity}>
			<strong>{i.codigo}</strong>: {i.descripcion}
		</Alert>
	});



	return <Box>
		<Paper elevation={10} sx={{ px: 4, py: 2 }}>
			<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Incidencias en cabecera:</Typography>
			{eleIncidencias}
		</Paper>
	</Box>
}

export default memo(PaperIncidenciasPedido);