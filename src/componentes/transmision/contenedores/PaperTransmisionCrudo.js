import { Paper, Typography } from "@mui/material";
import ReactJson from "react-json-view";
import clone from "clone";

const PaperTransmisionCrudo = ({ transmision }) => {

	transmision = clone(transmision);

	if (transmision.conexion?.solicitud) delete transmision.conexion.solicitud;
	if (transmision.conexion?.respuesta) delete transmision.conexion.respuesta;

	if (transmision.sap?.solicitud) delete transmision.sap.solicitud;
	if (transmision.sap?.respuesta) delete transmision.sap.respuesta;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2, my: 3 }}>
		<Typography variant='h5' component="h2">Transmisión en crudo</Typography>
		<Typography variant='caption' component="div" sx={{ mb: 2, color: 'text.secondary' }}>
			Las transmisiones HTTP con el cliente y SAP no se muestran, pues están mostradas arriba
		</Typography>
		<ReactJson
			collapsed={2}
			indentWidth={2}
			collapseStringsAfterLength={30}
			groupArraysAfterLength={25}
			enableClipboard={true}
			displayObjectSize={false}
			displayDataTypes={false}
			sortKeys={true}
			quotesOnKeys={false}
			validationMessage={<pre>{transmision}</pre>}
			src={transmision} />
	</Paper>

}

export default PaperTransmisionCrudo;