import React, { useCallback, useEffect, useReducer } from "react";
import { Container, Box, List, Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import FediCommons from "common/FediCommons";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import { EJSON } from "bson";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResumenFiltrosActivos from "componentes/transmision/controlNavegacion/ResumenFiltrosActivos";
import ControlNavegacionTransmisiones from "componentes/transmision/controlNavegacion/ControlNavegacion";
import PantallaVisorTransmisionesFedicom3 from "./PVisorTransmisionesFedicom3";
import LineaNavegadorTransmision from "componentes/transmision/LineaNavegadorTransmision";
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

export default function PantallaNavegadorTransmisionesFedicom3(props) {

	useTema('Navegador de transmisiones Fedicom v3', 'transmisiones');

	const [consulta, cambiaConsulta] = useReducer(reducer, {
		filtro: {},
		proyeccion: { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 },
		orden: { fechaCreacion: -1 },
		skip: 0,
		limite: 50,
		vista: 'extendido'
	})
	const { filtro, /*proyeccion, orden,*/ skip, limite, vista } = consulta;
	const [txIdSeleccionada, setTxIdSeleccionada] = React.useState(null);

	// Llamada API
	const { listadoTransmisiones } = useApiFedicom();
	const { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();
	const refrescarListadoTransmisiones = useCallback(async () => {
		setCargando(true);
		try {
			let filtroEjson = EJSON.serialize(filtro);

			let resultados = await listadoTransmisiones(filtroEjson, PROYECCION, { fechaCreacion: -1 }, skip, limite);
			if (FediCommons.esRespuestaErroresFedicom(resultados)) {
				setError(resultados);
			} else {
				setDatos(resultados);
			}

		} catch (error) {
			setError(error)
		}
	}, [listadoTransmisiones, setCargando, setDatos, setError, filtro, skip, limite]);
	useEffect(refrescarListadoTransmisiones, [refrescarListadoTransmisiones]);


	let contenido = null;
	let eleResumenFiltros = <ResumenFiltrosActivos filtros={filtro} />
	if (cargando) {
		contenido = <BannerCargando />
	} else if (error) {
		contenido = <BannerError errores={error} onRecargar={refrescarListadoTransmisiones} />
	} else if (!datos?.resultados?.length) {
		contenido = <Box>
			<ControlNavegacionTransmisiones consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={0} />
			{eleResumenFiltros}
			<BannerVacio titulo="No se han encontrado transmisiones" onRecargar={refrescarListadoTransmisiones} />
		</Box>
	} else {
		contenido = <Box>
			<ControlNavegacionTransmisiones consulta={consulta} cambiaConsulta={cambiaConsulta} totalResultados={datos.totalResultados} />
			<Box sx={{ position: 'sticky', top: '190px' }}>

				{eleResumenFiltros}
				<List sx={{ mt: 2 }} >
					{datos.resultados.map(tx =>
						<LineaNavegadorTransmision key={tx._id} tx={tx} vista={vista} mostrarDetalle={setTxIdSeleccionada} />
					)}
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
			open={Boolean(txIdSeleccionada)}
			onClose={() => setTxIdSeleccionada(null)}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'fixed' }} color="barraSuperior">
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={() => setTxIdSeleccionada(null)} >
						<ArrowBackIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Transmisión con ID {txIdSeleccionada?.toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{ mt: 12 }}>
				<PantallaVisorTransmisionesFedicom3 idTransmision={txIdSeleccionada} />
			</Box>
		</Dialog>
	</>)

}