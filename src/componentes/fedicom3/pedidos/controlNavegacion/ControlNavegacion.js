import { Grid, Pagination, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BotonFiltrosPedido from "componentes/fedicom3/pedidos/controlNavegacion/BotonFiltrosPedido";
import { useCallback } from "react";
import BotonLimiteResultados from "./BotonLimiteResultados";


export default function ControlNavegacionPedidos({ consulta, cambiaConsulta, totalResultados }) {

	let { filtro, /*proyeccion, orden,*/ skip, limite, vista } = consulta;

	const setFiltro = useCallback(filtro => cambiaConsulta({ type: 'filtro', value: filtro }), [cambiaConsulta]);
	const setLimite = useCallback(limite => cambiaConsulta({ type: 'limite', value: limite }), [cambiaConsulta]);
	const setSkip = useCallback((pagina, limite) => cambiaConsulta({ type: 'skip', value: ((pagina - 1) * limite) }), [cambiaConsulta]);
	const setVista = useCallback(vista => cambiaConsulta({ type: 'vista', value: vista }), [cambiaConsulta]);


	const totalPaginas = parseInt((totalResultados / limite) + (totalResultados % limite === 0 ? 0 : 1)) || 1;
	const paginaActual = parseInt((skip / limite) + 1) || 1;

	const primerResultadoMostrado = skip + 1;
	const ultimoResultadoMostrado = Math.min(skip + limite, totalResultados);


	return (<Paper elevation={10} sx={{ p: 2 }}>
		<Grid container direction="row" justifyContent="space-between" alignItems="flex-start" >
			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "top" }}>
				<BotonFiltrosPedido filtro={filtro} setFiltro={setFiltro} />
				<BotonLimiteResultados limite={limite} cambiaLimite={setLimite} />
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<Pagination sx={{ p: 0, m: 0 }} count={totalPaginas} page={paginaActual} onChange={(_, pagina) => setSkip(pagina, limite)} color="primary" />
				<Typography sx={{ mt: 0.8 }} variant="caption">Mostrando resultados del {primerResultadoMostrado} al {ultimoResultadoMostrado} de un total de {totalResultados}</Typography>
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
				<ToggleButtonGroup size="small" color="primary" sx={{ width: '20%', justifyContent: 'right' }} value={vista} onChange={(event) => { setVista(event.target.value); }} exclusive>
					<ToggleButton value="compacto" >Compacto</ToggleButton>,
					<ToggleButton value="extendido" >Extendido</ToggleButton>,
					<ToggleButton value="reejecucion" >Reenvío</ToggleButton>,
				</ToggleButtonGroup>
			</Box>
		</Grid>


	</Paper>)
}