import React, { useCallback, useEffect, useReducer } from "react";
import { Container, Box, List, Dialog, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import FediCommons from "common/FediCommons";
import BannerCargando from "common/BannerCargando";
import BannerError from "common/BannerError";
import BannerVacio from "common/BannerVacio";
import { EJSON } from "bson";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ControlNavegacionTransmisiones from "componentes/transmision/controlNavegacion/ControlNavegacion";
import LineaNavegadorTransmision from "componentes/transmision/LineaNavegadorTransmision";
import PantallaVisorTransmisionesFedicom3 from "./PVisorTransmisionesFedicom3";
import ResumenFiltrosActivos from "componentes/transmision/controlNavegacion/ResumenFiltrosActivos";

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
/*
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});
*/

export default function PantallaNavegadorTransmisionesFedicom3({ history, /*location,*/ match }) {

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
	const [txIdSeleccionada, _setTxIdSeleccionada] = React.useState(match?.params?.txId);

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

	let mostrarDetalleTransmision = useCallback((e, txid) => {
		if (txid) {
			history.push('/fedicom3/transmisiones/' + txid);
		} else {

			history.push('/fedicom3/transmisiones');
		}
		_setTxIdSeleccionada(txid);
		e?.preventDefault?.();
	}, [history, _setTxIdSeleccionada])

	useEffect(() => {
		const unlisten = history.listen((loc, action) => {
			if (loc.pathname.startsWith('/fedicom3/transmisiones/')) {
				let txId = loc.pathname.split('/')[3];
				_setTxIdSeleccionada(txId);
			} else {
				_setTxIdSeleccionada(null);
			}
		});
		return unlisten;
	}, [history, _setTxIdSeleccionada])

	/* #region  Usar la tecla F3 para volver atrás, como hace SAP */
	/*
	useEffect(() => {
		let teclaPresionada = (e) => {
			if (e.keyCode === 114) { // F3 presionado
				if (history.location.pathname.startsWith('/fedicom3/transmisiones/')) {
					let idTransmision = history.location.pathname.split('/')[3];
					if (idTransmision) {
						mostrarDetalleTransmision(e, null);
					}
				}
			}
		}
		document.addEventListener("keydown", teclaPresionada, false);
		return () => {
			document.removeEventListener("keydown", teclaPresionada, false);
		}
	}, [history, mostrarDetalleTransmision])
	*/
	/* #endregion */


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
						<LineaNavegadorTransmision key={tx._id} tx={tx} vista={vista} mostrarDetalle={mostrarDetalleTransmision} />
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
			onClose={(e) => mostrarDetalleTransmision(e, null)}
		// TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'fixed' }} color="barraSuperior">
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={(e) => mostrarDetalleTransmision(e, null)} >
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