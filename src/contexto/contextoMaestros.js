import React, { createContext } from 'react';
import useMaestro from 'hooks/useMaestro';

const ContextoMaestros = createContext(null);
const { Provider } = ContextoMaestros;

const ProveedorContextoMaestros = ({ children }) => {

	const maestroEstados = useMaestro('estados');
	const maestroProgramas = useMaestro('programas');
	const maestroLaboratorios = useMaestro('laboratorios');
	const maestroAlmacenes = useMaestro('almacenes');
	const maestroTipos = useMaestro('tipos');
	

	const valorRetornado = { 
		maestroEstados, 
		maestroProgramas, 
		maestroLaboratorios,
		maestroAlmacenes,
		maestroTipos
	}

	return <Provider value={valorRetornado}>{children}</Provider>;
};

export { ContextoMaestros, ProveedorContextoMaestros };
export default ContextoMaestros;