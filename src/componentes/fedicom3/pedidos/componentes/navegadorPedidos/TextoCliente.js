import { useCallback, useContext, useEffect, useState } from "react";
import useApiFedicom from "hooks/useApiFedicom";
import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";
import ContextoMaestros from "contexto/contextoMaestros";



export default function TextoCliente({ cliente, usuario, dominio, solicitante }) {


	let { maestroLaboratorios } = useContext(ContextoMaestros);
	let [nombreUsuario, setNombreUsuario] = useState(usuario);


	let cargarDatosLaboratorio = useCallback(async () => {

		if (!usuario) return;
		if (!maestroLaboratorios?.datos?.length) return;

		if (usuario.search(/^T[RGP]/) !== -1) {
			try {
				let laboratorio = maestroLaboratorios.datos.find( l => l.id === parseInt(usuario.substr(2)) );
				
				if (laboratorio?.nombre)
					setNombreUsuario(laboratorio.nombre);
			} catch (error) {
			}
		}

	}, [usuario, maestroLaboratorios, setNombreUsuario])

	useEffect(cargarDatosLaboratorio, [cargarDatosLaboratorio])


	let infoCliente = null;
	let infoAutenticacion = null;
	let infoSolicitante = null;
	let usuarioCorto = null;

	if (nombreUsuario) {

		if (nombreUsuario.startsWith("BF")) {
			usuarioCorto = parseInt(nombreUsuario.substr(nombreUsuario.length - 5))
		}
		else if (nombreUsuario.endsWith("@hefame")) {
			usuarioCorto = parseInt(nombreUsuario.substr(3, 5));
		} else {
			usuarioCorto = nombreUsuario;
		}

		let color = (cliente >= 0 && dominio === 'FEDICOM') ? 'error.main' : 'text.secondary';
		let separador = (cliente >= 0 && dominio === 'FEDICOM') ? '≠' : '«';
		let variante = (cliente >= 0) ? 'subtitle2' : 'subtitle1';
		let negrita = (cliente >= 0) ? 'normal' : 'bold';

		infoAutenticacion = <Typography component="span">
			{cliente >= 0 && <Typography component="span" variant={variante} sx={{ mx: 0.5, color }} >{separador}</Typography>}
			<Typography component="span" variant={variante} sx={{ color, fontWeight: negrita }} >{nombreUsuario}</Typography>
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