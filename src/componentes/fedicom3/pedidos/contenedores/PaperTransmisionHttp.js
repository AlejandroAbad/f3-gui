import { Paper, Typography } from "@mui/material";
//import BoxTransmisionHttp from "componentes/transmision/http/BoxTransmisionHttp";
import { memo, useContext } from "react";
import ContextoPedido from "../ContextoPedido";



const PaperTransmisionHttp = () => {

	const { pedido } = useContext(ContextoPedido);
	if (!pedido) return null;

	let { solicitud, respuesta } = pedido.transmisionHttp;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}><Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación con el cliente</Typography></Typography>
		{/*<BoxTransmisionHttp {...{ solicitud, respuesta, metadatos }} />*/}
	</Paper>

}



export default memo(PaperTransmisionHttp);