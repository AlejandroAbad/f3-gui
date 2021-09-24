import PantallaUsuario from './PUsuario';
import PantallaLogin from './PLogin';
import PantallaPrincipal from './PPrincipal';
import PantallaMonitorInstancias from './monitor/PInstancias';

import PantallaNavegadorPedidosFedicom3 from './fedicom3/pedidos/PNavegadorPedidosFedicom3';
import PantallaVisorPedidosFedicom3 from './fedicom3/pedidos/PVisorPedidosFedicom3';

// import PantallaVisorTramasFedicom2 from './utilidades/visorTramasFedicom2/PVisorTramasFedicom2';






const Pantallas = {
	Login: PantallaLogin,
	Principal: PantallaPrincipal,
	Usuario: PantallaUsuario,
	
	Fedicom3: {
		Pedidos: {
			Navegador: PantallaNavegadorPedidosFedicom3,
			Visor: PantallaVisorPedidosFedicom3
		}
	},
	Monitor: {
		Instancias: PantallaMonitorInstancias
	}
	// PedidosF3: PantallaPedidosF3
	// VisorTramasFedicom2: PantallaVisorTramasFedicom2
}

export default Pantallas;