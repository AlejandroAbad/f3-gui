import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useContext, useEffect } from "react";
import InfoAutenticacion from "./componentes/conexion/InfoAutenticacion";
import InfoBalanceador from "./componentes/conexion/InfoBalanceador";
import InfoConcentrador from "./componentes/conexion/InfoConcentrador";
import InfoIp from "./componentes/conexion/InfoIp";
import InfoPrograma from "./componentes/conexion/InfoPrograma";
import InfoSSL from "./componentes/conexion/InfoSSL";
import ContextoPedido from "./ContextoPedido";

const TextoItem = (props) => <Typography sx={{ mt: 2, mb: 0 }} variant='caption' component="div">{props.children}</Typography>


const BoxDatosTransmision = () => {

	let { pedido } = useContext(ContextoPedido);


	let { consultaTransmision } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga()

	let cargarDatosTransmision = useCallback(async () => {
		let txId = pedido.nodoPrimigenio.id;
		setCargando(true);
		try {
			let datos = await consultaTransmision(txId)
			if (datos?._id) setDatos(datos);
			else setError(datos);
		} catch (error) {
			setError(error);
		}
	}, [pedido, consultaTransmision, setCargando, setDatos, setError])

	useEffect(cargarDatosTransmision, [cargarDatosTransmision])


	let contenido = null;

	if (cargando) {
		contenido = <BannerCargando />
	} else if (error) {
		contenido = <BannerError errores={error} mostrarCodigosError={false} />
	} else if (!datos) {
		contenido = <BannerVacio />
	} else {
		let metadatosConexion = datos.conexion.metadatos;
		contenido = (<>
			<TextoItem>IP origen</TextoItem>
			<InfoIp ip={metadatosConexion.ip} />

			<TextoItem>Ordenante</TextoItem>
			<InfoAutenticacion autenticacion={metadatosConexion.autenticacion} />

			<TextoItem>Programa de farmacia</TextoItem>
			<InfoPrograma programa={12} />

			<TextoItem>Seguridad</TextoItem>
			<InfoSSL ssl={metadatosConexion.ssl} />

			<TextoItem>Balanceador</TextoItem>
			<InfoBalanceador balanceador={metadatosConexion.balanceador} />

			<TextoItem>Concentrador</TextoItem>
			<InfoConcentrador concentrador={metadatosConexion.concentrador} />
		</>)
	}


	return <Box>
		<Paper elevation={10} sx={{ py: 2, px: 2 }} >
			<Typography variant='h6' component="h2">Datos de conexión</Typography>
			{contenido}
		</Paper>


	</Box>
}

export default BoxDatosTransmision;