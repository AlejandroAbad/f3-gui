import { Grid, ListItem } from "@mui/material";
import TextoCliente from "./componentes/navegadorTransmisiones/TextoCliente";
import TextoEstado from "./componentes/navegadorTransmisiones/TextoEstado";
import TextoFechaCreacion from "./componentes/navegadorTransmisiones/TextoFechaCreacion";
import TextoId from "./componentes/navegadorTransmisiones/TextoId";
import TextoIp from "./componentes/navegadorTransmisiones/TextoIp";
import TextoProgramaFarmacia from "./componentes/navegadorTransmisiones/TextoProgramaFarmacia";
import TextoTipo from "./componentes/navegadorTransmisiones/TextoTipo";


export default function LineaNavegadorTransmision({ tx, vista, mostrarDetalle }) {


	let c = tx.conexion?.metadatos || {};
	let { _id: id, estado, tipo, fechaCreacion } = tx;

	let estilo = {
		py: 3,
		px: 4,
		borderBottom: 1,
		borderColor: 'grey.200'
	};

	return (
		<ListItem sx={estilo}>
			<Grid container>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoFechaCreacion fechaCreacion={fechaCreacion} />
						</Grid>
						<Grid item xs={12}>
							<TextoId id={id} onMostrarDetalle={mostrarDetalle} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoTipo codigoTipo={tipo} />
						</Grid>
						<Grid item xs={12}>
							<TextoIp ip={c.ip} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>

						<Grid item xs={12}>
							<TextoEstado codigoEstado={estado} />
						</Grid>
						<Grid item xs={12}>
							<TextoProgramaFarmacia idPrograma={c.programa} />
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container></Grid>
					<Grid item xs={12}>
						<TextoCliente
							usuario={c.autenticacion?.usuario}
							dominio={c.autenticacion?.dominio}
							solicitante={c.autenticacion?.solicitante}
						/>
					</Grid>
				</Grid>
			</Grid>
		</ListItem >

	)
}