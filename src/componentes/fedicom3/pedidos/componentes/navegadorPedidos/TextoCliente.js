import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoCliente({ cliente, usuario, dominio, solicitante }) {

	let infoCliente = null;
	let infoAutenticacion = null;
	let infoSolicitante = null;


	let usuarioCorto = null;

	if (usuario) {

		if (usuario.startsWith("BF")) {
			usuarioCorto = parseInt(usuario.substr(usuario.length - 5))
		}
		else if (usuario.endsWith("@hefame")) {
			usuarioCorto = parseInt(usuario.substr(3, 5));
		} else {
			usuarioCorto = usuario;
		}

		let color = (cliente >= 0 && dominio === 'FEDICOM') ? 'error.main' : 'text.secondary';
		let separador = (cliente >= 0 && dominio === 'FEDICOM') ? '≠' : '«';
		let variante = (cliente >= 0) ? 'subtitle2' : 'subtitle1';
		let negrita = (cliente >= 0) ? 'normal' : 'bold';

		infoAutenticacion = <Typography component="span">
			{cliente >= 0 && <Typography component="span" variant={variante} sx={{ mx: 0.5,  color }} >{separador}</Typography>}
			<Typography component="span" variant={variante} sx={{ color, fontWeight: negrita }} >{usuario}</Typography>
		</Typography>
	}

	if (solicitante && solicitante.usuario && solicitante.dominio) {
		infoSolicitante = <Typography component="div" variant="caption" sx={{ mt: -0.8, pt: 0 }}>› Solicitado por {solicitante.usuario}</Typography>
	}

	if (cliente >= 0) {
		infoCliente = <BoxTexto titulo="Cliente:">
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{cliente ?? 0}</Typography>
			{usuarioCorto !== cliente && infoAutenticacion}
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