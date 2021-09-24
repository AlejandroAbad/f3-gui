import { LinearProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo } from "react"



const BannerCargando = ({ texto }) => {
	return <Box sx={{textAlign: 'center'}}>
		<Typography sx={{marginY: 2}} variant="h5" component="div">{texto}</Typography>
		<LinearProgress variant="query" color="secondary"	/>
	</Box>
}

BannerCargando.defaultProps = {
	texto: 'Cargando ...'
}

export default memo(BannerCargando)