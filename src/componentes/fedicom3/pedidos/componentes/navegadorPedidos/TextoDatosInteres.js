import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";

import { MdMoneyOff, MdOutlineAirplanemodeActive, MdOutlineControlPointDuplicate, MdOutlineSignalWifiOff, MdScheduleSend } from "react-icons/md"
import { GoGitBranch, GoGitMerge } from "react-icons/go"
import { GiShieldReflect } from "react-icons/gi"
import { FaSadTear, FaPills, FaUserLock } from "react-icons/fa"

const propiedadesChip = (compacto) => {
	if (compacto) {
		return {
			size: 'small'
		}
	}
	return {
		size: 'small',
		variant: 'outlined'
	}
}


const propiedadesIcono = (compacto) => {
	if (compacto) {
		return {
			size: 20,
			style: { marginTop: '4px' }
		}
	}
	return {
		size: 20
	}
}

const generaElemento = (tipo, compacto) => {

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



}


export default function TextoDatosInteres({ datos, compacto }) {

	console.log(datos)
	if (!datos) return null;

	let esUnClon = (datos.opcionesDeReejecucion?.clonado);
	let faltaTotal = (datos.totales?.cantidad && (datos.totales?.cantidad - datos.totales?.cantidadIncidencias) === 0);

	let componentes = Object.keys(datos).map(c => generaElemento(c, compacto)).filter(c => c !== null);

	if (faltaTotal)
		componentes.push(<Chip {...propiedadesChip(compacto)} key="faltaTotal" label={compacto ? < MdMoneyOff {...propiedadesIcono(compacto)} /> : "FALTA TOTAL"}  />)
	if (esUnClon)
		componentes.push(<Chip {...propiedadesChip(compacto)} key="esClon" label={compacto ? < GoGitBranch {...propiedadesIcono(compacto)} /> : "CLONADO"} color="secondary" />)



	if (componentes.length === 0) return null;

	if (compacto) {
		return <Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0.7}>
			{componentes}
		</Stack>
	}
	return <BoxTexto titulo="Notas de interés:">
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0.7}>
			{componentes}
		</Stack>
	</BoxTexto >



}