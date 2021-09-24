import { AppBar, Avatar, Button, CardHeader, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { green, red } from "@mui/material/colors";
import useMediaQuery from '@mui/material/useMediaQuery';
import { AccessTime, Close, GitHub, OpenInNew, Speed, ThumbDown, ThumbUp } from '@mui/icons-material';
import { format, formatDistance, fromUnixTime } from 'date-fns';
import es from 'date-fns/locale/es';
import { memo } from 'react';


const useStyles = makeStyles((theme) => ({
	contenidoFullScreen: {
		marginTop: theme.spacing(8)
	},
	avatarOk: {
		color: '#fff',
		backgroundColor: green[500],
	},
	avatarError: {
		color: '#fff',
		backgroundColor: red[500],
	},
	contenedorTituloVersion: {
		margin: theme.spacing(0.5, 0, 0),
	},
	contenedorTituloGit: {
		margin: theme.spacing(0, 0, 1),
		display: 'flex',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(0.5, 1, 0.5, 0),
		},
	},
	contenedorTituloFechaInicio: {
		margin: theme.spacing(0, 0, 1, 0),
	},
	contenedorTituloProcesos: {
		margin: theme.spacing(1, 0, 1.5, 0),
	},
	contenedorProcesos: {
		marginLeft: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0, 1, 1, 0),
		},
	},
	cantidadProcesos: {
		color: theme.palette.primary.contrastText + ' !important',
		backgroundColor: theme.palette.primary.main,
	},
	avatarGit: {
		marginLeft: theme.spacing(2),
		color: theme.palette.grey[900] + ' !important',
		backgroundColor: theme.palette.primary.contrastText + ' !important',
	},
}));




function DialogoDetalleInstancia({ visible, onOcultar, instancia }) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { servidor, inicio, ultimoTick, version, procesos } = instancia;




	let segundosDesdeUltimoTick = ((new Date()).getTime() - ultimoTick) / 1000
	let enError = segundosDesdeUltimoTick > 20;
	let iconoAvatar = (enError) ? <Avatar sx={{ bgcolor: theme.palette.error.main }}><ThumbDown /></Avatar>
		: <Avatar sx={{ bgcolor: theme.palette.success.main }}><ThumbUp /></Avatar>;

	let distanciaActivo = formatDistance(fromUnixTime(ultimoTick / 1000), new Date(), { includeSeconds: true, addSuffix: true, locale: es })
	let distanciaInicio = format(fromUnixTime(inicio / 1000), 'PPPp', { weekStartsOn: 1, locale: es })
	let fechaCommitGit = format(fromUnixTime(version.git.timestamp / 1000), 'PPPPpp', { weekStartsOn: 1, locale: es })

	let listaProcesos = procesos.map( proceso => {
		return <ListItem key={proceso.id} sx={{ pl: 6 }}>
			<ListItemAvatar><Avatar sx={{ bgcolor: theme.palette.primary.main }}>{proceso.id}</Avatar></ListItemAvatar>
			<ListItemText primary={proceso.tipo} secondary={`PID ${proceso.pid}`} />
		</ListItem>;
	})

	return <Dialog fullWidth maxWidth="lg" fullScreen={fullScreen} open={visible} onClose={onOcultar} >
		{
			fullScreen &&
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={onOcultar} aria-label="close">
						<Close />
					</IconButton>
					<Typography variant="h6" >
						Detalles de instancia
					</Typography>
				</Toolbar>
			</AppBar>
		}

		<DialogContent className={fullScreen ? classes.contenidoFullScreen : ''}>

			<CardHeader
				avatar={iconoAvatar}
				title={<Typography variant="h6" component="h2">{servidor.toUpperCase()}</Typography>}
				subheader={`Visto ${distanciaActivo}`}
			/>
			<Divider />
			<List dense >
				<ListItem>
					<ListItemAvatar><Avatar><AccessTime /></Avatar></ListItemAvatar>
					<ListItemText primary="Hora de inicio del servicio" secondary={distanciaInicio} />
				</ListItem>
			</List>
			<Divider />
			<List dense>
				<ListItem>
					<ListItemAvatar><Avatar>V</Avatar></ListItemAvatar>
					<ListItemText primary="Versión del servidor" secondary={version.servidor} />
				</ListItem>
				<ListItem>
					<ListItemAvatar><Avatar>P</Avatar></ListItemAvatar>
					<ListItemText primary="Versión del protocolo" secondary={version.protocolo} />
				</ListItem>
				<ListItem>
					<ListItemAvatar><Avatar>DB</Avatar></ListItemAvatar>
					<ListItemText primary="Versión de transacciones MongoDB" secondary={version.baseDatos} />
				</ListItem>
				<ListItem>
					<ListItemAvatar><Avatar><GitHub /></Avatar></ListItemAvatar>
					<ListItemText primary={<>Git<Button variant="link" size="small" startIcon={<OpenInNew />} href={`https://github.com/AlejandroAbad/f3/commit/${version.git.commit}`}
						target="_blank"
						rel="noopener"
					>{version.git.commit}</Button></>} secondary={`Commit realizado el ${fechaCommitGit}`} />
				</ListItem>
			</List>
			<Divider />
			<List dense>
				<ListItem>
					<ListItemAvatar><Avatar><Speed /></Avatar></ListItemAvatar>
					<ListItemText primary="Procesos" secondary="" />
				</ListItem>

				<List dense component="div" disablePadding>
					{listaProcesos}
				</List>

			</List>




		</DialogContent>
		<DialogActions>
			<Button onClick={onOcultar} color="primary" autoFocus>
				Cerrar
			</Button>
		</DialogActions>
	</Dialog >
}

export default memo(DialogoDetalleInstancia);