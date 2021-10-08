import { Typography } from "@mui/material";
import { memo, useContext } from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ContextoPedido from "../../ContextoPedido";


const InfoTotales = () => {

	let { pedido } = useContext(ContextoPedido);
	let t = pedido.datosMaestros.totales


	return <Table size="small">

		<TableBody>
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}					>
				<TableCell component="th" scope="row">
					<Typography variant="body2">Unidades:</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="body2" component="span" color={t.cantidad === t.cantidadIncidencias ? 'error' : 'success'}>{t.cantidad - t.cantidadIncidencias} servidas</Typography>
					<Typography variant="body2" component="span" color={t.cantidadIncidencias ? 'error' : 'success'}>, {t.cantidadIncidencias} en falta</Typography>
				</TableCell>
			</TableRow>


			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}					>
				<TableCell component="th" scope="row">
					<Typography variant="body2">Líneas:</Typography>
				</TableCell>
				<TableCell >
					<Typography variant="body2" component="span" color={t.lineas === t.lineasIncidencias ? 'error' : 'success'}>{t.lineas - t.lineasIncidencias} servidas</Typography>
					<Typography variant="body2" component="span" color={t.lineasIncidencias ? 'error' : 'success'}>, {t.lineasIncidencias} en falta</Typography>
				</TableCell>
			</TableRow>


			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}					>
				<TableCell component="th" scope="row">
					<Typography variant="body2">Estupes:</Typography>
				</TableCell>
				<TableCell >
					<Typography variant="body2" component="span" >{t.cantidadEstupe} unidades en {t.lineasEstupe} líneas</Typography>
				</TableCell>
			</TableRow>


		</TableBody>
	</Table >
}


export default memo(InfoTotales);