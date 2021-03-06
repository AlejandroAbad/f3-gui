
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom';
import { ProveedorContextoAplicacion } from './contexto/contexto';
import App from 'App';


import { ProveedorContextoMaestros } from 'contexto/contextoMaestros';
import { IconContext } from "react-icons";


ReactDOM.render(

	<IconContext.Provider value={{ size: '1.5em' }}>
		<ProveedorContextoAplicacion>
			<ProveedorContextoMaestros>
				<App />
			</ProveedorContextoMaestros>
		</ProveedorContextoAplicacion>
	</IconContext.Provider>
	,
	document.getElementById('root')
);
