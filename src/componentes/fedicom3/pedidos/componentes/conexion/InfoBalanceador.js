import { memo } from "react";
import { Typography } from "@mui/material";

const InfoBalanceador = ({balanceador}) => {
	if (!balanceador)
		return <Typography sx={{ ml: 1, fontWeight: 'bold', color: 'warning.main' }} variant='body2'  component="div">Petición directa al concentrador</Typography>
	return <Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">{balanceador}</Typography>
}

export default memo(InfoBalanceador);
