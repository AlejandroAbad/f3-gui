import { Accordion, AccordionDetails, AccordionSummary, Alert, Paper, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { MdOutlineCancelScheduleSend, MdOutlineControlPointDuplicate, MdMoneyOff, MdScheduleSend, MdOutlineAirplanemodeActive } from "react-icons/md";
import { FaSadTear, FaUserLock, FaPills } from "react-icons/fa";
import { GoGitMerge, GoEyeClosed } from "react-icons/go";
import { Box } from "@mui/system";
import { memo, useContext } from "react"
import ReactJson from "react-json-view";
import ContextoPedido from "../ContextoPedido";


const FLAGS = {
	noEnviaFaltas: ['No se envian faltas', <MdOutlineCancelScheduleSend />, 'error', 'El cliente no ha recibido las faltas del pedido'],
	errorComprobacionDuplicado: ['Imposible comprobar duplicado', <MdOutlineControlPointDuplicate />, 'warning', 'No se ha podido comprobar que el pedido no sea un duplicado de otro pedido, ya que ocurrió un error en la consulta'],
	porRazonDesconocida: ['Por razón desconocida', <FaSadTear />, 'error', 'SAP ha devuelto el error "Por razón desconocida" en la BAPI de disponibilidad'],
	clienteBloqueadoSap: ['Cliente bloqueado en SAP', <FaUserLock />, 'info', 'El cliente está bloqueado en SAP'],
	esPedidoDuplicadoSap: ['Pedido duplicado en SAP', <MdOutlineControlPointDuplicate />, 'info', 'SAP ha indicado que ya tiene un pedido con el mismo CRC'],
	retransmisionCliente: ['Pedido retransmitido por el cliente', <MdMoneyOff />, 'info', 'El cliente ha vuelto a transmitir el mismo pedido a ver si cuela'],
	servicioDemorado: ['Admite servicio demorado', <MdScheduleSend />, 'success', 'El pedido contiene líneas que admiten que se les proponga demora del servicio'],
	estupefaciente: ['Contiene estupefacientes', <FaPills />, 'success', 'El pedido contiene estupefacientes'],
	esTransfer: ['Transfer de laboratorio', <MdOutlineAirplanemodeActive />, 'success', 'El pedido es un transfer de laboratorio']
}

const ElementoDetalle = ({ id, titulo, color, icono, descripcion }) => {

	if (typeof descripcion === 'string') {
		descripcion = <Typography variant="subtitle2">{descripcion}</Typography>
	}

	return <Accordion>
		<AccordionSummary expandIcon={<ExpandMore />} id={id} sx={{ color: `${color}.main` }}	>
			{icono}
			<Typography sx={{ ml: 4, fontWeight: 'bold' }}>{titulo}</Typography>
		</AccordionSummary>
		<AccordionDetails>
			{descripcion}
		</AccordionDetails>
	</Accordion>
}

const generaElemento = (tipo, datos) => {

	let f = FLAGS[tipo];
	if (f) {
		return <ElementoDetalle id={tipo} key={tipo} titulo={f[0]} icono={f[1]} color={f[2]} descripcion={f[3]} />;
	}

	switch (tipo) {
		case 'opcionesDeReejecucion': {
			let elemento = <ReactJson src={datos} />;

			return <ElementoDetalle id={tipo} key={tipo}
				titulo="Pedido clonado" icono={<GoGitMerge />} color="success" descripcion={elemento} />
		}
		case 'erroresOcultados': {

			let eleIncidencias = datos.map(i => {
				let severity = 'info'
				if (i.codigo.startsWith('PED-ERR') && i.codigo !== 'PED-ERR-008') severity = 'error'
				if (i.codigo.startsWith('PED-WARN')) severity = 'warning'

				return <Alert severity={severity}>
					<strong>{i.codigo}</strong>: {i.descripcion}
				</Alert>
			});

			return <ElementoDetalle id={tipo} key={tipo}
				titulo={`Errores no enviados al cliente (${eleIncidencias.length})`}
				icono={<GoEyeClosed />} color="warning" descripcion={eleIncidencias} />
		}
		default: return null;
	}



}



const PaperDetallesPedido = () => {

	let { pedido } = useContext(ContextoPedido);
	let detalles = pedido.flags;

	if (!detalles || !Object.keys(detalles).length) return null;

	let eleDetalles = [];
	for (let flag in detalles) {
		eleDetalles.push(generaElemento(flag, detalles[flag]))
	}


	if (!eleDetalles.length) return null;
	return <Box>
		<Paper elevation={10} sx={{ mb: 2, px: 4, py: 2 }}>
			<Typography variant='h5' component="h2" sx={{mb: 2}}>Datos de interés:</Typography>
			{eleDetalles}
		</Paper>
	</Box>
}

export default memo(PaperDetallesPedido);