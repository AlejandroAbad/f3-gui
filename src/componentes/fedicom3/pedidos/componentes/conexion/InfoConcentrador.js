import { memo } from "react";
import { Typography } from "@mui/material";

const InfoConcentrador = ({concentrador}) => {

	let {servidor,/* version, pid, git*/} = concentrador;
	//let {commit, timestamp} = git;

	return <Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='body2' component="div">{servidor}</Typography>
}

export default memo(InfoConcentrador);
