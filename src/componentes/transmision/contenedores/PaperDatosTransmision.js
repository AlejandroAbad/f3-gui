import { Grid, Paper, Typography } from "@mui/material";
import InfoAutenticacion from "../componentes/detalleTransmision/InfoAutenticacion";
import InfoBalanceador from "../componentes/detalleTransmision/InfoBalanceador";
import InfoIp from "../componentes/detalleTransmision/InfoIp";
import InfoProgramaFarmacia from "../componentes/detalleTransmision/InfoPrograma";
import InfoSSL from "../componentes/detalleTransmision/InfoSSL";
import InfoTxId from "../componentes/detalleTransmision/InfoTxId";
import InfoTipo from "../componentes/detalleTransmision/InfoTipo";
import InfoEstado from "../componentes/detalleTransmision/InfoEstado";



const PaperDatosTransmision = ({ transmision }) => {

	let metadatosConexion = transmision?.conexion?.metadatos;
	if (!metadatosConexion) return null;


	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
		<Typography variant='h5' component="h2">Datos de la transmisión</Typography>
		<Grid container>
			<Grid item xs={4}>
				<Grid container>
					<Grid item xs={12}>
						<InfoTxId txId={transmision._id} />
					</Grid>
					<Grid item xs={12}>
						<InfoTipo codigoTipo={transmision.tipo} />
					</Grid>
					<Grid item xs={12}>
						<InfoEstado codigoEstado={transmision.estado} />
					</Grid>

				</Grid>
			</Grid>
			<Grid item xs={4}>
				<Grid container>
					<Grid item xs={12}>
						<InfoAutenticacion autenticacion={metadatosConexion.autenticacion} />
					</Grid>
					<Grid item xs={12}>
						<InfoIp ip={metadatosConexion.ip} />
					</Grid>
					<Grid item xs={12}>
						<InfoProgramaFarmacia idPrograma={metadatosConexion.programa} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				<Grid container>
					<Grid item xs={12}>
						<InfoBalanceador balanceador={metadatosConexion.balanceador} concentrador={metadatosConexion.concentrador} />
					</Grid>
					<Grid item xs={12}>
						<InfoSSL ssl={metadatosConexion.ssl} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Paper>

}

export default PaperDatosTransmision;