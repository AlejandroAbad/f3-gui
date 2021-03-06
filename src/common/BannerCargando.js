import { LinearProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo } from "react"



const BannerCargando = ({ texto, ...props }) => {
	if (!props.sx) {
		props.sx = { textAlign: 'center' }
	} else if (!props.sx.textAlign) {
		props.sx.textAlign = 'center'
	}
	return <Box {...props}>
		<Typography sx={{ my: 2 }} variant="h5" component="div">{texto}</Typography>
		<LinearProgress variant="query" color="secondary"	/>
	</Box>
}

BannerCargando.defaultProps = {
	texto: 'Cargando ...'
}

export default memo(BannerCargando)