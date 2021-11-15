import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import BoxTexto from "./BoxTexto";



export default function TextoNumeroPedido({ crc, onMostrarDetalle, numeroPedidoOrigen }) {


	return <>
		{crc && <BoxTexto titulo="Crc:">
			<Link component="button" variant="body1" sx={{ fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }} onClick={() => onMostrarDetalle(crc)}>
				{crc?.toUpperCase()}
			</Link>
		</BoxTexto>}
		{numeroPedidoOrigen && <BoxTexto titulo="Pedido Origen:">
			<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', color: 'text.secondary' }} >{numeroPedidoOrigen}</Typography>
		</BoxTexto>}
	</>



}