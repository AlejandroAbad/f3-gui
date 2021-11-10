import ContextoAplicacion from "contexto/contexto";
import { useContext, useEffect } from "react";


export default function useTema(titulo, nombreTema) {
	if (!titulo) titulo = 'Fedicom3'
	const { tema, setTema, tituloPantalla, setTituloPantalla } = useContext(ContextoAplicacion);

	useEffect(() => {
		if (tema.nombre !== nombreTema) {
			setTema(nombreTema);
		}
	}, [nombreTema, tema, setTema])

	useEffect(() => {
		if (titulo && titulo !== tituloPantalla) {
			setTituloPantalla(titulo);
		}
	}, [tituloPantalla, titulo, setTituloPantalla])
}