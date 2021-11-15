import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material"
import ControlModoFiltro, { obtenerModoDeFiltro } from "common/camposFormulario/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import ContextoMaestros from "contexto/contextoMaestros";
import BoxFiltro from "./BoxFiltro";
import ControlTextoChip from "common/camposFormulario/ControlTextoChip";


const MODOS = [
	{ id: '$in', texto: 'ES ALGUNO DE ', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO ES NINGUNO DE', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'FILTRO DESACTIVADO', color: 'inherit', icono: <PauseCircleOutline /> }
]

const RUTA_NODO = 'estado';

const nombreEstado = (maestro, codigoEstado) => {
	let estado = maestro?.datos?.find(e => e.codigo === codigoEstado);
	if (!estado) return '' + codigoEstado;


	if (estado.ambito) {
		return `${estado.ambito} - ${estado.nombre}`
	}
	return estado.nombre;
}

const codigoEstado = (maestro, nombreEstado) => {

	let [ambito, nombre] = nombreEstado.split(' - ');
	if (!nombre) {
		nombre = ambito;
		ambito = null;
	}


	let estado = maestro?.datos?.find(e => (e.ambito === ambito && e.nombre === nombre));
	if (!estado) return 0;
	return estado.codigo;
}


export const EstadoTransmision = ({ refFiltro }) => {


	const { maestroEstados } = useContext(ContextoMaestros);
	let nombresEstadosRelevantes = maestroEstados?.datos?.map(estado => nombreEstado(maestroEstados, estado.codigo)) || [];

	const nodo = refFiltro?.current?.[RUTA_NODO];

	let modoFiltroActual = MODOS[0].id;
	let seleccionInicial = [];

	if (nodo) {
		modoFiltroActual = obtenerModoDeFiltro(nodo, MODOS) || MODOS[0].id
		seleccionInicial = Object.values(nodo)?.[0].map(codigoEstado => nombreEstado(maestroEstados, codigoEstado)) || []
	}

	const [estadosSeleccionados, _setEstadosSeleccionados] = useState(seleccionInicial);
	const [modoFiltro, _setModoFiltro] = useState(modoFiltroActual);
	useEffect(() => {
		if (estadosSeleccionados.length && modoFiltro) {
			refFiltro.current[RUTA_NODO] = {
				[modoFiltro]: estadosSeleccionados.map(nombreEstado => codigoEstado(maestroEstados, nombreEstado))
			};
		} else {
			delete refFiltro.current[RUTA_NODO];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [estadosSeleccionados, modoFiltro])



	return <BoxFiltro relleno={estadosSeleccionados?.length} modoFiltro={modoFiltro} >
		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Estado de la transmisión
			<ControlModoFiltro modo={modoFiltro} onChange={_setModoFiltro} listaModos={MODOS} />
		</Typography>

		<ControlTextoChip
			regexParticionado={/[\s\r\n\t,-.]+/}
			valor={estadosSeleccionados}
			onChange={_setEstadosSeleccionados}
			label="Estados"
			opciones={nombresEstadosRelevantes}
		/>

	</BoxFiltro>

}

export default EstadoTransmision;