import React, { useCallback, useEffect, useReducer } from "react";
import { Container, Box, List, Paper, } from "@mui/material";
import TituloPantalla from "navegacion/TituloPantalla";


import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import FediCommons from "common/FediCommons";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import ControlNavegacionPedidos from "componentes/fedicom3/pedidos/controlNavegacion/ControlNavegacion";
import LineaNavegadorPedido from "componentes/fedicom3/pedidos/LineaNavegadorPedido";
import { EJSON } from "bson";
import ReactJson from "react-json-view";

const PROYECCION = { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 }

function reducer(state, action) {
	switch (action.type) {
		case 'filtro':
			return { ...state, skip: 0, filtro: action.value, };
		case 'skip':
			return { ...state, skip: action.value, };
		case 'limite':
			return { ...state, skip: 0, limite: action.value };
		case 'vista':
			return { ...state, vista: action.value };
		default:
			throw new Error();
	}
}

export default function PantallaNavegadorPedidosFedicom3() {


	const [consulta, cambiaConsulta] = useReducer(reducer, {
		filtro: {},
		proyeccion: { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 },
		orden: { fechaCreacion: -1 },
		skip: 0,
		limite: 50,
		vista: 'extendido'
	})
	let { filtro, /*proyeccion, orden,*/ skip, limite, vista } = consulta;

	// Llamada API
	const { listadoPedidos } = useApiFedicom();
	const { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();
	const refrescarListadoPedidos = useCallback(async () => {
		setCargando(true);
		try {
			let filtroEjson = EJSON.serialize(filtro);

			let resultados = await listadoPedidos(filtroEjson, PROYECCION, { fechaCreacion: -1 }, skip, limite);
			if (FediCommons.esRespuestaErroresFedicom(resultados)) {
				setError(resultados);
			} else {
				setDatos(resultados);
			}

		} catch (error) {
			setError(error)
		}
	}, [listadoPedidos, setCargando, setDatos, setError, filtro, skip, limite])

	useEffect(refrescarListadoPedidos, [refrescarListadoPedidos])



	let contenido = null;

	if (cargando) {
		contenido = <BannerCargando />
	} else if (error) {
		contenido = <BannerError errores={error} onRecargar={refrescarListadoPedidos} />
	} else if (!datos?.resultados?.length) {
		contenido = <Box>
			<ControlNavegacionPedidos consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={0} />
			<BannerVacio titulo="No se han encontrado pedidos" onRecargar={refrescarListadoPedidos} />
		</Box>
	} else {
		contenido = <Box>
			<ControlNavegacionPedidos consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={datos.totalResultados} />


			<Paper elevation={10} sx={{ mt: 2 }} >
				<List >
					{datos.resultados.map(pedido => <LineaNavegadorPedido key={pedido._id} pedido={pedido} vista={vista} />)}
				</List>
			</Paper>
		</Box>
	}



	return (
		<Container fixed maxWidth="xl">
			<TituloPantalla titulo="Pedidos Fedicom v3" />
			<Box sx={{ mt: 6, mb: 4 }}>
				<ReactJson src={filtro} />
			</Box>
			{contenido}

		</Container>
	)

}