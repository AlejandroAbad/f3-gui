import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { memo } from "react";


const useStyles = makeStyles((theme) => ({
	titulo: {
		width: '100%',
		borderBottom: 'solid 1px ' + theme.palette.grey[300],
		paddingBottom: theme.spacing(2),
		marginBottom: theme.spacing(4),
		letterSpacing: 0,
		fontWeight: theme.typography.fontWeightBold
	}
}));


const TituloPantalla = ({ titulo, children }) => {

	const classes = useStyles();

	return <Box className={classes.titulo}>
		<Typography variant="h5" component="h1"  >
			{titulo || children}
		</Typography>
	</Box>

}


export default memo(TituloPantalla);