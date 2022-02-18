import { Avatar, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo } from "react"
import FediCommons from "./FediCommons"
import CloudOffIcon from '@mui/icons-material/CloudOff';


const BannerError = ({ titulo, errores, mostrarCodigosError, onRecargar, ...props }) => {

	let botonRecargar = null;
	if (onRecargar) {
		botonRecargar = (
			<Button onClick={onRecargar}>Recargar</Button>
		)
	}

	if (!props.sx) {
		props.sx = { textAlign: 'center', my: 2 }
	} else {
		if (!props.sx.textAlign) props.sx.textAlign = 'center'
	}

	console.log(props)
	return <Box {...props} >
		<Avatar sx={{ width: 120, height: 120, bgcolor: 'error.main', margin: 'auto' }} >
			<CloudOffIcon sx={{ width: 80, height: 80, marginBottom: 1 }} />
		</Avatar>
		<Typography sx={{ marginTop: 2 }} variant="h6" component="div">{titulo}</Typography>
		{errores && <Typography variant="body1" component="div">{FediCommons.convertirErrorLlamadaFedicom(errores, mostrarCodigosError)}</Typography>}
		{botonRecargar}
	</Box>

}

BannerError.defaultProps = {
	titulo: 'Error',
	mostrarCodigosError: true
}


export default memo(BannerError)