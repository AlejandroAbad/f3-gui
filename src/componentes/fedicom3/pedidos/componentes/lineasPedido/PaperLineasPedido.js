import { Button, Checkbox, ClickAwayListener, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemIcon, ListItemText, MenuList, Pagination, Paper, Popper, Table, TableBody, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useContext, useState } from "react"
import ContextoPedido from "../../ContextoPedido";
import BotonLimiteResultados from "../../controlNavegacion/BotonLimiteResultados";
import InfoLineaPedido from "./InfoLineaPedido";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import { RiFilterOffFill, RiFilterFill } from 'react-icons/ri';

import BannerVacio from "common/BannerVacio";
import BannerError from "common/BannerError";



const MenuNavegacionLineas = ({ cambiaEstadoMenu, menuFiltroAbierto, refMenuFiltro, cierraMenu, filtros, cambiaFiltro, resultadosPorPagina, setResultadosPorPagina, totalPaginas, paginaActual, setPaginaActual }) => {

	return <Paper square elevation={0} sx={{ p: 0, pb: 1, my: 1 }}>
		<Grid container direction="row" justifyContent="space-between" alignItems="flex-start" >
			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "top" }}>
				<Button endIcon={<ArrowDropDownIcon />} variant="link" size="small" onClick={cambiaEstadoMenu}>
					FILTROS
				</Button>
				<Popper open={menuFiltroAbierto} anchorEl={refMenuFiltro} placement="bottom-start" >
					<Paper elevation={4}>
						<ClickAwayListener onClickAway={cierraMenu} >
							<MenuList>
								<FormGroup sx={{ ml: 3 }}>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fFaltas'] === 1} indeterminate={filtros['fFaltas'] === 2}
												onChange={() => cambiaFiltro('fFaltas')}
												name="fFaltas"
												color={filtros['fFaltas'] === 2 ? 'error' : 'primary'} />
										}
										label="Incidencias"
									/>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fEstupe'] === 1} indeterminate={filtros['fEstupe'] === 2}
												onChange={() => cambiaFiltro('fEstupe')}
												name="fEstupe"
												color={filtros['fEstupe'] === 2 ? 'error' : 'primary'} />
										}
										label="Estupefacientes"
									/>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fRebote'] === 1} indeterminate={filtros['fRebote'] === 2}
												onChange={() => cambiaFiltro('fRebote')}
												name="fRebote"
												color={filtros['fRebote'] === 2 ? 'error' : 'primary'} />
										}
										label="Aplazados/Rebotados"
									/>
								</FormGroup>
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Popper>

				<BotonLimiteResultados limite={resultadosPorPagina} cambiaLimite={setResultadosPorPagina} />
			</Box>


			{totalPaginas > 1 &&
				<Box sx={{ width: '33%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<Pagination sx={{ p: 0, m: 0 }} count={totalPaginas} page={paginaActual} onChange={(_, pagina) => setPaginaActual(pagina)} color="primary" />
				</Box>
			}

		</Grid>
	</Paper>

}

const PaperLineasPedido = () => {

	const { pedido } = useContext(ContextoPedido);
	const [menuFiltroAbierto, setMenuFiltroAbierto] = useState(false);
	const [refMenuFiltro, setRefMenuFiltro] = useState(null);
	const [filtros, setFiltros] = useState({ fFaltas: 0, fEstupe: 0, fRebote: 0 });
	const [resultadosPorPagina, setResultadosPorPagina] = useState(5);
	const [paginaActual, setPaginaActual] = useState(1);

	let lineas = pedido.lineas;

	// Caso en el que no existen lineas en el pedido!
	if (!lineas?.length) {
		return <Paper elevation={10} sx={{ p: 1, pt: 3, pb: 2 }}>
			<Typography sx={{ px: 2 }} variant='h5' component="h2">Posiciones</Typography>
			<BannerError titulo="El pedido no tiene posiciones." />
		</Paper>
	}

	const cambiaFiltro = (tipo) => {
		setFiltros(filtroActual => {
			return {
				...filtroActual,
				[tipo]: (filtroActual[tipo] + 1) % 3
			}
		});
		setPaginaActual(1)
	};
	const cambiaEstadoMenu = (event) => {
		setRefMenuFiltro(event.currentTarget);
		setMenuFiltroAbierto((estado) => !estado);
	};
	const cierraMenu = (event) => {
		if (refMenuFiltro && refMenuFiltro.contains(event.target)) return;
		setMenuFiltroAbierto(false);
	};

	let lineasFiltradas = lineas.filter(l => {
		let tieneFaltas = (l.incidencias && l.incidencias.length > 0);

		if (filtros.fFaltas === 1 && !tieneFaltas) return false;
		if (filtros.fFaltas === 2 && tieneFaltas) return false;

		if (filtros.fEstupe === 1 && !l.valeEstupefaciente) return false;
		else if (filtros.fEstupe === 2 && l.valeEstupefaciente) return false;

		let tieneRebote = (l.codigoAlmacenServicio !== pedido.codigoAlmacenServicio)
		if (filtros.fRebote === 1 && !tieneRebote) return false;
		else if (filtros.fRebote === 2 && tieneRebote) return false;

		return true;

	});

	const totalPaginas = parseInt((lineasFiltradas.length / resultadosPorPagina) + (lineasFiltradas.length % resultadosPorPagina === 0 ? 0 : 1)) || 1;
	const primerResultadoMostrado = ((paginaActual - 1) * resultadosPorPagina) + 1;
	const ultimoResultadoMostrado = Math.min(paginaActual * resultadosPorPagina, lineasFiltradas.length);

	lineasFiltradas = lineasFiltradas.slice(primerResultadoMostrado - 1, ultimoResultadoMostrado);





	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
		<Typography variant='h5' component="h2">Posiciones</Typography>

		{lineas.length > 10 &&
			<MenuNavegacionLineas {...{ cambiaEstadoMenu, menuFiltroAbierto, refMenuFiltro, cierraMenu, filtros, cambiaFiltro, resultadosPorPagina, setResultadosPorPagina, totalPaginas, paginaActual, setPaginaActual }} />
		}

		{((filtros.fEstupe + filtros.fFaltas + filtros.fRebote) > 0) &&
			<List dense sx={{ bgcolor: 'grey.100', p: 0, pt: 0.3 }} >
				<ListItem>
					<ListItemIcon>{filtros.fFaltas === 1 && <RiFilterFill />}{filtros.fFaltas !== 2 || <RiFilterOffFill />}</ListItemIcon>
					{filtros.fFaltas === 1 && <ListItemText primary='Mostrando filas con incidencias' />}
					{filtros.fFaltas === 2 && <ListItemText primary='Excluyendo filas con incidencias' />}
				</ListItem>
				<ListItem>
					<ListItemIcon>{filtros.fEstupe === 1 && <RiFilterFill />}{filtros.fEstupe !== 2 || <RiFilterOffFill />}</ListItemIcon>
					{filtros.fEstupe === 1 && <ListItemText primary='Mostrando filas con estupefacientes' />}
					{filtros.fEstupe === 2 && <ListItemText primary='Excluyendo filas con estupefacientes' />}
				</ListItem>
				<ListItem>
					<ListItemIcon>{filtros.fRebote === 1 && <RiFilterFill />}{filtros.fRebote !== 2 || <RiFilterOffFill />}</ListItemIcon>
					{filtros.fRebote === 1 && <ListItemText primary='Mostrando filas con rebote de faltas o con servicio aplazado' />}
					{filtros.fRebote === 2 && <ListItemText primary='Excluyendo filas con rebote de faltas o con servicio aplazado' />}
				</ListItem>
			</List>
		}

		{lineasFiltradas.length > 0 ?
			<Table aria-label="collapsible table">
				<TableBody>
					{lineasFiltradas.map((linea, i) => (
						<InfoLineaPedido key={i} linea={linea} almacenOriginal={pedido.codigoAlmacenServicio} />
					))}
				</TableBody>
			</Table>
			:
			<BannerVacio titulo="Ninguna línea cumple el filtro seleccionado." />
		}

	</Paper>

}

export default memo(PaperLineasPedido);