import { Typography } from "@mui/material";
import { memo } from "react";
import BoxInfo from "./BoxInfo";


const InfoTxId = ({ txId }) => {

	return <BoxInfo titulo="ID único:">
		<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{txId.toUpperCase()}</Typography>
	</BoxInfo>
}

export default memo(InfoTxId);
