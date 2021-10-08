import { Typography } from "@mui/material";
import { memo } from "react";
import BoxInfo from "./BoxInfo";


const InfoIp = ({ ip }) => {
	return <BoxInfo titulo="Direción IP origen:">
		<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{ip}</Typography>
	</BoxInfo>
}

export default memo(InfoIp);
