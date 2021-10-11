import { Container } from "@mui/material";
import { Box } from "@mui/system";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import FediCommons from "common/FediCommons";
import GridDatosPedido from "componentes/fedicom3/pedidos/GridDatosPedido";
import ModeloPedido from "componentes/fedicom3/pedidos/ModeloPedido";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useCallback, useEffect } from "react";
import ReactJson from "react-json-view";

import { ProveedorContextoPedido } from 'componentes/fedicom3/pedidos/ContextoPedido';

export default function PantallaNavegadorPedidosFedicom3({ ...props }) {

	let numeroPedido = props?.match?.params?.idPedido;
	let { consultaPedido } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();
	let obtenerDatosPedido = useCallback(async () => {

		if (cargando) return;

		setCargando(true);
		try {
			let respuesta = await consultaPedido(numeroPedido);
			if (FediCommons.esRespuestaErroresFedicom(respuesta)) {
				setError(respuesta);
			} else if (respuesta.length === 0) {
				setError('No se ha encontrado el pedido solicitado');
			} else {
				setDatos(respuesta);
			}
		} catch (excepcion) {
			setError(excepcion);
		}
	}, [cargando, numeroPedido, consultaPedido, setCargando, setDatos, setError]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(obtenerDatosPedido, []);

	let contenido = null;

	if (error) {
		contenido = <BannerError errores={error} titulo="" onRecargar={obtenerDatosPedido} />
	} else if (cargando || !datos) {
		contenido = <BannerCargando texto="Cargando datos del pedido ..." />
	} else {
		let pedido = new ModeloPedido(datos);
		contenido = (<ProveedorContextoPedido>
			<GridDatosPedido p={pedido} />
		</ProveedorContextoPedido>)
	}


	return (
		<Container fixed maxWidth="xl">
			{contenido}
		</Container>
	)

}