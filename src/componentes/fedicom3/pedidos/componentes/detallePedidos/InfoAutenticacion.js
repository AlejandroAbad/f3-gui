import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import BoxInfo from "./BoxInfo";
import ContextoMaestros from "contexto/contextoMaestros";



const InfoAutenticacion = ({ autenticacion }) => {

	let { usuario, /*dominio,*/ solicitante } = autenticacion;
	let { maestroLaboratorios } = useContext(ContextoMaestros);

	let [nombreLaboratorio, setNombreLaboratorio] = useState(null);
	let cargarDatosLaboratorio = useCallback(async () => {

		if (!usuario) return;
		if (!maestroLaboratorios?.datos?.length) return;
		if (usuario.search(/^T[RGP]/) !== -1) {

			try {
				let laboratorio = maestroLaboratorios.datos.find(l => l.id === parseInt(usuario.substr(2)));
				if (laboratorio?.id === parseInt(usuario.substr(2)))
					setNombreLaboratorio(laboratorio.nombre);
			} catch (error) {
			}
		}

	}, [usuario, maestroLaboratorios, setNombreLaboratorio])

	useEffect(cargarDatosLaboratorio, [cargarDatosLaboratorio])

	let infoSolicitante = null;

	if (solicitante?.usuario) {
		infoSolicitante = <Typography component="div" variant="subtitle2" sx={{ pt: 0 }}>› Solicitado por {solicitante.usuario}</Typography>
	}

	let componenteUsuario = null;
	let tituloCaja = null;
	if (nombreLaboratorio) {
		tituloCaja = "Laboratorio:";
		componenteUsuario = <>
			<Typography sx={{ fontWeight: 'bold' }} variant='body1' component="div">
				{nombreLaboratorio}
			</Typography>
			<Typography variant='body2' component="div">
				{usuario}
			</Typography>
		</>

	} else {
		tituloCaja = "Usuario autenticado:";
		componenteUsuario = <Typography variant='body1' component="div">
			{usuario}
		</Typography>
	}

	return <BoxInfo titulo={tituloCaja}>
		{componenteUsuario}
		{infoSolicitante}

	</BoxInfo>
}

export default memo(InfoAutenticacion);
