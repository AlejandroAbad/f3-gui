import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";


const padear = (numero) => {
	return ('00' + numero).substr(-3);
}


export default function TextoTipoPedido({ tipoPedido, tipoPedidoSap, motivoPedidoSap }) {

	if (!tipoPedido) return null;

	return <BoxTexto titulo="Tipo de pedido:">
		<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{padear(tipoPedido)}</Typography>
		{/*(tipoPedidoSap) &&
			<Typography component="span" variant="caption" sx={{ fontSize: '80%', color: 'text.mutted', ml: 1 }} >
				SAP [ {motivoPedidoSap && `motivo=${motivoPedidoSap}, `}tipo={tipoPedidoSap} ]</Typography>
		*/}
	</BoxTexto>



}