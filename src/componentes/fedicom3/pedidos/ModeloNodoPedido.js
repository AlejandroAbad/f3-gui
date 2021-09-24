const { parseISO } = require("date-fns")


class ModeloNodoPedido {

	id
	estado
	fechaCreacion
	tipo
	versionDb
	pedido = {
	}

	constructor(datosPedido) {
		this.id = datosPedido._id;
		this.estado = datosPedido.estado;
		this.fechaCreacion = parseISO(datosPedido.fechaCreacion);
		this.tipo = datosPedido.tipo;
		this.versionDb = datosPedido.v;

		let p = datosPedido.pedido;

		this.pedido = {
			// DATOS PEDIDO
			codigoCliente: p?.codigoCliente,
			numeroPedidoOrigen: p?.numeroPedidoOrigen,
			tipoPedido: p?.tipoPedido,
			crc: p?.crc,
			crcSap: p?.crcSap,
			tipoCrc: p?.tipoCrc,
			codigoAlmacenServicio: p?.codigoAlmacenServicio,

			// METADATOS
			opcionesDeReejecucion: p?.opcionesDeReejecucion,
			erroresOcultados: p?.erroresOcultados || [],
			totales: p?.totales,

			// FLAGS
			esDuplicado: p?.esDuplicado || false,
			esReejecucion: p?.esReejecucion || false,
			retransmisionCliente: p?.retransmisionCliente || false,
			errorComprobacionDuplicado: p?.errorComprobacionDuplicado || false,
			noEnviaFaltas: p?.noEnviaFaltas || false,
			codigoAlmacenDesconocido: p?.codigoAlmacenDesconocido || false,
			codigoAlmacenSaneado: p?.codigoAlmacenSaneado || false,
			pedidoProcesadoSap: p?.pedidoProcesadoSap || false,
			reboteFaltas: p?.reboteFaltas || false,
			porRazonDesconocida: p?.porRazonDesconocida || false,
			servicioDemorado: p?.servicioDemorado || false,
			estupefaciente: p?.estupefaciente || false,
			clienteBloqueadoSap: p?.clienteBloqueadoSap || false,
			esPedidoDuplicadoSap: p?.esPedidoDuplicadoSap || false,
			esTransfer: p?.esTransfer || false,

			// DATOS SAP
			puntoEntrega: p?.puntoEntrega,
			tipoPedidoSap: p?.tipoPedidoSap,
			motivoPedidoSap: p?.motivoPedidoSap,
			clienteSap: p?.clienteSap,
			pedidosAsociadosSap: p?.pedidosAsociadosSap,
			pedidoAgrupadoSap: p?.pedidoAgrupadoSap,
		}
	}


	es = {
		rechazado: () => this.estado === 3120,
		duplicado: () => this.pedido.esDuplicado,
		relevante: () => !this.es.duplicado() && !this.es.rechazado(),
		reejecucion: () => this.pedido.esReejecucion,
		primigenio: () => this.es.relevante() && !this.es.reejecucion(),
	}


	extraerDatosMaestros() {
		let m = this.pedido;
		return {
			codigoCliente: m.codigoCliente,
			numeroPedidoOrigen: m.numeroPedidoOrigen,
			tipoPedido: m.tipoPedido,
			crc: m.crc,
			tipoCrc: m.tipoCrc,
			codigoAlmacenServicio: m.codigoAlmacenServicio
		}
	}




}


export default ModeloNodoPedido;