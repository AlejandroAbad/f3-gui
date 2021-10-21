import { useHistory } from "react-router-dom";

import { Grid, ListItem } from "@mui/material";
import TextoAlmacen from "./componentes/navegadorPedidos/TextoAlmacen";

import TextoCliente from "./componentes/navegadorPedidos/TextoCliente";
import TextoEstado from "./componentes/navegadorPedidos/TextoEstado";
import TextoFechaCreacion from "./componentes/navegadorPedidos/TextoFechaCreacion";
import TextoDatosInteres from "./componentes/navegadorPedidos/TextoDatosInteres";
import TextoId from "./componentes/navegadorPedidos/TextoId";
import TextoIp from "./componentes/navegadorPedidos/TextoIp";
import TextoNumeroPedido from "./componentes/navegadorPedidos/TextoNumeroPedido";
import TextoNumeroPedidoSap from "./componentes/navegadorPedidos/TextoNumeroPedidoSap";
import TextoProgramaFarmacia from "./componentes/navegadorPedidos/TextoProgramaFarmacia";
import TextoTipoPedido from "./componentes/navegadorPedidos/TextoTipoPedido";
import TextoTotales from "./componentes/navegadorPedidos/TextoTotales";


export default function LineaNavegadorPedido({ pedido }) {

	const history = useHistory();

	let p = pedido.pedido || {};
	let c = pedido.conexion?.metadatos || {};
	let { _id: id, estado, fechaCreacion } = pedido;

	let estilo = {
		py: 3,
		px: 4,
		borderBottom: 1,
		borderColor: 'text.disabled',
		":hover": { boxShadow: 10, cursor: 'pointer' }
	};

	let enlace = (p.crc) ? '/fedicom3/pedidos/' + p.crc : '/fedicom3/transmisiones/' + id

	return (
		<ListItem sx={estilo} onClick={() => { history.push(enlace); }}>
			<Grid container>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoFechaCreacion fechaCreacion={fechaCreacion} />
						</Grid>
						<Grid item xs={12}>
							<TextoCliente
								cliente={p.codigoCliente}
								usuario={c.autenticacion?.usuario}
								dominio={c.autenticacion?.dominio}
								solicitante={c.autenticacion?.solicitante}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoNumeroPedido crc={p.crc} numeroPedidoOrigen={p.numeroPedidoOrigen} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoEstado codigoEstado={estado} />
						</Grid>
						<Grid item xs={12}>
							<TextoTipoPedido tipoPedido={p.tipoPedido}
								tipoPedidoSap={p.tipoPedidoSap}
								motivoPedidoSap={p.motivoPedidoSap}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoNumeroPedidoSap
								numerosPedidoSap={p.pedidosAsociadosSap}
								pedidoAgrupadoSap={p.pedidoAgrupadoSap}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoDatosInteres datos={p} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoAlmacen
								codigoAlmacenServicio={p.codigoAlmacenServicio}
								almacenesDeRebote={p.almacenesDeRebote}
								esCodigoAlmacenDesconocido={p.codigoAlmacenDesconocido}
								esCodigoAlmacenSaneado={p.codigoAlmacenSaneado}
							/>

						</Grid>
						<Grid item xs={12}>
							<TextoTotales totales={p.totales} />
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoIp ip={c.ip} />
						</Grid>
						<Grid item xs={12}>
							<TextoProgramaFarmacia idPrograma={c.programa} />
						</Grid>
						<Grid item xs={12}>
							<TextoId id={id} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>

	)
}