import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoNumeroPedido({ crc, numeroPedidoOrigen }) {


	return <>
		{crc && <BoxTexto titulo="Crc:">
			<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
				{crc?.toUpperCase().substr(0,8)}
				<Typography component="span" variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary'}}>
					{crc?.toUpperCase().substr(8)}
				</Typography>
			</Typography>
		</BoxTexto>}
		{numeroPedidoOrigen && <BoxTexto titulo="Pedido Origen:">
			<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', color: 'text.secondary' }} >{numeroPedidoOrigen}</Typography>
		</BoxTexto>}
	</>



}