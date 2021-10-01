import ContextoAplicacion from 'contexto';
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

	let { get, post, del } = useApi(K.URL_CONCENTRADOR);
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
			headers: {
				'content-type': 'application/json'
			}
		}

		let resultado = await post('/authenticate', JSON.stringify(body), opciones)
		return await resultado.json();

	}, [post]);


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

	const consultaTransmision = useCallback(async (txId, tipoConsulta) => {
		let opciones = {
			headers: generarCabeceras(getJwt())
		}

		if (tipoConsulta) tipoConsulta = '/' + tipoConsulta
		else tipoConsulta = '';

		let resultado = await get('/~/consulta/transmisiones/' + txId + tipoConsulta, opciones);
		return await resultado.json();
	}, [getJwt, get])


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
		getEstadoInstancias,
		descartarEstadoInstancia,
		consultaTransmision,
		consultaPedido,
		consultaMaestro
	}

}