import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";
import { useTheme } from '@mui/styles';
import React from "react";

import { MdMoneyOff, MdOutlineAirplanemodeActive, MdOutlineControlPointDuplicate, MdOutlineSignalWifiOff, MdScheduleSend } from "react-icons/md"
import { GoGitBranch, GoGitMerge } from "react-icons/go"
import { GiShieldReflect } from "react-icons/gi"
import { FaSadTear, FaPills, FaUserLock } from "react-icons/fa"


const Elemento = ({ compacto, icono, texto, color }) => {

	const theme = useTheme();

	

	if (compacto) {
		return React.createElement(
			icono,
			{
				size: 18,
				style: { marginTop: '4px' },
				color: theme.palette?.[color]?.main,
				title: texto
			},
			null
		);
	} else {
		return <Chip size="small" variant="outlined" label={texto} color={color} />
	}

}


const generaElemento = (tipo, compacto) => {

	switch (tipo) {
		case 'noEnviaFaltas': return <Elemento key={tipo} compacto={compacto} texto={"NO FALTAS"} icono={MdOutlineSignalWifiOff} color="error" />
		case 'retransmisionCliente': return <Elemento key={tipo} compacto={compacto} texto={"REINTENTO"} icono={MdMoneyOff} color="info" />
		case 'reboteFaltas': return <Elemento key={tipo} compacto={compacto} texto={"REBOTE FALTAS"} icono={GiShieldReflect} color="info" />
		// case 'errorComprobacionDuplicado': return <Chip {...propiedadesChip(compacto)} key={tipo} label="ERR" color="error" />
		case 'porRazonDesconocida': return <Elemento key={tipo} compacto={compacto} texto={"RAZON DESCONOCIDA"} icono={FaSadTear} color="error" />
		case 'servicioDemorado': return <Elemento key={tipo} compacto={compacto} texto={"DEMORADO"} icono={MdScheduleSend} color="info" />
		case 'estupefaciente': return <Elemento key={tipo} compacto={compacto} texto={"ESTUPES"} icono={FaPills} color="success" />
		case 'clienteBloqueadoSap': return <Elemento key={tipo} compacto={compacto} texto={"CLIENTE BLOQUEADO"} icono={FaUserLock} color="warning" />
		case 'esPedidoDuplicadoSap': return <Elemento key={tipo} compacto={compacto} texto={"DUPLICADO SAP"} icono={MdOutlineControlPointDuplicate} color="warning" />
		case 'esTransfer': return <Elemento key={tipo} compacto={compacto} texto={"TRANSFER"} icono={MdOutlineAirplanemodeActive} color="success" />
		case 'esReejecucion': return <Elemento key={tipo} compacto={compacto} texto={"REEJECUCION"} icono={GoGitMerge} color="info" />
		default: return null;
	}



}


export default function TextoDatosInteres({ datos, compacto }) {

	if (!datos) return null;

	let esUnClon = (datos.opcionesDeReejecucion?.clonado);
	let faltaTotal = (datos.totales?.cantidad && (datos.totales?.cantidad - datos.totales?.cantidadIncidencias) === 0);

	let componentes = Object.keys(datos).map(c => generaElemento(c, compacto)).filter(c => c !== null);

	if (faltaTotal)
		componentes.push(<Elemento key="faltaTotal" compacto={compacto} texto={"FALTA TOTAL"} icono={MdMoneyOff} color="secondary"/>);
	if (esUnClon)
		componentes.push(<Elemento key="esClon" compacto={compacto} texto={"CLONADO"} icono={GoGitBranch} color="secondary"/>);



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