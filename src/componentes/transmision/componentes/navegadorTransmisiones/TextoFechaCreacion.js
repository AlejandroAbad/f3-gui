import { Typography } from "@mui/material";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import BoxTexto from "./BoxTexto";



export default function TextoFechaCreacion({ fechaCreacion }) {

	let fecha = new Date(fechaCreacion);

	let hora = format(fecha, 'dd-MM-yyyy HH:mm:ss', { locale: es })
	let milis = format(fecha, 'SSS', { locale: es })

	return <BoxTexto titulo="Hora entrada:">
		<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{hora}</Typography>
		<Typography component="span" variant="subtitle2" sx={{ fontSize: '80%', color: 'text.mutted' }} >.{milis}</Typography>
	</BoxTexto>



}