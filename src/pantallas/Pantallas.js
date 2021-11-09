import PantallaUsuario from './PUsuario';
import PantallaLogin from './PLogin';
import PantallaPrincipal from './PPrincipal';

import PantallaMonitorInstancias from './monitor/PInstancias';
import PantallaMonitorMongoDB from './monitor/PMongoDB';

import PantallaNavegadorPedidosFedicom3 from './fedicom3/pedidos/PNavegadorPedidosFedicom3';
import PantallaVisorPedidosFedicom3 from './fedicom3/pedidos/PVisorPedidosFedicom3';


import PantallaNavegadorTransmisionesFedicom3 from './fedicom3/transmisiones/PNavegadorTransmisionesFedicom3';
import PantallaVisorTransmisionesFedicom3 from './fedicom3/transmisiones/PVisorTransmisionesFedicom3';

import PantallaTokens from './herramientas/PTokens';
// import PantallaVisorTramasFedicom2 from './utilidades/visorTramasFedicom2/PVisorTramasFedicom2';






const Pantallas = {
	Login: PantallaLogin,
	Principal: PantallaPrincipal,
	Usuario: PantallaUsuario,
	
	Fedicom3: {
		Transmisiones: {
			Navegador: PantallaNavegadorTransmisionesFedicom3,
			Visor: PantallaVisorTransmisionesFedicom3
		},
		Pedidos: {
			Navegador: PantallaNavegadorPedidosFedicom3,
			Visor: PantallaVisorPedidosFedicom3
		}
	},
	Monitor: {
		Instancias: PantallaMonitorInstancias,
		MongoDB: PantallaMonitorMongoDB
	},
	Herramientas: {
		Tokens: PantallaTokens
	}
	// PedidosF3: PantallaPedidosF3
	// VisorTramasFedicom2: PantallaVisorTramasFedicom2
}

export default Pantallas;