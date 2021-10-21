
class ModeloPedido {

	nodoVigente = null;
	nodoInformado = null;
	ultimoNodoCliente = null;
	nodos = [];

	constructor(nodos) {
		this.nodos = nodos;
		this.nodoVigente = this.nodos.find(nodo => nodo.es.vigente);
		this.nodoInformado = this.nodos.find(nodo => nodo.es.informado) || this.nodoVigente;

		this.ultimoNodoCliente = this.nodoInformado;
		for (let i = 0; i > this.nodos.length; i++) {
			if (this.nodos[i].es.externa) {
				this.ultimoNodoCliente = this.nodos[i];
			}
		}
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
			ip: this.ultimoNodoCliente.ip,
			autenticacion: this.ultimoNodoCliente.autenticacion,
			programa: this.ultimoNodoCliente.programa,
			ssl: this.ultimoNodoCliente.ssl,
			balanceador: this.ultimoNodoCliente.balanceador,
			concentrador: this.ultimoNodoCliente.concentrador,
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

	get codigoAlmacenServicio() {
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

	get lineas() {
		if (!this.nodoVigente.transmision?.respuesta?.body?.lineas)
			return this.nodoVigente.transmision?.solicitud?.body?.lineas
		return this.nodoVigente.transmision?.respuesta?.body?.lineas;
	}

	get transmisionHttp() {
		return this.nodoInformado.transmision;
	}

	get transmisionSap() {
		return this.nodoInformado.sap;
	}

}


export default ModeloPedido;