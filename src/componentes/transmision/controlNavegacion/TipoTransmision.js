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

const RUTA_NODO = 'tipo';

const nombreTipo = (maestro, codigoTipo) => {
	let tipo = maestro?.datos?.find(tipo => tipo.codigo === codigoTipo);
	if (!tipo) return ''+codigoTipo;
	return tipo.nombre;
}

const codigoTipo = (maestro, nombreTipo) => {
	let tipo = maestro?.datos?.find(tipo => (tipo.nombre === nombreTipo));
	if (!tipo) return 0;
	return tipo.codigo;
}


export const TipoTransmision = ({ refFiltro }) => {


	const { maestroTipos } = useContext(ContextoMaestros);
	let nombresEstadosRelevantes = maestroTipos?.datos?.map(tipo => tipo.nombre) || [];

	const nodo = refFiltro?.current?.[RUTA_NODO];

	let modoFiltroActual = MODOS[0].id;
	let seleccionInicial = [];

	if (nodo) {
		modoFiltroActual = obtenerModoDeFiltro(nodo, MODOS) || MODOS[0].id
		seleccionInicial = Object.values(nodo)?.[0].map(codigoTipo => nombreTipo(maestroTipos, codigoTipo)) || []
	}

	const [tiposSeleccionados, _setTiposSeleccionados] = useState(seleccionInicial);
	const [modoFiltro, _setModoFiltro] = useState(modoFiltroActual);
	useEffect(() => {
		if (tiposSeleccionados.length && modoFiltro) {
			refFiltro.current[RUTA_NODO] = {
				[modoFiltro]: tiposSeleccionados.map(nombreTipo => codigoTipo(maestroTipos, nombreTipo))
			};
		} else {
			delete refFiltro.current[RUTA_NODO];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tiposSeleccionados, modoFiltro])



	return <BoxFiltro relleno={tiposSeleccionados?.length} modoFiltro={modoFiltro} >
		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Tipo de transmisión
			<ControlModoFiltro modo={modoFiltro} onChange={_setModoFiltro} listaModos={MODOS} />
		</Typography>

		<ControlTextoChip
			regexParticionado={/[\s\r\n\t,-.]+/}
			valor={tiposSeleccionados}
			onChange={_setTiposSeleccionados}
			label="Tipos"
			opciones={nombresEstadosRelevantes}
		/>

	</BoxFiltro>

}

export default TipoTransmision;