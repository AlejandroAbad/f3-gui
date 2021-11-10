
import { useCallback } from 'react';
import K from 'K';
import useStateLocalStorage from 'hooks/useStateLocalStorage';


export default function ContextoAutenticacion() {

	const [jwt, _setJwt] = useStateLocalStorage('login.jwt', null, true);
	const [usuario, _setUsuario] = useStateLocalStorage('login.usuario', null, true);
	const setJwt = useCallback((token, datos) => {
		_setJwt(token);
		if (datos)
			_setUsuario({
				nombre: datos.sub,
				dominio: datos.aud,
				grupos: datos.grupos || [],
				token: {
					permanente: datos.permanente,
					fechaEmision: datos.iat,
					fechaExpiracion: datos.exp,
					bruto: datos
				}
			});
		else {
			_setUsuario(null)
		}

	}, [_setJwt, _setUsuario]);

	const getJwt = useCallback((inclusoSiEstaCadudado = false) => {
		if (inclusoSiEstaCadudado) return jwt;
		if (!usuario) return null;

		let now = (new Date()).getTime() / 1000;
		let ttl = Math.round(usuario?.token?.bruto?.exp - now);

		if (ttl > K.MARGEN_TTL_TOKEN) {
			return jwt;
		}
		return null;

	}, [jwt, usuario])

	const getUsuario = useCallback((inclusoSiEstaCadudado = false) => {
		if (inclusoSiEstaCadudado) return usuario;
		if (!usuario) return null;

		let now = (new Date()).getTime() / 1000;
		let ttl = Math.round(usuario?.token?.bruto?.exp - now);

		if (ttl > K.MARGEN_TTL_TOKEN) {
			return usuario;
		}
		return null;

	}, [usuario])


	return { getJwt, getUsuario, setJwt }


}