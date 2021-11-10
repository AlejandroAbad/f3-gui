import React, { useCallback, useEffect, useReducer } from "react";
import { Container, Box, List, Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import FediCommons from "common/FediCommons";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import ControlNavegacionPedidos from "componentes/fedicom3/pedidos/controlNavegacion/ControlNavegacion";
import LineaNavegadorPedido from "componentes/fedicom3/pedidos/LineaNavegadorPedido";
import { EJSON } from "bson";
import ResumenFiltrosActivos from "componentes/fedicom3/pedidos/controlNavegacion/ResumenFiltrosActivos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PVisorPedidosFedicom3 from './PVisorPedidosFedicom3';
import useTema from "hooks/useTema";

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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

export default function PantallaNavegadorPedidosFedicom3(props) {

	useTema('Navegación de Pedidos Fedicom v3');
	const [consulta, cambiaConsulta] = useReducer(reducer, {
		filtro: {},
		proyeccion: { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 },
		orden: { fechaCreacion: -1 },
		skip: 0,
		limite: 50,
		vista: 'extendido'
	})
	const { filtro, /*proyeccion, orden,*/ skip, limite, vista } = consulta;
	const [idPedidoSeleccionado, setIdPedidoSeleccionado] = React.useState(null);

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
	}, [listadoPedidos, setCargando, setDatos, setError, filtro, skip, limite]);
	useEffect(refrescarListadoPedidos, [refrescarListadoPedidos]);


	let contenido = null;
	let eleResumenFiltros = <ResumenFiltrosActivos filtros={filtro} />
	if (cargando) {
		contenido = <BannerCargando />
	} else if (error) {
		contenido = <BannerError errores={error} onRecargar={refrescarListadoPedidos} />
	} else if (!datos?.resultados?.length) {
		contenido = <Box>
			<ControlNavegacionPedidos consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={0} />
			{eleResumenFiltros}
			<BannerVacio titulo="No se han encontrado pedidos" onRecargar={refrescarListadoPedidos} />
		</Box>
	} else {
		contenido = <Box>
			<ControlNavegacionPedidos consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={datos.totalResultados} />
			<Box sx={{ position: 'sticky', top: '190px' }}>

				{eleResumenFiltros}
				<List sx={{ mt: 2 }} >
					{datos.resultados.map(pedido => <LineaNavegadorPedido key={pedido._id} pedido={pedido} vista={vista} mostrarDetalle={setIdPedidoSeleccionado} />)}
				</List>
			</Box>

		</Box>
	}



	return (<>
		<Container fixed maxWidth="xl">
			{contenido}
		</Container>
		<Dialog
			fullScreen
			scroll='body'
			open={Boolean(idPedidoSeleccionado)}
			onClose={() => setIdPedidoSeleccionado(null)}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'fixed' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={() => setIdPedidoSeleccionado(null)} >
						<ArrowBackIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Pedido {idPedidoSeleccionado?.toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{ mt: 12 }}>
				<PVisorPedidosFedicom3 idPedido={idPedidoSeleccionado} />
			</Box>
		</Dialog>
	</>)

}