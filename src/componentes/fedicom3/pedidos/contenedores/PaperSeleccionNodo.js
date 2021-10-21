import { Chip, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { memo, useContext, useState } from "react";
import ContextoPedido from "../ContextoPedido";

import ContextoMaestros from "contexto/contextoMaestros";


const PaperSeleccionNodo = ({ idNodoSeleccionado, setIdNodoSeleccionado }) => {

	const { pedido } = useContext(ContextoPedido);
	let { maestroEstados } = useContext(ContextoMaestros);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	if (!idNodoSeleccionado) return;


	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, idNodo) => {
		setIdNodoSeleccionado(idNodo);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	let opcionesMenu = pedido.nodos.map((nodo, i) => {

		let infoEstado = maestroEstados.datos?.find(e => e.codigo === nodo.estado) || { color: 'primary', nombre: nodo.estado };
		let iconoPrevio = null;
		if (nodo.es.vigente) {
			iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>★</Typography>
		} else if (nodo.es.informado) {
			iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>☄</Typography>
		}

		return <MenuItem key={nodo.id} selected={nodo.id === idNodoSeleccionado} onClick={(event) => handleMenuItemClick(event, nodo.id)} >
			<Typography variant="caption">{nodo.id.toUpperCase()}</Typography>
			<Chip sx={{ mx: 2, px: 1 }} size="small" color={infoEstado.color} label={<>{iconoPrevio}{infoEstado.nombre}</>} />
			<Typography variant="body2">{nodo.fechaCreacion}</Typography>
		</MenuItem>
	});

	let nodoSeleccionado = pedido.nodos.find(n => n.id === idNodoSeleccionado);
	let infoEstado = maestroEstados.datos?.find(e => e.codigo === nodoSeleccionado.estado) || { color: 'primary', nombre: nodoSeleccionado.estado };
	let iconoPrevio = null;
	if (nodoSeleccionado.es.vigente) {
		iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>★</Typography>
	} else if (nodoSeleccionado.es.informado) {
		iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>☄</Typography>
	}

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >

		<Typography variant='h5' component="h2" sx={{ mb: 0 }} >
			{opcionesMenu.length > 1 ? 'Seleccione transmisión' : 'Transmisión'}
		</Typography>

		<List component="nav" >
			<ListItem button={opcionesMenu.length > 1} onClick={opcionesMenu.length > 1 ? handleClickListItem : null} >
				<ListItemText
					primary={<Typography variant='h6' component="div">{nodoSeleccionado.id.toUpperCase()}</Typography>}
					secondary={<Typography variant="body2">{nodoSeleccionado.fechaCreacion}</Typography>}
				/>
				<ListItemAvatar>
					<Chip sx={{ px: 1 }} color={infoEstado.color} label={<>{iconoPrevio}{infoEstado.nombre}</>} />
				</ListItemAvatar>
			</ListItem>

		</List>
		{opcionesMenu.length > 1 &&
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ style: { maxHeight: 48 * 4.5 } }}	>
				{opcionesMenu}
			</Menu>
		}


	</Paper>

}



export default memo(PaperSeleccionNodo);