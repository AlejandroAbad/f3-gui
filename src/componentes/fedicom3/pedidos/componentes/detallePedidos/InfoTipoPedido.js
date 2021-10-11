import { Typography } from "@mui/material";
import { memo, useContext } from "react"
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";

const InfoTipoPedido = () => {

	let { pedido } = useContext(ContextoPedido);
	let { tipoPedido/*, tipoPedidoSap, motivoPedidoSap*/ } = pedido;

	return <BoxInfo titulo="Tipo de pedido:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', fontSize: 22 }}>
			{tipoPedido ?? 0}
		</Typography>
	</BoxInfo>
}

export default memo(InfoTipoPedido)