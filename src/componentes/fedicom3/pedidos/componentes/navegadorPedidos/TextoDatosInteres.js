import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";


const propiedadesChip = {
	size: 'small',
	variant: 'outlined'
}

const generaElemento = (tipo) => {

	switch (tipo) {
		case 'noEnviaFaltas': return <Chip {...propiedadesChip} key={tipo} label="No faltas" color="error" />
		case 'retransmisionCliente': return <Chip {...propiedadesChip} key={tipo} label="Retransmisión" color="info" />
		case 'errorComprobacionDuplicado': return <Chip {...propiedadesChip} key={tipo} label="¿Duplicado?" color="error" />
		case 'reboteFaltas': return <Chip {...propiedadesChip} key={tipo} label="Rebote" color="info" />
		case 'porRazonDesconocida': return <Chip {...propiedadesChip} key={tipo} label="Razón desconocida" color="error" />
		case 'servicioDemorado': return <Chip {...propiedadesChip} key={tipo} label="Demorado" color="primary" />
		case 'estupefaciente': return <Chip {...propiedadesChip} key={tipo} label="Estupe" color="success" />
		case 'clienteBloqueadoSap': return <Chip {...propiedadesChip} key={tipo} label="Bloqueado SAP" color="warning" />
		case 'esPedidoDuplicadoSap': return <Chip {...propiedadesChip} key={tipo} label="Duplicado SAP" color="warning" />
		case 'esTransfer': return <Chip {...propiedadesChip} key={tipo} label="Transfer" color="success" />
		case 'esReejecucion': return <Chip {...propiedadesChip} key={tipo} label="Reejecución" color="info" />
		default: return null;
	}

}


export default function TextoDatosInteres({ datos }) {

	if (!datos) return null;

	let faltaTotal = (datos.totales?.cantidad && (datos.totales?.cantidad - datos.totales?.cantidadIncidencias) === 0);
	let componentes = Object.keys(datos).map(c => generaElemento(c)).filter(c => c !== null);

	if (faltaTotal)
		componentes.push(<Chip {...propiedadesChip} key="faltaTotal" label="Falta Total" color="info" />)

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