import { useCallback, useState } from "react";
import { Box, Button, Grid,  Paper } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ControlModoFiltro from "common/camposFormulario/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";




const useStyles = makeStyles((theme) => ({
	boxSelector: {
		margin: theme.spacing(0, 0, 2),
		padding: theme.spacing(1, 4, 4)
	},
	boxSelectorDisabled: {
		backgroundColor: theme.palette.grey[200]
	}
}));

const MODOS = [
	{ texto: 'es alguno de', color: 'success', icono: <AddCircleOutline /> },
	{ texto: 'NO es ninguno de', color: 'danger', icono: <RemoveCircleOutline /> },
	{ texto: 'Filtro desactivado', color: 'mutted', icono: <PauseCircleOutline /> }
]


const BotonEstado = ({ estados, seleccionActual, setSeleccionActual, children }) => {

	const estaSeleccionado = useCallback(() => {
		let aparecenTodos = true;
		estados.forEach(estado => {
			aparecenTodos &= seleccionActual.includes(estado);
		})
		return aparecenTodos;
	}, [estados, seleccionActual])

	let [seleccionado, setSeleccionado] = useState(estaSeleccionado());

	const cambiarSeleccion = () => {
		if (seleccionado) {
			setSeleccionActual(seleccionActual.filter(estado => !estados.includes(estado)))
		} else {
			setSeleccionActual([...seleccionActual, ...estados])
		}

		setSeleccionado(!seleccionado);
	}

	return <Grid item>
		<Button variant={seleccionado ? "contained" : "outlined"} color={seleccionado ? "primary" : "default"} onClick={cambiarSeleccion} 	>
			{children}
		</Button >
	</Grid>
}

export const EstadoTransmision = () => {

	const classes = useStyles();
	const [seleccionActual, setSeleccionActual] = useState([]);
	const [modoFiltro, setModoFiltro] = useState(0);

	let propiedadesBotones = { seleccionActual, setSeleccionActual };

	return <Box component={Paper} elevation={modoFiltro === 2 ? 1 : 3} className={`${classes.boxSelector} ${modoFiltro === 2 && classes.boxSelectorDisabled}`} >

		<h3>Estado del pedido <ControlModoFiltro modo={modoFiltro} onChange={setModoFiltro} listaModos={MODOS} /></h3>

		<Grid container spacing={1} justify="space-start" alignItems="center">
			<BotonEstado estados={[1010, 1020, 1030, 8010]} {...propiedadesBotones} >PROCESANDO</BotonEstado>
			<BotonEstado estados={[9900]} {...propiedadesBotones}>COMPLETADO</BotonEstado>
			<BotonEstado estados={[3010, 3011, 3020, 3120]} {...propiedadesBotones}>RECHAZADO</BotonEstado >
			<BotonEstado estados={[3110]} {...propiedadesBotones}>NO SAP</BotonEstado >
			<BotonEstado estados={[8100, 9140]} {...propiedadesBotones}>ERROR BAPI</BotonEstado >
		</Grid>


	</Box>


}


export default EstadoTransmision;