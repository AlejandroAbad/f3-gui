import React, { createContext, useState } from 'react';


const ContextoPedido = createContext(null);

const ProveedorContextoPedido = ({ children }) => {
	const [pedido, setPedido] = useState(null);
	return <ContextoPedido.Provider value={{ pedido, setPedido }}>{children}</ContextoPedido.Provider >;
};

export { ContextoPedido, ProveedorContextoPedido };
export default ContextoPedido;