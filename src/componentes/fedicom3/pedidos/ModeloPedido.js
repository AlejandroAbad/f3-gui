
class ModeloPedido {

	nodoVigente = null;
	nodoInformado = null;
	nodos = [];


	constructor(nodos) {
		this.nodos = nodos;
		this.nodoVigente = this.nodos.find(nodo => nodo.es.vigente);
		this.nodoInformado = this.nodos.find(nodo => nodo.es.informado);
	}

	get estado() {
		return this.nodoVigente?.estado;
	}

	get crc() {
		return this.nodoVigente?.crc;
	}
	get crcSap() {
		return this.crc?.substr(0, 8);
	}
	get tipoCrc() {
		return this.nodoVigente?.tipoCrc;
	}
	get numeroPedidoOrigen() {
		return this.nodoInformado?.numeroPedidoOrigen;
	}


	get numerosPedidoSap() {
		return this.nodoVigente?.pedidosAsociadosSap;
	}
	get pedidoAgrupadoSap() {
		return this.nodoVigente?.pedidoAgrupadoSap;
	}

	get fechaEntrada() {
		return new Date(this.nodos[0].fechaCreacion);
	}

	get datosConexion() {
		return {
			ip: this.nodoInformado.ip,
			autenticacion: this.nodoInformado.autenticacion,
			programa: this.nodoInformado.programa,
			ssl: this.nodoInformado.ssl,
			balanceador: this.nodoInformado.balanceador,
			concentrador: this.nodoInformado.concentrador,
		}
	}

	get codigoCliente() {
		return this.nodoVigente.codigoCliente;
	}
	get puntoEntrega() {
		return this.nodoVigente.puntoEntrega;
	}
	get clienteSap() {
		return this.nodoVigente.clienteSap;
	}

	get codigoAlmancenServicio() {
		return this.nodoVigente.codigoAlmacenServicio;
	}
	get almacenesDeRebote() {
		return this.nodoVigente.almacenesDeRebote;
	}
	get codigoAlmacenDesconocido() {
		return this.nodoVigente.codigoAlmacenDesconocido;
	}
	get codigoAlmacenSaneado() {
		return this.nodoVigente.codigoAlmacenSaneado;
	}


	get tipoPedido() {
		return this.nodoVigente.tipoPedido;
	}
	get tipoPedidoSap() {
		return this.nodoVigente.tipoPedidoSap;
	}
	get motivoPedidoSap() {
		return this.nodoVigente.motivoPedidoSap;
	}

	get totales() {
		return this.nodoVigente.totales;
	}

}


export default ModeloPedido;