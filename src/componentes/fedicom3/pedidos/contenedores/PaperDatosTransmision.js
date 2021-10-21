import { Paper, Typography } from "@mui/material";
import { useContext } from "react";
import InfoAutenticacion from "../componentes/detallePedidos/InfoAutenticacion";
import InfoBalanceador from "../componentes/detallePedidos/InfoBalanceador";
import InfoIp from "../componentes/detallePedidos/InfoIp";
import InfoProgramaFarmacia from "../componentes/detallePedidos/InfoPrograma";
import InfoSSL from "../componentes/detallePedidos/InfoSSL";

import ContextoPedido from "componentes/fedicom3/pedidos/ContextoPedido";

const PaperDatosTransmision = () => {

	let { pedido } = useContext(ContextoPedido);
	let metadatosConexion = pedido.datosConexion;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
		<Typography variant='h5' component="h2">Datos de la transmisión</Typography>
		<InfoIp ip={metadatosConexion.ip} />
		<InfoAutenticacion autenticacion={metadatosConexion.autenticacion} />
		<InfoProgramaFarmacia idPrograma={metadatosConexion.programa} />
		<InfoSSL ssl={metadatosConexion.ssl} />
		<InfoBalanceador balanceador={metadatosConexion.balanceador} concentrador={metadatosConexion.concentrador} />
	</Paper>

}

export default PaperDatosTransmision;