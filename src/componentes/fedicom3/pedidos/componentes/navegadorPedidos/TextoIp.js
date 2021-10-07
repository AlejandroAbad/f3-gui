import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoIp({ ip }) {

	if (!ip) return null;

	return <BoxTexto titulo="Dirección IP:">
		<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{ip}</Typography>
	</BoxTexto>



}