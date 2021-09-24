import React, { memo } from 'react';
import { Box, Grid, Alert, AlertTitle, Typography } from "@mui/material";
import FediCommons from "common/FediCommons";
import PaperInstancia from "./PaperInstancia";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	contenedorInstancias: {
		marginTop: theme.spacing(4)
	},
}));

const CuadriculaInstancias = ({ cargando, instancias, errores }) => {
	let classes = useStyles();



	let contenido = null;
	if (cargando && !instancias && !errores) {
		contenido = <Typography>Cargando datos de instancias ...</Typography>;
	}
	else if (errores) {
		contenido = <Alert severity="error" className={classes.mensajeError}>
			<AlertTitle>Error</AlertTitle>
			{FediCommons.convertirErrorLlamadaFedicom(errores, true)}
		</Alert>
	}
	else if (!instancias?.length) {
		contenido = <Typography>Cargando datos de instancias ...</Typography>;
	}
	else {
		let componentesDeInstancias = instancias?.map(datosInstancia => {
			return <Grid key={datosInstancia._id} item xs={12} md={6} lg={4}>
				<PaperInstancia instancia={datosInstancia} />
			</Grid>
		})
		contenido = <Grid container spacing={3} className={classes.contenedorInstancias}>
			{componentesDeInstancias}
		</Grid>
	}

	return <Box className={classes.contenedorInstancias}>
		{contenido}
	</Box>
}

export default memo(CuadriculaInstancias);