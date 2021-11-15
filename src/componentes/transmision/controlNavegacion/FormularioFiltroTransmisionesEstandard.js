import { Grid } from "@mui/material";
import CodigoSolicitante from "./CodigoSolicitante";
import EstadoTransmision from "./EstadoTransmision";
import TipoTransmision from "./TipoTransmision";
import OrigenTransmision from "./OrigenTransmision";
import RangoFechas from "./RangoFechas";




export default function FormularioFiltroTransmisionesEstandard({ refFiltro }) {

	return <Grid container spacing={2} alignItems="flex-start">
		<Grid item xs={12} xl={6}>
			<Grid container>
				<Grid item xs={12}>
					<RangoFechas refFiltro={refFiltro} />
				</Grid>

				<Grid item xs={12}>
					<TipoTransmision refFiltro={refFiltro} />
				</Grid>
				<Grid item xs={12}>
					<EstadoTransmision refFiltro={refFiltro} />
				</Grid>
			</Grid>
		</Grid>

		<Grid item xs={12} xl={6}>
			<Grid container>
				<Grid item xs={12}>
					<CodigoSolicitante refFiltro={refFiltro} />
				</Grid>
				<Grid item xs={12}>
					<OrigenTransmision refFiltro={refFiltro} />
				</Grid>
			</Grid>
		</Grid>
	</Grid>

}