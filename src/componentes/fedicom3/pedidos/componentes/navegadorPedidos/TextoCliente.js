import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoCliente({ cliente, usuario, dominio, solicitante }) {

	let infoCliente = null;
	let infoAutenticacion = null;
	let infoSolicitante = null;



	if (usuario/* && dominio*/) {
		infoAutenticacion = <Typography component="span">
			{cliente >= 0 && <Typography component="span" variant="subtitle2" sx={{ mx: 0.5 }}>»</Typography>}
			<Typography component="span" variant="subtitle2" >{usuario}</Typography>
			{/* dominio !== 'FEDICOM' && <Typography component="span" variant="subtitle2" sx={{ fontSize: '80%', color: 'text.secondary' }} > @ {dominio}</Typography> */}
		</Typography>
	}

	if (solicitante && solicitante.usuario && solicitante.dominio) {
		infoSolicitante = <Typography component="div" variant="caption" sx={{ mt: -0.8, pt: 0 }}>(Solicitado por {solicitante.usuario})</Typography>
	}

	if (cliente >= 0) {
		infoCliente = <BoxTexto titulo="Cliente:">
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{cliente ?? 0}</Typography>
			{infoAutenticacion}
			{infoSolicitante}
		</BoxTexto>
	} else if (infoAutenticacion) {
		infoCliente = <BoxTexto titulo="Usuario:">
			{infoAutenticacion}
			{infoSolicitante}
		</BoxTexto>
	}


	return infoCliente



}