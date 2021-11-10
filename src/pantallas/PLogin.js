import React, { useCallback, useContext, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { Box, Collapse, IconButton, Alert, AlertTitle } from '@mui/material';

import ContextoAplicacion from 'contexto/contexto';
import BarraProgresoSuperior from '../navegacion/BarraProgresoSuperior';
import FediCommons from 'common/FediCommons';
import CloseIcon from '@mui/icons-material/Close';
import useApiFedicom from '../hooks/useApiFedicom';
import useEstadoCarga from 'hooks/useEstadoCarga';
import useTema from 'hooks/useTema';


const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	avatarAnonimo: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.grey.main,
	},

	cajaSuperior: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			marginTop: theme.spacing(4)
		}
	},
	cajaInferior: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(2),
		paddingTop: theme.spacing(1),
		borderTopStyle: 'dashed',
		borderTop: 2,
		borderTopColor: theme.palette.grey[300],
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	mensajeError: {
		width: '100%'
	}
}));


const LoginTextField = function ({ ...props }) {
	return <TextField
		variant="outlined"
		margin="normal"
		required
		fullWidth
		autoFocus
		{...props} />
}



export default function PantallaLogin() {
	useTema();
	const classes = useStyles();
	const { setJwt } = useContext(ContextoAplicacion);

	const refUsuario = useRef();
	const refPasword = useRef();

	const { getToken, getTokenObservador } = useApiFedicom();
	let { /*datos,*/ error, cargando, setDatos, setError, setCargando } = useEstadoCarga();




	const solicitarToken = useCallback(async function () {
		let usuario = refUsuario.current?.value
		let password = refPasword.current?.value

		setCargando(true);
		try {
			let respuesta = await getToken(usuario, password, 'HEFAME')
			if (respuesta.auth_token) {
				setDatos(respuesta);
				setJwt(respuesta.auth_token, respuesta.datos);
			} else {
				setError(respuesta);
			}
		} catch (error) {
			setError(error);
		}

	}, [setCargando, setDatos, setError, setJwt, refUsuario, refPasword, getToken]);

	const solicitarTokenObservador = useCallback(async function () {

		setCargando(true);
		try {
			let respuesta = await getTokenObservador()
			if (respuesta.auth_token) {
				setDatos(respuesta);
				setJwt(respuesta.auth_token, respuesta.datos);
			} else {
				setError(respuesta);
			}
		} catch (error) {
			setError(error);
		}

	}, [setCargando, setDatos, setError, setJwt, getTokenObservador])


	let alertaError = <Collapse in={error ? true : false} className={classes.mensajeError}>
		<Alert severity="error" className={classes.mensajeError}
			action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => { setError(null); }}>
				<CloseIcon fontSize="inherit" />
			</IconButton>
			}
		>
			<AlertTitle>Error</AlertTitle>
			{FediCommons.convertirErrorLlamadaFedicom(error)}
		</Alert>
	</Collapse>

	return (
		<Container component="main" maxWidth="xs">
			<BarraProgresoSuperior cargando={cargando} />
			<Box className={classes.cajaSuperior}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Identifíquese
				</Typography>



				<LoginTextField id="usuario" label="Usuario" name="usuario" autoComplete="user" inputRef={refUsuario} disabled={cargando} />
				<LoginTextField name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" inputRef={refPasword} disabled={cargando} />

				{alertaError}

				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={solicitarToken}
					disabled={cargando}
				>
					Acceder
				</Button>
			</Box>

			<Box className={classes.cajaInferior} >

				<Button
					type="submit"
					fullWidth
					variant="outlined"
					className={classes.submit}
					onClick={solicitarTokenObservador}
					disabled={cargando}
				>
					Acceso de monitorización
				</Button>


			</Box>
		</Container>
	);
}