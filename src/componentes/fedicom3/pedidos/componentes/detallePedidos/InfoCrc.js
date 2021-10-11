import { Typography } from "@mui/material"
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";

const InfoCrc = () => {

	let { pedido } = useContext(ContextoPedido);

	let { crc, crcSap } = pedido;

	if (!crc) return null;
	return <BoxInfo titulo="Crc:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', fontSize: 22 }}>
			{crcSap.toUpperCase()}
		</Typography>
		<Typography component="div" variant="subtitle2" sx={{ color: 'text.secondary' }}>
			{crc.toUpperCase()}
		</Typography>
	</BoxInfo>
}


export default memo(InfoCrc)