import { memo, useContext, useEffect } from "react"

import { Grid } from '@mui/material';
import BoxHistorialNodos from "./BoxHistorialNodos";
import BoxLineasPedido from "./BoxLineasPedido";
import BoxCabeceraPedido from "./BoxCabeceraPedido";
import TituloPantalla from "navegacion/TituloPantalla";

import { ContextoPedido } from 'componentes/fedicom3/pedidos/ContextoPedido';
import BannerCargando from "common/BannerCargando";
import BoxDatosTransmision from "./BoxDatosTransmision";

const GridDatosPedido = ({ p }) => {

	let { pedido, setPedido } = useContext(ContextoPedido);

	useEffect(() => setPedido(p), [p, setPedido]);
	if (!pedido) return <BannerCargando />;

	return (<>
		<TituloPantalla titulo={`Pedido con CRC ${pedido.datosMaestros.crc}`} />

		<Grid container spacing={2}>
			<Grid item xs={8} xl={9}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<BoxCabeceraPedido />
					</Grid>
					<Grid item xs={12}>
						<BoxLineasPedido />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={4} xl={3} >
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<BoxHistorialNodos />
					</Grid>
					<Grid item xs={12} >
						<BoxDatosTransmision />
					</Grid>
				</Grid>
			</Grid>


		</Grid>
	</>
	)



}


export default memo(GridDatosPedido)