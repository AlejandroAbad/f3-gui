import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ContextoAplicacion from 'contexto';
import { Divider, ListItemIcon, Snackbar } from '@mui/material';



import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}
}));

export default function MenuSuperior({ onMenuClicked, ...props }) {

	const classes = useStyles();
	const { getJwt, setJwt } = useContext(ContextoAplicacion);

	const jwt = getJwt();


	const [anchorEl, setAnchorEl] = useState(null);
	const [alertaCaducado, setAlertaCaducado] = useState(false);

	const open = Boolean(anchorEl);

	const abrirMenuUsuario = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const cerrarMenuUsuario = () => {
		setAnchorEl(null);
	};

	async function ejecutarLogout() {
		cerrarMenuUsuario();
		setJwt(null, null);
	}

	return (
		<AppBar position="fixed" className={classes.appBar} {...props}  >
			<Toolbar>
				{jwt && (
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onMenuClicked}>
						<MenuIcon />
					</IconButton>
				)}


				<Typography variant="h6" className={classes.title}>
					Big Brother <small>is watching you</small>
				</Typography>


				<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
					open={alertaCaducado}
					message="Sesión caducada."
					onClose={() => setTimeout(() => setAlertaCaducado(false), 2000)}
					action={
						<IconButton size="small" aria-label="close" color="inherit" onClick={() => { setAlertaCaducado(false) }}>
							<Close fontSize="small" />
						</IconButton>
					}
				/>


				{jwt && (
					<div>
						<IconButton
							aria-label="cuenta del usuario"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={abrirMenuUsuario}
							color="inherit"
						>
							{/*tiempoRestanteToken < K.ALERTA_EXPIRACION_TOKEN ?
								<Badge badgeContent='!' color="secondary" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
									<AccountCircle />
								</Badge>
								:
								<AccountCircle />
							*/}
							<AccountCircle />
						</IconButton>


						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'right', }}
							open={open}
							onClose={cerrarMenuUsuario}
						>

							<MenuItem component={Link} to='/usuario' onClick={cerrarMenuUsuario} >
								<ListItemIcon>
									<AccountBoxRoundedIcon fontSize="small" />
								</ListItemIcon>
								Información de usuario
							</MenuItem>
							<MenuItem onClick={cerrarMenuUsuario} >
								<ListItemIcon>
									<InfoRoundedIcon fontSize="small" />
								</ListItemIcon>
								Acerca de ...</MenuItem>
							<Divider />
							<MenuItem onClick={ejecutarLogout}>
								<ListItemIcon>
									<ExitToAppRoundedIcon fontSize="small" />
								</ListItemIcon>
								Cerrar sesión
							</MenuItem>

						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}
