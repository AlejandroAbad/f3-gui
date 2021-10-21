import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";


const propiedadesChip = {
	size: 'small',
	variant: 'outlined'
}

const generaElemento = (tipo) => {

	switch (tipo) {
		case 'noEnviaFaltas': return <Chip {...propiedadesChip} key={tipo} label="NO FALTAS" color="error" />
		case 'retransmisionCliente': return <Chip {...propiedadesChip} key={tipo} label="REINTENTO" color="info" />
		// case 'errorComprobacionDuplicado': return <Chip {...propiedadesChip} key={tipo} label="ERR" color="error" />
		case 'reboteFaltas': return <Chip {...propiedadesChip} key={tipo} label="REBOTES" color="info" />
		case 'porRazonDesconocida': return <Chip {...propiedadesChip} key={tipo} label="RAZÓN DESCONOCIDA" color="error" />
		case 'servicioDemorado': return <Chip {...propiedadesChip} key={tipo} label="DEMORADO" color="primary" />
		case 'estupefaciente': return <Chip {...propiedadesChip} key={tipo} label="ESTUPEFACIENTES" color="success" />
		case 'clienteBloqueadoSap': return <Chip {...propiedadesChip} key={tipo} label="CLIENTE BLOQUEADO" color="warning" />
		case 'esPedidoDuplicadoSap': return <Chip {...propiedadesChip} key={tipo} label="DUPLICADO SAP" color="warning" />
		case 'esTransfer': return <Chip {...propiedadesChip} key={tipo} label="TRANSFER" color="success" />
		case 'esReejecucion': return <Chip {...propiedadesChip} key={tipo} label="REEJECUCION" color="info" />
		default: return null;
	}

}


export default function TextoDatosInteres({ datos }) {

	if (!datos) return null;

	let esUnClon = (datos.opcionesDeReejecucion?.clonado);
	let faltaTotal = (datos.totales?.cantidad && (datos.totales?.cantidad - datos.totales?.cantidadIncidencias) === 0);
	let componentes = Object.keys(datos).map(c => generaElemento(c)).filter(c => c !== null);

	if (faltaTotal)
		componentes.push(<Chip {...propiedadesChip} key="faltaTotal" label="FALTA TOTAL" color="info" />)
	if(esUnClon) 
		componentes.push(<Chip {...propiedadesChip} key="esClon" label="PEDIDO CLONADO" color="secondary" />)

	if (componentes.length === 0) return null;

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