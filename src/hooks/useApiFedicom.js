import ContextoAplicacion from 'contexto/contexto';
import K from 'K';
import { useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import useApi from "./useApi"

const ERROR_NO_TOKEN = [
	{
		codigo: 'AUTH-001',
		descripcion: 'Necesaria autenticación'
	}
]

const generarCabeceras = (jwt) => {
	let headers = {
		'content-type': 'application/json',
	}

	if (jwt) headers['authorization'] = 'Bearer ' + jwt;
	return headers;
}


export default function useApiFedicom() {

	let { get, post, put, del } = useApi(K.URL_CONCENTRADOR);
	let { getJwt, setJwt } = useContext(ContextoAplicacion);

	const _verificaAutenticacion = useCallback(async (resultado) => {
		if (!resultado || resultado.status === 401) {
			console.log('Recibido estado 401, eliminando JWT')
			setTimeout(() => {
				setJwt(null, null);
				toast.info('La sesión ha finalizado');
			}, 0);
			return ERROR_NO_TOKEN;
		}
	}, [setJwt])

	const getTokenObservador = useCallback(async () => {

		let resultado = await get('/~/token')
		return await resultado.json();

	}, [get]);


	const getToken = useCallback(async (usuario, password, dominio) => {

		let body = {
			user: usuario,
			password: password,
			domain: dominio,
			debug: true
		}

		let opciones = {
			headers: generarCabeceras(null)
		}

		let resultado = await post('/authenticate', JSON.stringify(body), opciones)
		return await resultado.json();

	}, [post]);

	const generarTokenPermanente = useCallback(async (usuario, dominio) => {

		let body = { usuario, dominio }

		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		try {
			let resultado = await post('/~/token', JSON.stringify(body), opciones)
			_verificaAutenticacion(resultado);
			return await resultado.json();
		} catch (error) {
			throw error;
		}

	}, [getJwt, post, _verificaAutenticacion]);


	const getEstadoInstancias = useCallback(async () => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		let resultado = await get('/~/instancias', opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();
	}, [getJwt, get, _verificaAutenticacion]);


	const descartarEstadoInstancia = useCallback(async (idInstancia) => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		let resultado = await del('/~/instancias/' + idInstancia, opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();

	}, [getJwt, del, _verificaAutenticacion]);

	const consultaPedido = useCallback(async (crc) => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		let resultado = await get('/~/consulta/pedidos/' + crc, opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();
	}, [getJwt, get, _verificaAutenticacion])


	const listadoPedidos = useCallback(async (filtro, proyeccion, orden, skip, limite) => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		let consulta = {
			filtro, proyeccion, orden, skip, limite
		}

		let resultado = await put('/~/consulta/pedidos', JSON.stringify(consulta), opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();
	}, [getJwt, put, _verificaAutenticacion])

	const consultaTransmision = useCallback(async (txId, tipoConsulta) => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		if (tipoConsulta) tipoConsulta = '/' + tipoConsulta
		else tipoConsulta = '';

		let resultado = await get('/~/consulta/transmisiones/' + txId + tipoConsulta, opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();
	}, [getJwt, get, _verificaAutenticacion])


	const listadoTransmisiones = useCallback(async (filtro, proyeccion, orden, skip, limite) => {
		let token = getJwt();
		if (!token) return _verificaAutenticacion();

		let opciones = {
			headers: generarCabeceras(token)
		}

		let consulta = {
			filtro, proyeccion, orden, skip, limite
		}

		let resultado = await put('/~/consulta/transmisiones', JSON.stringify(consulta), opciones);
		_verificaAutenticacion(resultado);
		return await resultado.json();
	}, [getJwt, put, _verificaAutenticacion])




	const consultaMaestro = useCallback(async (tipo, id) => {

		let token = getJwt();
		if (!token) return ERROR_NO_TOKEN;

		let opciones = {
			headers: generarCabeceras(token)
		}

		if (id) id = '/' + id
		else id = '';

		let resultado = await get('/~/maestro/' + tipo + id, opciones);
		return await resultado.json();
	}, [getJwt, get])



	return {
		getTokenObservador,
		getToken,
		generarTokenPermanente,
		getEstadoInstancias,
		descartarEstadoInstancia,
		listadoTransmisiones,
		consultaTransmision,
		listadoPedidos,
		consultaPedido,
		consultaMaestro,

	}

}