import { LinearProgress} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	barraSuperior: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: theme.zIndex.appBar + 1
	},
}));

/*
const BlackLinearProgress = withStyles((theme) => ({
	colorPrimary: {
		backgroundColor: theme.palette.grey[200]
	},
	bar: {
		backgroundColor: theme.palette.grey[900]
	},
}))(LinearProgress);
*/

export default function BarraProgresoSuperior({ cargando, className, ...props }) {
	const classes = useStyles();

	if (!cargando) return null;

	return (
		<LinearProgress color="secondary" {...props} className={`${className || ''} ${classes.barraSuperior}`} />
	)

}