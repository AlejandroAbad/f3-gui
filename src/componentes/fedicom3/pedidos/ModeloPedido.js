
class ModeloPedido {

	nodoVigente = null;
	nodoInformado = null;
	nodos = [];
	

	constructor(nodos) {
		this.nodos = nodos;
		this.nodoVigente = this.nodos.find(nodo => nodo.es.vigente);
		this.nodoInformado = this.nodos.find(nodo => nodo.es.informado);
	}

	get crc() {
		return this.nodoVigente?.crc;
	}

	get fechaEntrada() {
		return new Date(this.nodos[0].fechaCreacion);
	}

	get datosConexion() {
		return {
			ip: this.nodoVigente.ip,
			autenticacion: this.nodoVigente.autenticacion,
			programa: this.nodoVigente.programa,
			ssl: this.nodoVigente.ssl,
			balanceador: this.nodoVigente.balanceador,
			concentrador: this.nodoVigente.concentrador,
		}
	}

}


export default ModeloPedido;