import ContextoAplicacion from 'contexto/contexto';
import K from 'K';
import { useCallback, useContext } from 'react';
import useApi from "./useApi"


const generarCabeceras = (jwt) => {
	let headers = {
		'content-type': 'application/json',
	}

	if (jwt) headers['authorization'] = 'Bearer ' + jwt;
	return headers;
}


export default function useApiFedicom() {

	let { get, post, put, del } = useApi(K.URL_CONCENTRADOR);
	let { getJwt } = useContext(ContextoAplicacion);
	

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

		let resultado = await post('/~/token', JSON.stringify(body), opciones)
		return await resultado.json();

	}, [getJwt, post]);


	const getEstadoInstancias = useCallback(async () => {
		let jwt = getJwt();

		let opciones = {
			headers: {
				'content-type': 'application/json',
				'authorization': 'Bearer ' + jwt
			}
		}

		let resultado = await get('/~/instancias', opciones)
		return await resultado.json();
	}, [getJwt, get]);


	const descartarEstadoInstancia = useCallback(async (idInstancia) => {

		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		let resultado = await del('/~/instancias/' + idInstancia, opciones)
		return await resultado.json();

	}, [getJwt, del]);

	const consultaPedido = useCallback(async (crc) => {
		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		let resultado = await get('/~/consulta/pedidos/' + crc, opciones)
		return await resultado.json();
	}, [getJwt, get])


	const listadoPedidos = useCallback(async (filtro, proyeccion, orden, skip, limite) => {
		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		let consulta = {
			filtro, proyeccion, orden, skip, limite
		}

		let resultado = await put('/~/consulta/pedidos', JSON.stringify(consulta), opciones);
		return await resultado.json();
	}, [getJwt, put])

	const consultaTransmision = useCallback(async (txId, tipoConsulta) => {
		let opciones = {
			headers: generarCabeceras(getJwt()) 
		}

		if (tipoConsulta) tipoConsulta = '/' + tipoConsulta
		else tipoConsulta = '';

		let resultado = await get('/~/consulta/transmisiones/' + txId + tipoConsulta, opciones);
		return await resultado.json();
	}, [getJwt, get])


	const listadoTransmisiones = useCallback(async (filtro, proyeccion, orden, skip, limite) => {
		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		let consulta = {
			filtro, proyeccion, orden, skip, limite
		}

		let resultado = await put('/~/consulta/transmisiones', JSON.stringify(consulta), opciones);
		return await resultado.json();
	}, [getJwt, put])




	const consultaMaestro = useCallback(async (tipo, id) => {
		let opciones = {
			headers: generarCabeceras(getJwt())
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