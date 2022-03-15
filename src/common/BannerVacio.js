import { Avatar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo } from "react"
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';


const BannerVacio = ({ titulo, onRecargar, ...props}) => {

	if (!props.sx) {
		props.sx = { textAlign: 'center', my: 2 }
	} else {
		if (!props.sx.textAlign) props.sx.textAlign = 'center'
	}


	return <Box {...props}>
		<Avatar sx={{ width: 120, height: 120, bgcolor: 'text.secondary', margin: 'auto' }} >
			<EmojiObjectsIcon sx={{ width: 100, height: 100 }}/>
		</Avatar>
		<Typography sx={{ marginTop: 2 }} variant="h6" component="div">{titulo}</Typography>
	</Box>

}

BannerVacio.defaultProps = {
	titulo: 'Sin datos'
}


export default memo(BannerVacio)