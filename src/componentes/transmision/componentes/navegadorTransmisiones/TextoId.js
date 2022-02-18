import Link from '@mui/material/Link';
import { generatePath } from 'react-router';
import BoxTexto from "./BoxTexto";



export default function TextoId({ id, onMostrarDetalle }) {

	if (!id) return null;
	return <BoxTexto titulo="ID de transmisión:">
		<Link variant="body1"
			sx={{ fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
			href={generatePath('/#/fedicom3/transmisiones/:txId', { txId: id })}
			onClick={(e) => onMostrarDetalle(e, id)}>
			{id?.toUpperCase()}
		</Link>
	</BoxTexto>




}