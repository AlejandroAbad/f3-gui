import { memo, useContext, useEffect, useState } from "react"

import { ContextoPedido } from 'componentes/fedicom3/pedidos/ContextoPedido';

import { Grid, Typography } from '@mui/material';
import PaperHistorialNodos from "./contenedores/PaperHistorialNodos";
import PaperCabeceraPedido from "./contenedores/PaperCabeceraPedido";
import PaperDatosTransmision from "./contenedores/PaperDatosTransmision";
import PaperLineasPedido from "./componentes/lineasPedido/PaperLineasPedido";

import BannerCargando from "common/BannerCargando";
import PaperSeleccionNodo from "./contenedores/PaperSeleccionNodo";
import PaperLogTransmision from "componentes/transmision/contenedores/PaperLogTransmision";
import PaperHttpTransmision from "componentes/transmision/contenedores/PaperHttpTransmision";



const GridDatosPedido = ({ p }) => {

	const { pedido, setPedido } = useContext(ContextoPedido);
	const [idNodoSeleccionado, setIdNodoSeleccionado] = useState();
	useEffect(() => {
		setPedido(p)
		setIdNodoSeleccionado(p.nodos.find(n => n.es.vigente)?.id);
	}, [p, setPedido]);

	if (!pedido) return <BannerCargando />;




	return (<>
		<Grid container spacing={2} sx={{ mb: 5 }}>
			<Grid item xs={8} xl={9}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<PaperCabeceraPedido />
					</Grid>
					<Grid item xs={12}>
						<PaperLineasPedido />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={4} xl={3} >
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<PaperDatosTransmision />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="h4" component="h6" gutterBottom>Datos de transmisión</Typography>
			</Grid>

			<Grid item xs={8}>
				<PaperSeleccionNodo {...{ idNodoSeleccionado, setIdNodoSeleccionado }} />
			</Grid>
			<Grid item xs={4} >
				<PaperHistorialNodos />
			</Grid>

			<Grid item xs={12}>
				<PaperHttpTransmision idTransmision={idNodoSeleccionado} />
			</Grid>

			<Grid item xs={12}>
				<PaperLogTransmision idTransmision={idNodoSeleccionado} />
			</Grid>

		</Grid>
	</>
	)



}


export default memo(GridDatosPedido)