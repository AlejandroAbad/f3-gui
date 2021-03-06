import { useContext } from "react";
import { Chip, CircularProgress, Stack, Typography } from "@mui/material";
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";
import ContextoMaestros from "contexto/contextoMaestros";



export default function InfoAlmacen() {

	let { pedido } = useContext(ContextoPedido);
	let { maestroAlmacenes } = useContext(ContextoMaestros);

	let { codigoAlmacenServicio, almacenesDeRebote, codigoAlmacenDesconocido, codigoAlmacenSaneado } = pedido;

	if (!codigoAlmacenServicio) return null;



	let eleNombreAlmacen = <>{codigoAlmacenServicio}</>;
	let eleAlmacenesDeRebote = null;

	if (maestroAlmacenes.cargando) {
		eleNombreAlmacen = <Typography component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={16} color="secondary" sx={{ mr: 1 }} />
			{codigoAlmacenServicio}
		</Typography>
	}

	if (maestroAlmacenes.error) {
		eleNombreAlmacen = <Typography component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
			{codigoAlmacenServicio}
		</Typography>
	}

	if (maestroAlmacenes.datos) {
		let datosAlmacen = maestroAlmacenes.datos.find(a => a.id === codigoAlmacenServicio)
		if (datosAlmacen) {
			eleNombreAlmacen = <>
				<Typography component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
					{datosAlmacen.nombre ?? 'Desconocido'}
				</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosAlmacen.id ?? codigoAlmacenServicio})</Typography>
			</>
		}
	}

	if (almacenesDeRebote?.length > 0) {
		eleAlmacenesDeRebote = <Typography component="div" variant="body1">
			Rebote por: <Stack divider={<>,</>} direction="row" spacing={0.5} sx={{ display: 'inline', ml:0.3 }}>
				{almacenesDeRebote.map(almacenRebote =>
					<Typography key={almacenRebote} variant="caption" component="span" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
						{almacenRebote}
					</Typography>
				)}
			</Stack>
		</Typography>
	}

	let eleCodigoAlmacenDesconocido = null;
	let eleCodigoAlmacenSaneado = null;

	if (codigoAlmacenDesconocido) {
		eleCodigoAlmacenDesconocido = <Chip size="small" label="Desconocido" color="info" title="El cliente us?? un c??digo de almac??n desconocido" variant="outlined" />
	}
	if (codigoAlmacenSaneado) {
		eleCodigoAlmacenSaneado = <Chip size="small" label="Conver" color="info" title="Se hizo una Conversi??n del tipo del almac??n" variant="outlined" />
	}


	return <BoxInfo titulo="Almac??n:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>
			{eleNombreAlmacen}
		</Typography>
		{eleAlmacenesDeRebote}
		<Stack direction="row" spacing={1}>
			{eleCodigoAlmacenDesconocido}
			{eleCodigoAlmacenSaneado}
		</Stack>
	</BoxInfo>






}