import { Container } from "@mui/material";
import useTema from "hooks/useTema";
import TituloPantalla from "navegacion/TituloPantalla";


export default function PantallaPrincipal() {
	useTema('Panel principal');
	return (
		<Container fixed maxWidth="xl">
			<TituloPantalla titulo="Panel principal" />

		</Container>
	)


}