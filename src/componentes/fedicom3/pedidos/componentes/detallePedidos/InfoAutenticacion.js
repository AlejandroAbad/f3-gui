import { memo } from "react";
import { Typography } from "@mui/material";
import BoxInfo from "./BoxInfo";



const InfoAutenticacion = ({ autenticacion }) => {

	let { usuario, /*dominio,*/ solicitante } = autenticacion;

	let infoSolicitante = null;

	if (solicitante?.usuario) {
		infoSolicitante = <Typography component="div" variant="subtitle2" sx={{ pt: 0 }}>› Solicitado por {solicitante.usuario}</Typography>
	}

	return <BoxInfo titulo="Usuario autenticado:">
		<Typography sx={{ fontWeight: 'bold' }} variant='body1' component="div">
			{usuario}
		</Typography>
		{infoSolicitante}

	</BoxInfo>
}

export default memo(InfoAutenticacion);
