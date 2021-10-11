import { memo, useContext } from "react";

import { Typography } from "@mui/material";
import ContextoPedido from "../../ContextoPedido";
import BoxInfo from "./BoxInfo";


const InfoCliente = () => {
	let { pedido } = useContext(ContextoPedido);
	
	return <BoxInfo titulo="Datos del cliente:">
		<Typography component="span" sx={{ fontWeight: 'bold', fontSize: '22px' }}>{pedido.codigoCliente}</Typography>
		{pedido.clienteSap && 
			<Typography component="span" variant='subtitle2'> » {pedido.clienteSap}</Typography>
		}

		{pedido.puntoEntrega && <Typography component="div" variant='caption'>@ {pedido.puntoEntrega}</Typography> }
		
	</BoxInfo>
}

export default memo(InfoCliente);
