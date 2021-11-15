import Link from '@mui/material/Link';
import BoxTexto from "./BoxTexto";



export default function TextoId({ id, onMostrarDetalle }) {

	if (!id) return null;
	return <BoxTexto titulo="ID de transmisión:">
		<Link component="button" variant="body1" sx={{ fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }} onClick={() => onMostrarDetalle(id)}>
			{id?.toUpperCase()}
		</Link>
	</BoxTexto>




}