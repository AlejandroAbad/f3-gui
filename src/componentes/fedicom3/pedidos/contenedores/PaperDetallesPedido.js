import { Alert, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useContext } from "react"
import ContextoPedido from "../ContextoPedido";


const generaElemento = (tipo, compacto) => {
/*
	switch (tipo) {
		case 'noEnviaFaltas': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < MdOutlineSignalWifiOff {...propiedadesIcono(compacto)} /> : "NO FALTAS"} color="error" />
		case 'retransmisionCliente': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < MdMoneyOff {...propiedadesIcono(compacto)} /> : "REINTENTO"} color="info" />
		// case 'errorComprobacionDuplicado': return <Chip {...propiedadesChip(compacto)} key={tipo} label="ERR" color="error" />
		case 'reboteFaltas': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < GiShieldReflect {...propiedadesIcono(compacto)} /> : "REBOTE FALTAS"} color="info" />
		case 'porRazonDesconocida': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < FaSadTear {...propiedadesIcono(compacto)} /> : "RAZON DESCONOCIDA"} color="error" />
		case 'servicioDemorado': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < MdScheduleSend {...propiedadesIcono(compacto)} /> : "DEMORADO"} color="primary" />
		case 'estupefaciente': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < FaPills {...propiedadesIcono(compacto)} /> : "ESTUPES"} color="success" />
		case 'clienteBloqueadoSap': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < FaUserLock {...propiedadesIcono(compacto)} /> : "CLIENTE BLOQUEADO"} color="warning" />
		case 'esPedidoDuplicadoSap': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < MdOutlineControlPointDuplicate {...propiedadesIcono(compacto)} /> : "DUPLICADO SAP"} color="warning" />
		case 'esTransfer': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < MdOutlineAirplanemodeActive {...propiedadesIcono(compacto)} /> : "TRANSFER"} color="success" />
		case 'esReejecucion': return <Chip {...propiedadesChip(compacto)} key={tipo} label={compacto ? < GoGitMerge {...propiedadesIcono(compacto)} /> : "REEJECUCION"} color="info" />
		default: return null;
	}
*/
}



const PaperDetallesPedido = () => {

	let { pedido } = useContext(ContextoPedido);
	let detalles = pedido.flags;

	if (!detalles || !Object.keys(detalles).length) return null;
/*
	let eleIncidencias = incidencias.map(i => {
		let severity = 'info'
		if (i.codigo.startsWith('PED-ERR') && i.codigo !== 'PED-ERR-008') severity = 'error'
		if (i.codigo.startsWith('PED-WARN')) severity = 'warning'

		return <Alert severity={severity}>
			<strong>{i.codigo}</strong>: {i.descripcion}
		</Alert>
	});
*/


	return <Box>
		<Paper elevation={10} sx={{ px: 4, py: 2 }}>
			{/*eleIncidencias*/}
		</Paper>
	</Box>
}

export default memo(PaperDetallesPedido);