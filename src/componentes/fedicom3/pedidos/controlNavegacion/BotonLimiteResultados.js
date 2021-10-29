import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const OPCIONES_POR_DEFECTO = [];

OPCIONES_POR_DEFECTO[5] = 'Mostrar 5 por página';
OPCIONES_POR_DEFECTO[10] = 'Mostrar 10 por página';
OPCIONES_POR_DEFECTO[25] = 'Mostrar 25 por página';
OPCIONES_POR_DEFECTO[50] = 'Mostrar 50 por página';


export default function BotonLimiteResultados({ limite, cambiaLimite, opciones, ...props }) {

	const [menuAbierto, setMenuAbierto] = useState(false);
	const refPopper = useRef(null);

	if (!opciones) {
		opciones = OPCIONES_POR_DEFECTO;
	}


	const cambiaElementoSeleccionado = (_, index) => {
		cambiaLimite(index);
		setMenuAbierto(false);
	};

	const cambiaEstadoMenu = () => {
		setMenuAbierto((estado) => !estado);
	};

	const cierraMenu = (event) => {
		if (refPopper.current && refPopper.current.contains(event.target)) return;
		setMenuAbierto(false);
	};

	return (
		<>
			<Button {...props} endIcon={<ArrowDropDownIcon />} ref={refPopper} variant="link" size="small" onClick={cambiaEstadoMenu}  >
				{opciones[limite]}
			</Button>
			<Popper open={menuAbierto} anchorEl={refPopper.current} placement="bottom-end" disablePortal >
				<Paper style={{ zIndex: 2 }} >
					<ClickAwayListener onClickAway={cierraMenu}>
						<MenuList>
							{opciones.map((valor, clave) => (
								<MenuItem key={valor} selected={clave === limite} onClick={(_) => cambiaElementoSeleccionado(_, clave)}>
									{valor}
								</MenuItem>
							))}
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</>
	);
}
