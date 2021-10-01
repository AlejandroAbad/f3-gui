import { memo } from "react";
import { Typography } from "@mui/material";

const InfoIp = ({ip}) => {
	return <Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">{ip}</Typography>
}

export default memo(InfoIp);
