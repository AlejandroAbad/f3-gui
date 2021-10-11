import { useCallback, useEffect, useContext } from "react";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { Chip, CircularProgress, Stack, Typography } from "@mui/material";
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";



export default function InfoAlmacen() {

	let { pedido } = useContext(ContextoPedido);

	let { codigoAlmancenServicio, almacenesDeRebote, codigoAlmacenDesconocido, codigoAlmacenSaneado } = pedido;

	let { consultaMaestro } = useApiFedicom();
	let { cargando, datos, error, setCargando, setDatos, setError } = useEstadoCarga();


	let cargarDatosPrograma = useCallback(async () => {

		if (!codigoAlmancenServicio) return;

		setCargando(true);
		try {
			let resultado = await consultaMaestro('almacenes', codigoAlmancenServicio)
			if (resultado?.id) setDatos(resultado);
			else setError(resultado);
		} catch (error) {
			setError(error);
		}

	}, [codigoAlmancenServicio, consultaMaestro, setCargando, setDatos, setError])

	useEffect(cargarDatosPrograma, [cargarDatosPrograma])

	if (!codigoAlmancenServicio) return null;



	let eleNombreAlmacen = <>{codigoAlmancenServicio}</>;
	let eleAlmacenesDeRebote = null;

	if (cargando) {
		eleNombreAlmacen = <Typography component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={16} color="secondary" sx={{ mr: 1 }} />
			{codigoAlmancenServicio}
		</Typography>
	}

	if (error) {
		eleNombreAlmacen = <Typography  component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
			{codigoAlmancenServicio}
		</Typography>
	}

	if (datos) {
		eleNombreAlmacen = <>
			<Typography component="span" variant="body1" sx={{ fontSize: 22, fontWeight: 'bold', mr: 1 }}>
				{datos.nombre ?? 'Desconocido'}
			</Typography>
			<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datos.id ?? codigoAlmancenServicio})</Typography>
		</>
	}

	if (almacenesDeRebote?.length > 0) {
		eleAlmacenesDeRebote = <Typography component="div" variant="body1">
			Rebote por: <Stack divider=", " sx={{ display: 'inline', ml: 1 }}>
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
		eleCodigoAlmacenDesconocido = <Chip size="small" label="Desconocido" color="info" title="El cliente usó un código de almacén desconocido" variant="outlined" />
	}
	if (codigoAlmacenSaneado) {
		eleCodigoAlmacenSaneado = <Chip size="small" label="Conver" color="info" title="Se hizo una Conversión del tipo del almacén" variant="outlined" />
	}


	return <BoxInfo titulo="Almacén:">
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