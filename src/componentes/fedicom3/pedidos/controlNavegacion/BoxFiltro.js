import { Paper } from "@mui/material"






export default function BoxFiltro({ modoFiltro, relleno, ...props }) {

	const estiloPaper = {
		m: 0,
		mb: 2,
		p: 4,
		pt: 3,
		bgcolor: modoFiltro ? '' : 'grey.100',
		border: 1,
		borderColor: (modoFiltro && relleno) ? modoFiltro === '$nin' ? 'error.main' : 'primary.main' : 'grey.100',
	}

	return <Paper elevation={modoFiltro ? 5 : 1} sx={estiloPaper} >
		{props.children}
	</Paper>
}

