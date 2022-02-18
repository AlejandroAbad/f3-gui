import { useState, forwardRef, useRef } from 'react';
import { Container, Typography, IconButton, Button, Dialog, AppBar, Toolbar, Slide } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import FormularioFiltroPedidosEstandard from './FormularioFiltroPedidosEstandard';
import clone from 'clone';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


export default function BotonFiltrosPedido({ filtro, setFiltro }) {

	const [dialogoAbierto, setDialogoAbierto] = useState(false);
	const refFiltros = useRef(filtro);

	const abrirDialogo = () => {
		setDialogoAbierto(true);
	};

	const descartarCambiosYCerrarDialogo = () => {
		setDialogoAbierto(false);
	};

	const aplicarCambiosYCerrarDialogo = () => {

		setFiltro(clone(refFiltros.current));
		setDialogoAbierto(false);
		
	}

	const resetearFormulario = () => {

	}

	return (<>
		<Button variant="outlined" onClick={abrirDialogo} startIcon={<FilterAltIcon />}>
			Filtros
		</Button>

		<Dialog fullScreen open={dialogoAbierto} onClose={descartarCambiosYCerrarDialogo} TransitionComponent={Transition} >
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={descartarCambiosYCerrarDialogo}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Filtros de pedido
					</Typography>
					<Button sx={{ mr: 3 }} color="inherit" onClick={resetearFormulario}>
						Resetear
					</Button>
					<Button autoFocus variant="outlined" color="inherit" onClick={aplicarCambiosYCerrarDialogo}>
						Aplicar
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="xl" sx={{ mt: 0, pl: 1, pr: 8, py: 4 }}>
				<FormularioFiltroPedidosEstandard filtroActual={filtro} refFiltro={refFiltros} />
			</Container>
		</Dialog>
	</>

	);
}
