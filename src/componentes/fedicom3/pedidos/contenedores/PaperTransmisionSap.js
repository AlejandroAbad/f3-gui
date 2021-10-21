import { Paper, Typography } from "@mui/material";
import BoxTransmisionHttp from "componentes/transmision/http/BoxTransmisionHttp";
import { memo, useContext } from "react";
import ContextoPedido from "../ContextoPedido";



const PaperTransmisionSap = () => {

	const { pedido } = useContext(ContextoPedido);
	if (!pedido) return null;
	
	let  metadatos  = pedido.transmisionSap;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación con SAP</Typography>
		<BoxTransmisionHttp metadatos={metadatos} />
	</Paper>

}



export default memo(PaperTransmisionSap);