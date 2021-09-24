import { Box, Typography, Paper } from "@mui/material"

import { memo, useContext } from "react"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';


import { format } from "date-fns";
import { es } from 'date-fns/locale'

import ClearIcon from '@mui/icons-material/Clear';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import HelpIcon from '@mui/icons-material/Help';
import ContextoPedido from "./ContextoPedido";





const determinarColor = (nodo) => {
	if (nodo.es.rechazado()) return 'warning.main'
	if (nodo.es.duplicado()) return 'warning.main'
	if (nodo.es.reejecucion()) return 'secondary.main'
	if (nodo.es.primigenio()) {
		if (nodo.estado === 9900) return 'success.main'
		return 'primary.main'
	}
	else return ''
}

const determinarIcono = (nodo) => {

	if (nodo.es.rechazado()) return <ClearIcon />
	if (nodo.es.duplicado()) return <CopyAllIcon />
	if (nodo.es.reejecucion()) return <LoopIcon />
	if (nodo.es.primigenio()) return <CheckIcon />
	return <HelpIcon />
}

const determinarTextos = (nodo) => {
	if (nodo.es.rechazado()) return { secundario: 'Rechazado por SAP' }
	if (nodo.es.duplicado()) return { secundario: 'Detectado duplicado' }
	if (nodo.es.reejecucion()) {
		if (nodo.pedido.esPedidoDuplicadoSap) return { primario: 'Reenvío a SAP', secundario: 'SAP ya tenía el pedido' }
		return { primario: 'Reenvío a SAP', secundario: 'Resultado ' + nodo.estado }
	}
	if (nodo.es.primigenio()) return { primario: 'Entra pedido', secundario: 'Resultado ' + nodo.estado }
	return { primario: 'NPI', secundario: 'Resultado ' + nodo.estado }
}

const NodoTimeline = ({ nodo }) => {


	let color = determinarColor(nodo);
	let icono = determinarIcono(nodo);
	let texto = determinarTextos(nodo);

	return <TimelineItem >
		<TimelineOppositeContent sx={{ my: 'auto', mx: 0, pl: 0}} align="right" variant="body2" color="text.secondary" >
			<Typography variant="body1" component="span">{format(nodo.fechaCreacion, 'HH:mm:ss')}</Typography>
			<Typography variant="body2" component="span" >.{format(nodo.fechaCreacion, 'SSS')}</Typography>
		</TimelineOppositeContent>

		<TimelineSeparator>
			<TimelineConnector />
			<TimelineDot sx={{ bgcolor: color }}>
				{icono}
			</TimelineDot>
			<TimelineConnector />
		</TimelineSeparator>

		<TimelineContent sx={{ m: 'auto' }}>
			{texto.primario && <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
				{texto.primario}
			</Typography>}
			{texto.secundario && <Typography variant="body2">{texto.secundario}</Typography>}
		</TimelineContent>

	</TimelineItem>


}


const FechaTimeline = ({ nodo }) => {


	return <TimelineItem sx={{ minHeight: '40px' }} >

		<TimelineOppositeContent sx={{ m: 'auto' }} />

		<TimelineSeparator sx={{ m: 'auto', minWidth: '200px' }}>
			<Paper variant="outlined" sx={{ px: 2 }}>
				<Typography variant="h6" component="span" >
					{format(nodo.fechaCreacion, 'dd MMM yyyy', { locale: es })}
				</Typography>
			</Paper>
		</TimelineSeparator>

		<TimelineContent sx={{ m: 'auto' }} />

	</TimelineItem>


}


const BoxHistorialNodos = () => {

	let { pedido } = useContext(ContextoPedido);

	return <Box>
		<Paper elevation={10} sx={{py: 1}}>
			<Timeline>
				<FechaTimeline nodo={pedido.nodoInicial} />
				{pedido.nodos.map(nodo => <NodoTimeline nodo={nodo} key={nodo.id} />)}
			</Timeline>
		</Paper>
	</Box>

}


export default memo(BoxHistorialNodos)