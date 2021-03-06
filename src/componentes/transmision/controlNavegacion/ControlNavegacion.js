import { Grid, Pagination, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BotonFiltrosTransmision from "componentes/transmision/controlNavegacion/BotonFiltrosTransmision";
import { useCallback } from "react";
import BotonLimiteResultados from "./BotonLimiteResultados";


export default function ControlNavegacionTransmisiones({ consulta, cambiaConsulta, totalResultados }) {

	let { filtro, /*proyeccion, orden,*/ skip, limite, vista } = consulta;

	const setFiltro = useCallback(filtro => { cambiaConsulta({ type: 'filtro', value: filtro }) }, [cambiaConsulta]);
	const setLimite = useCallback(limite => { cambiaConsulta({ type: 'limite', value: limite }) }, [cambiaConsulta]);
	const setSkip = useCallback((pagina, limite) => cambiaConsulta({ type: 'skip', value: ((pagina - 1) * limite) }), [cambiaConsulta]);
	const setVista = useCallback(vista => cambiaConsulta({ type: 'vista', value: vista }), [cambiaConsulta]);


	const totalPaginas = parseInt((totalResultados / limite) + (totalResultados % limite === 0 ? 0 : 1)) || 1;
	const paginaActual = parseInt((skip / limite) + 1) || 1;

	const primerResultadoMostrado = skip + 1;
	const ultimoResultadoMostrado = Math.min(skip + limite, totalResultados);


	return (<Paper elevation={10} sx={{ mt: 0, p: 2, position: 'sticky', top: '60px', zIndex: 100 }}>
		<Grid container direction="row" justifyContent="space-between" alignItems="center" >
			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "top" }}>
				<BotonFiltrosTransmision filtro={filtro} setFiltro={setFiltro} />
				<BotonLimiteResultados limite={limite} cambiaLimite={setLimite} />
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				{(totalPaginas > 1) ?
					<>
						<Pagination sx={{ p: 0, m: 0 }} count={totalPaginas} page={paginaActual} onChange={(_, pagina) => setSkip(pagina, limite)} color="primary" />
						{totalResultados > 0 && <Typography sx={{ mt: 0.8 }} variant="caption">Mostrando transmisiones de la {primerResultadoMostrado} al {ultimoResultadoMostrado} de un total de {totalResultados}</Typography>}
					</>
					:
					<>
						{(totalResultados > 0) && <Typography sx={{ mt: 0.8 }} variant="caption">Encontradas {totalResultados} transmisiones</Typography>}
					</>
				}
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
				<ToggleButtonGroup size="small" color="primary" sx={{ width: '20%', justifyContent: 'right' }} value={vista} onChange={(event) => { setVista(event.target.value); }} exclusive>
					<ToggleButton value="compacto" >Compacto</ToggleButton>,
					<ToggleButton value="extendido" >Extendido</ToggleButton>,
					<ToggleButton value="reejecucion" >Reenv??o</ToggleButton>,
				</ToggleButtonGroup>
			</Box>
		</Grid>
	</Paper>)
}