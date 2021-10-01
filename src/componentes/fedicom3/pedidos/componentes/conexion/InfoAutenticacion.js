import { memo } from "react";
import { Typography } from "@mui/material";

const TypoDominio = ({ dominio }) => {
	if (dominio !== 'FEDICOM')
		return <Typography sx={{ ml: 0.5 }} variant='overline' component="span">@{dominio}</Typography>
	return null;
}

const InfoAutenticacion = ({ autenticacion }) => {
	let { usuario, dominio, solicitante } = autenticacion;

	if (solicitante) {
		return <>
			<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">
				{solicitante.usuario}
				<TypoDominio dominio={solicitante.dominio} />
				<Typography sx={{ ml: 0.5 }} variant='caption' component="span">en nombre de:</Typography>
			</Typography>
			<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">
				{usuario}
				<TypoDominio dominio={dominio} />
			</Typography>
		</>
	}

	return <>
		<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">
			{usuario}
			<TypoDominio dominio={dominio} />
		</Typography>
	</>
}

export default memo(InfoAutenticacion);
