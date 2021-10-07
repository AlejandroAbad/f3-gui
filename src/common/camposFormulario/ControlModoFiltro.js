import { memo, useCallback } from "react";
import { Button } from "@mui/material";


const ControlModoFiltro = ({ listaModos, modo, onChange }) => {
	
	const avanzaModo = useCallback(() => {
		let indiceActual = modo + 1;
		indiceActual %= listaModos.length;
		onChange(indiceActual);
	}, [listaModos, modo, onChange])


	if (listaModos.length === 0) {
		console.error('La lista de modos no puede estar vacía!!');
		return null;
	}

	let modoSeleccionado = listaModos[modo];

	return <Button
		size="small"
		disableElevation
		color={modoSeleccionado.color}
		sx={{ ml: 2, mb: 0.1 }}
		startIcon={modoSeleccionado.icono}
		onClick={avanzaModo}
	>
		{modoSeleccionado.texto}
	</Button>

}

export default memo(ControlModoFiltro);