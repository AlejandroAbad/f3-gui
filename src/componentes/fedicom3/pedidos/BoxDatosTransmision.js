import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import InfoAutenticacion from "./componentes/detallePedidos/InfoAutenticacion";
import InfoBalanceador from "./componentes/detallePedidos/InfoBalanceador";
import InfoIp from "./componentes/detallePedidos/InfoIp";
import InfoProgramaFarmacia from "./componentes/detallePedidos/InfoPrograma";
import InfoSSL from "./componentes/detallePedidos/InfoSSL";

import ContextoPedido from "./ContextoPedido";

const BoxDatosTransmision = () => {

	let { pedido } = useContext(ContextoPedido);
	let metadatosConexion = pedido.datosConexion;

	return <Box>
		<Paper elevation={10} sx={{ py: 2, px: 2 }} >
			<Typography  variant='h5' component="h2">Datos del cliente</Typography>
			<InfoIp ip={metadatosConexion.ip} />
			<InfoAutenticacion autenticacion={metadatosConexion.autenticacion} />
			<InfoProgramaFarmacia idPrograma={metadatosConexion.programa} />
			<InfoSSL ssl={metadatosConexion.ssl} />
			<InfoBalanceador balanceador={metadatosConexion.balanceador} concentrador={metadatosConexion.concentrador} />
		</Paper>


	</Box>
}

export default BoxDatosTransmision;