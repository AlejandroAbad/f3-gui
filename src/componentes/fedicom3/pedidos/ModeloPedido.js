const { default: ModeloNodoPedido } = require("./ModeloNodoPedido");



class ModeloPedido {

	nodos = [];
	nodoPrimigenio = null;
	nodoInicial = null;

	datosMaestros;

	constructor (datosNodos) {

		this.nodos = datosNodos.map( nodo => new ModeloNodoPedido(nodo));
		
		this.nodoPrimigenio = this.nodos.find( nodo => nodo.es.primigenio() );
		this.nodoInicial = this.nodos.at(0);
		this.datosMaestros = this.nodoPrimigenio.pedido;

	}

}


export default ModeloPedido;