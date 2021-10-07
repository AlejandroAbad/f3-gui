import { useState } from "react";
import { Paper, Typography } from "@mui/material"
import { ControlTextoChip } from "common/camposFormulario/ControlTextoChip";
import ControlModoFiltro from "common/camposFormulario/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";




const MODOS = [
	{ texto: 'Incluye', color: 'primary', icono: <AddCircleOutline /> },
	{ texto: 'NO incluye', color: 'error', icono: <RemoveCircleOutline /> },
	{ texto: 'Filtro desactivado', color: 'inherit', icono: <PauseCircleOutline /> }
]


export const CodigoCliente = ({ codigoCliente, setCodigoCliente }) => {

	const [seleccionActual, setSeleccionActual] = useState([]);
	const [modoFiltro, setModoFiltro] = useState(0);

	

	const estiloPaper = {
		m: 0,
		mb: 2,
		p: 4,
		pt: 3,
		bgcolor: modoFiltro === 2 ? 'grey.100' : '',
		border: 1,
		borderColor: (modoFiltro !== 2 && seleccionActual?.length) ? modoFiltro === 1 ? 'error.main' : 'primary.main' : 'grey.100',
	}

	return <Paper elevation={modoFiltro === 2 ? 1 : 5} sx={estiloPaper} >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Código de cliente
			<ControlModoFiltro modo={modoFiltro} onChange={setModoFiltro} listaModos={MODOS} />
		</Typography>

		<ControlTextoChip
			regexValidacion={/^[0-9]{1,10}/i}
			regexParticionado={/[\s\r\n\t,-.]+/}
			valor={seleccionActual}
			onChange={setSeleccionActual}
			label="Códigos de cliente"
		/>



	</Paper>

}


export default CodigoCliente;