import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";

import clone from 'clone';



export default function TextoDatosInteres({ datos }) {

	if (!datos) return null;
	let copia = clone(datos, false);

	let faltaTotal = (copia.totales?.cantidad && (copia.totales?.cantidad - copia.totales?.cantidadIncidencias) === 0);


	delete copia.clienteSap
	delete copia.codigoAlmacenServicio
	delete copia.codigoCliente
	delete copia.crc
	delete copia.crcSap
	delete copia.numeroPedidoOrigen
	delete copia.pedidoAgrupadoSap
	delete copia.pedidoProcesadoSap
	delete copia.pedidosAsociadosSap
	delete copia.puntoEntrega
	delete copia.tipoCrc
	delete copia.tipoPedido
	delete copia.tipoPedidoSap
	delete copia.totales
	delete copia.motivoPedidoSap
	delete copia.codigoAlmacenDesconocido
	delete copia.codigoAlmacenSaneado
	delete copia.esDuplicado
	delete copia.almacenesDeRebote

	let componentes = Object.keys(copia).map(element =>
		<Chip size="small" variant="outlined" key={element} label={element} color="info" />
	);

	if (faltaTotal)
		componentes.push(<Chip size="small" key="faltaTotal" label="faltaTotal" color="info" />)





	if (componentes.length === 0) return null;

	return <BoxTexto titulo="Notas de interés:">
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0.7}>
			{componentes}
		</Stack>
	</BoxTexto >



}