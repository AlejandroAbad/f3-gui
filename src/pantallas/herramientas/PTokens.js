import { memo, useCallback, useRef } from "react";
import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import useApiFedicom from "hooks/useApiFedicom";
import useEstadoCarga from "hooks/useEstadoCarga";


import BannerCargando from 'common/BannerCargando';
import BannerError from 'common/BannerError';
import { Box } from "@mui/system";
import useTema from "hooks/useTema";



function PantallaTokens() {
	useTema('Diversión con Tokens');
	let refUsuario = useRef();
	let refDominio = useRef();

	let { generarTokenPermanente } = useApiFedicom();
	let { datos, error, cargando, setDatos, setError, setCargando } = useEstadoCarga();

	let soliticarToken = useCallback(async () => {

		let usuario = refUsuario.current.value;
		let dominio = refDominio.current.value;

		if (!usuario || !dominio) {
			setError('El usuario y el dominio deben ir rellenos');
			return;
		}

		setCargando();
		try {
			let datosToken = await generarTokenPermanente(usuario, dominio);
			if (!datosToken?.auth_token) setError(datosToken)
			else setDatos(datosToken);
		} catch (error) {
			setError(error);
		}
	}, [generarTokenPermanente, setCargando, setDatos, setError])


	let eleResultado = null;

	if (cargando) {
		eleResultado = (
			<Paper elevation={3} sx={{ mt: 4, py: 4, px: 8 }}>
				<BannerCargando titulo="Generando el token" />
			</Paper>
		)
	} else if (error) {
		eleResultado = (
			<Paper elevation={3} sx={{ mt: 4, py: 4, px: 8 }}>
				<BannerError titulo="Error al generar el token" errores={error} />
			</Paper >
		)
	} else if (datos?.auth_token) {

		eleResultado = <Paper elevation={3} sx={{ mt: 4, py: 4, px: 8 }}>
			<Typography component="h2" variant="h6" sx={{ mb: 1 }}>
				Token generado:
			</Typography>
			<Box sx={{ wordWrap: 'break-word', my: 2, fontFamily: 'monospace' }}>
				{datos?.auth_token}
			</Box>
		</Paper>
	}




	return (
		<Container fixed maxWidth="lg">

			<Container maxWidth="sm">
				<Paper elevation={3} sx={{ py: 4, px: 8 }}>
					<Typography component="h2" variant="h6" sx={{ mb: 4 }}>
						Generar Token permanente
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Usuario" variant="outlined" fullWidth inputRef={refUsuario} disabled={cargando} />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Dominio" variant="outlined" fullWidth inputRef={refDominio} disabled={cargando} />
						</Grid>
						<Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
							<LoadingButton variant="contained" onClick={soliticarToken} loading={cargando}>
								Generar Token
							</LoadingButton>
						</Grid>
					</Grid>
				</Paper>
			</Container>


			{eleResultado}

		</Container>
	)
}

export default memo(PantallaTokens);






