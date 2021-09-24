import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { makeStyles } from "@mui/styles";
import { DeleteOutline, GitHub, ThumbDown, ThumbUp } from "@mui/icons-material";
import { format, formatDistance, fromUnixTime } from "date-fns";
import { memo, useCallback, useState } from "react";
import { es } from 'date-fns/locale'
import DialogoDetalle from "./DialogoDetalle";
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles((theme) => ({

	contenidoCarta: {
		padding: theme.spacing(0, 1.5, 2)
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
	botoneraInferior: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
}));



const PaperInstancia = ({ instancia }) => {


	let classes = useStyles();
	let theme = useTheme();
	let { descartarEstadoInstancia } = useApiFedicom();
	let { setCargando, setDatos, setError, cargando } = useEstadoCarga();



	let { _id: servidor, inicio, timestamp: ultimoTick, version, procesos } = instancia;


	let onDescartarEstadoInstancia = useCallback(async () => {

		setCargando(true);
		try {
			let respuestaBorrado = await descartarEstadoInstancia(servidor);
			setDatos(respuestaBorrado)
		} catch (error) {
			setError(error)
		}

	}, [descartarEstadoInstancia, servidor, setCargando, setDatos, setError])

	

	let [mostarDetalle, setMostrarDetalle] = useState(false)

	// CALCULO DE VARIABLES PARA PINTA Y COLOREA
	let segundosDesdeUltimoTick = ((new Date()).getTime() - ultimoTick) / 1000
	let enError = segundosDesdeUltimoTick > 20;
	let inactivo = segundosDesdeUltimoTick > 300;
	let iconoAvatar = (enError) ? <Avatar sx={{ bgcolor: theme.palette.error.main }}><ThumbDown /></Avatar>
		: <Avatar sx={{ bgcolor: theme.palette.success.main }}><ThumbUp /></Avatar>;
	let distanciaActivo = formatDistance(fromUnixTime(ultimoTick / 1000), new Date(), { includeSeconds: true, addSuffix: true, locale: es })
	let distanciaInicio = format(fromUnixTime(inicio / 1000), 'PPPp', { weekStartsOn: 1, locale: es })
	let fechaCommitGit = format(fromUnixTime(version.git.timestamp / 1000), 'PP', { weekStartsOn: 1, locale: es })
	let resumenProcesos = procesos.reduce((acumulado, proceso) => {
		let grupoProceso = acumulado.findIndex(e => e.tipo === proceso.tipo);
		if (grupoProceso >= 0) acumulado[grupoProceso].cantidad++
		else acumulado.push({ tipo: proceso.tipo, cantidad: 1 })
		return acumulado;
	}, []).map(proceso => <Box key={proceso.tipo}>
		<Chip
			variant="outlined"
			label={proceso.tipo}
			avatar={<Avatar className={classes.cantidadProcesos}>{proceso.cantidad}</Avatar>}
		/>
	</Box>)


	let botonBorrar = null;

	if (inactivo) {

		botonBorrar = <LoadingButton
			loading={cargando}
			startIcon={<DeleteOutline />}
			variant="outlined"
			color="error"
			size="small"
			onClick={onDescartarEstadoInstancia}>
			Descartar
		</LoadingButton>;

	}


	return <Card raised className={classes.contenidoCarta}>
		<DialogoDetalle visible={mostarDetalle} onOcultar={() => setMostrarDetalle(false)} instancia={{ servidor, inicio, ultimoTick, version, procesos }} />
		<CardContent >
			<CardHeader
				avatar={iconoAvatar}
				title={<Typography variant="h6" component="h2">{servidor.toUpperCase()}</Typography>}
				subheader={`Visto ${distanciaActivo}`}
			/>

			<Typography variant="subtitle1" color="textSecondary" className={classes.contenedorTituloVersion}>
				Versión {version.servidor}
			</Typography>
			<Typography variant="subtitle1" color="textSecondary" className={classes.contenedorTituloGit}>
				<GitHub className={classes.avatarGit} />
				<Typography variant="caption">{version.git.commit.substring(0, 8).toUpperCase()} @ {fechaCommitGit}</Typography>
			</Typography>
			{!enError && <>
				<Typography variant="subtitle1" color="textSecondary" className={classes.contenedorTituloFechaInicio}>
					Iniciado el {distanciaInicio}
				</Typography>
			</>}

			{!enError && <>
				<Typography variant="subtitle1" color="textSecondary" gutterBottom className={classes.contenedorTituloProcesos}>
					Procesos ejecutados
				</Typography>
				<Box className={classes.contenedorProcesos}>
					{resumenProcesos}
				</Box>
			</>}

		</CardContent>
		<CardActions className={classes.botoneraInferior}>
			{botonBorrar}
			<Button color="primary" size="small" onClick={() => setMostrarDetalle(true)}>Ver detalles</Button>
		</CardActions>

	</Card>

}

export default memo(PaperInstancia);