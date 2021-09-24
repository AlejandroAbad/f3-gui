import { Alert, AlertTitle, Avatar, Backdrop, Box, Chip, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ContextoAplicacion from "contexto";
import { format, fromUnixTime } from "date-fns";
import TituloPantalla from "navegacion/TituloPantalla";
import { useContext } from "react";
import ReactJson from "react-json-view";






const useStyles = makeStyles((theme) => ({
	carta: {
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2, 4)
	},
	permisos: {
		marginTop: theme.spacing(2),
	},
	permiso: {
		margin: theme.spacing(1, 1, 0, 0),
	},
	token: {
		fontFamily: 'Consolas, monospace',
		//fontSize: '0.7rem',
		overflowWrap: "anywhere",
		backgroundColor: theme.palette.grey[200],
		borderRadius: 4,
		padding: theme.spacing(2, 4),
		margin: theme.spacing(2, 0)
	},
	titulo: {
		fontSize: 12,
	},
	valorFecha: {
		paddingLeft: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}));




function CartaDatosUsuario() {

	const classes = useStyles();
	const { getUsuario } = useContext(ContextoAplicacion);

	const usuario = getUsuario();

	if (!usuario) {
		return (
			<Backdrop open >
				<CircularProgress color="inherit" />
			</Backdrop>
		)
	}

	if (usuario.token?.permanente) {
		return (
			<Paper elevation={3} className={classes.carta}>
				<Typography className={classes.titulo} color="textSecondary" gutterBottom>
					Datos del usuario
				</Typography>

				<Alert severity="warning">
					<AlertTitle>Sesión de monitorización</AlertTitle>
					Esta sesión se abrió solo para la monitorización de ciertos valores del sistema.
					Como tal, esta sesión nunca caduca, lo que permite mantener la pantalla activa indeterminadamente para monitorizar el estado del sistema.
				</Alert>
			</Paper>)
	}

	return (
		<Paper elevation={3} className={classes.carta}>

			<Typography variant="overline" className={classes.titulo} color="textSecondary" gutterBottom>
				Datos del usuario
			</Typography>
			<Typography variant="h5" component="h2">
				{usuario.nombre}
			</Typography>
			<Typography className={classes.pos} color="textSecondary">
				{usuario.dominio}
			</Typography>

			{(usuario.grupos?.length > 0) &&
				<Typography color="textSecondary" marginTop={2}>
					Permisos del usuario: <br /> {
						usuario.grupos.map((p, i) =>
							<Chip
								key={i}
								className={classes.permiso}
								label={p.substring(5)}
								variant="outlined"
								color="primary"
								avatar={<Avatar>{p.substring(5, 6)}</Avatar>}
							/>
						)
					}
				</Typography>
			}


		</Paper>
	)


}


function CartaDatosTokenFedicom3() {

	const classes = useStyles();
	const { getJwt, getUsuario } = useContext(ContextoAplicacion);

	const usuario = getUsuario();
	const jwt = getJwt();

	if (!usuario) {
		return (
			<Backdrop open >
				<CircularProgress color="inherit" />
			</Backdrop>
		)
	}

	if (usuario.token?.permanente) {
		return null;
	}


	let fechaEmision = fromUnixTime(usuario.token?.fechaEmision);
	let fechaExpiracion = fromUnixTime(usuario.token?.fechaExpiracion);

	return (
		<Paper elevation={3} className={classes.carta}>
			<Typography variant="overline" className={classes.titulo} color="textSecondary" >
				Datos del token
			</Typography>



			<Typography color="textSecondary"  >
				Fecha de emisión:
			</Typography>

			<Typography variant="subtitle1" gutterBottom className={classes.valorFecha} >
				{format(fechaEmision, 'PPPP')}
			</Typography>

			<Typography color="textSecondary" >
				Válido hasta:
			</Typography>

			<Typography variant="subtitle1" className={classes.valorFecha}  >
				{format(fechaExpiracion, 'PPPP')}
			</Typography>

			<Typography color="textSecondary">
				Contenido del token:
			</Typography>

			<Box className={classes.token}>
				<ReactJson src={usuario.token?.bruto} displayDataTypes={false} collapsed={false} title="jwt" />
			</Box>


			<Box className={classes.token}>
				<code>{jwt}</code>
			</Box>




		</Paper>
	)
}


export default function PantallaUsuario() {

	return (
		<Container fixed maxWidth="xl">
			<TituloPantalla titulo="Datos de la sesión" />
			<CartaDatosUsuario />
			<CartaDatosTokenFedicom3 />
		</Container>
	)


}