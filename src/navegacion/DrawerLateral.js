import { Avatar, Box, Collapse, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, SwipeableDrawer, Typography } from "@mui/material";
import { VpnKey, Assessment, Business, CallSplit, Input, ChevronLeft, Dashboard, ExpandLess, ExpandMore, Filter2, Looks3, NearMe, Speed, Storage, Security, FindInPage } from "@mui/icons-material";
import ContextoAplicacion from "contexto/contexto";
import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { makeStyles } from "@mui/styles";

const DRAWER_WIDTH = 340;
const DRAWER_BGCOLOR = (theme) => theme.palette.primary.light;
const DRAWER_COLOR = (theme) => theme.palette.getContrastText(DRAWER_BGCOLOR(theme));
const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		width: DRAWER_WIDTH,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
		backgroundColor: DRAWER_BGCOLOR(theme),
		color: DRAWER_COLOR(theme),
	},
	drawerTitulo: {
		padding: theme.spacing(1.2, 0, 8),
		backgroundColor: DRAWER_BGCOLOR(theme),
		color: DRAWER_COLOR(theme),
	}
}));


function BotonMenu({ texto, icono, link, onClick, subMenu, esTitulo, cerrarDrawer }) {

	const [menuAbierto, setMenuAbierto] = useState(false);
	const cambiaEstadoMenu = useCallback(() => {
		if (!subMenu) return;
		setMenuAbierto(!menuAbierto);
	}, [subMenu, menuAbierto, setMenuAbierto])

	if (esTitulo) {
		return <ListSubheader disableSticky>{texto}</ListSubheader>
	}

	let propiedades = {};
	if (link && !subMenu) {
		propiedades.component = Link;
		propiedades.to = link;
	}

	let elementoMenu = null;
	if (subMenu) {
		if (onClick) {
			propiedades.onClick = () => {
				cambiaEstadoMenu();
				onClick();
			}
		}
		else {
			propiedades.onClick = cambiaEstadoMenu;
		}

		elementoMenu = <Collapse in={menuAbierto} timeout="auto" unmountOnExit>
			<Box paddingLeft={3}>
				{subMenu.map((m, i) => <BotonMenu key={i} cerrarDrawer={cerrarDrawer} {...m} />)}
			</Box>
		</Collapse>

	} else {
		if (onClick) {
			propiedades.onClick = () => {
				onClick()
				cerrarDrawer();
			}
		} else {
			propiedades.onClick = () => {
				cerrarDrawer();
			}
		}

	}

	return (
		<Box >
			<ListItem button {...propiedades} >
				<ListItemIcon key={`drawer-boton-${texto}`} style={{ minWidth: 0, paddingRight: '0.7em' }}>
					<Icon component={icono} fontSize="small" />
				</ListItemIcon>
				<ListItemText primary={texto} />
				{subMenu && (menuAbierto ? <ExpandLess /> : <ExpandMore />)}
			</ListItem>
			{elementoMenu}
		</Box>
	)
}


const BOTONES = [

	{ texto: "Dashboard", icono: Dashboard, link: '/' },

	{ texto: "Pedidos", esTitulo: true },
	{ texto: "Fedicom 3", icono: Looks3, link: '/fedicom3/pedidos' },
	{ texto: "Proyman / Fedicom 2", icono: Filter2, link: '/' },
	{
		texto: "Informes", icono: Assessment, subMenu: [
			{ texto: "Pedidos por almacén", icono: Business, link: '/' },
			{ texto: "Pedidos por servidor SAP", icono: Storage, link: '/' },
		]
	},


	{ texto: "Monitorización", esTitulo: true },
	{ texto: "Base de datos", icono: Storage, link: '/monitor/mongodb' },
	{ texto: "Instancias", icono: Speed, link: '/monitor/instancias' },
	{
		texto: "Balanceo de carga", icono: CallSplit, subMenu: [
			{ texto: "Entrada pedidos", icono: Input, link: '/balanceadores/fedicom3' },
			{ texto: "Servidores SAP", icono: Storage, link: '/balanceadores/sap' },
		]
	},


	{ texto: "Herramientas", esTitulo: true },
	{
		texto: "Simuladores Fedicom3", icono: NearMe, subMenu: [
			{ texto: "Pedidos", icono: NearMe, link: '/' },
			{ texto: "Devoluciones", icono: NearMe, link: '/' },
			{ texto: "Logística", icono: NearMe, link: '/' },
			{ texto: "Consultas", icono: FindInPage, link: '/' },
			{ texto: "Test de stress", icono: Security, link: '/' },
		]
	},
	{ texto: "Gestión de tokens", icono: VpnKey, link: '/herramientas/tokens' },
	// { texto: "Visor de tramas Fedicom2", icono: Translate, link: '/utilidades/visorTramasFedicom2' },


]


export default function DrawerLateral({ open, onClose, onOpen }) {

	const { getUsuario } = useContext(ContextoAplicacion);
	const classes = useStyles();
	const usuario = getUsuario();

	if (!usuario) return null;

	return <SwipeableDrawer
		sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}
		anchor="left"
		open={open}
		onClose={onClose}
		onOpen={onOpen}
		classes={{ paper: classes.drawerPaper, }}
	>
		<div className={classes.drawerHeader}>
			<IconButton onClick={onClose}>
				<ChevronLeft />
			</IconButton>
		</div>

		<div className={classes.drawerTitulo}>
			<Box display="flex" justifyContent="center" width="100%">
				<Avatar sx={{ bgcolor: 'primary.dark', fontSize: '60px', width: 100, height: 100 }}>
					{usuario.token.permanente ? <VisibilityRoundedIcon /> : usuario.nombre.substring(0, 1)}
				</Avatar>
			</Box>
			<Box display="flex" justifyContent="center">
				<Typography variant="h6" component="div" sx={{ color: "primary" }}>{usuario.nombre}</Typography>
			</Box>
		</div>

		<List >
			{
				BOTONES.map((boton, i) => <BotonMenu key={i} cerrarDrawer={onClose} {...boton} />)
			}
		</List>

	</SwipeableDrawer>

}