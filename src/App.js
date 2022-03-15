import React, { useCallback, useContext } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MenuSuperior from 'navegacion/MenuSuperior';
import MenuLateral from 'navegacion/MenuLateral';
import Pantallas from 'pantallas/Pantallas';

import { ContextoAplicacion } from 'contexto/contexto';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: 0,
		marginTop: theme.spacing(10),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	}
}));

function App() {



	const classes = useStyles();
	const [drawerOpen, _setDrawerOpen] = React.useState(false);

	const { getJwt } = useContext(ContextoAplicacion);
	const jwt = getJwt();

	const handleDrawerSwitch = useCallback((flag) => {
		if (flag === undefined)
			_setDrawerOpen(!drawerOpen);
		else
			_setDrawerOpen(flag ? true : false);
	}, [drawerOpen, _setDrawerOpen]);



	return (
		<Router>
			<div className={classes.root}>

				<CssBaseline />
				<ToastContainer
					position="bottom-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
				/>

				<MenuSuperior onMenuClicked={handleDrawerSwitch} />
				{jwt && <MenuLateral open={drawerOpen} onClose={() => handleDrawerSwitch(false)} onOpen={() => handleDrawerSwitch(true)} />}

				<main className={classes.content}>
					{!jwt ? <Pantallas.Login /> :

						<Switch>
							<Route path="/monitor/instancias" render={(props) => <Pantallas.Monitor.Instancias {...props} />} />
							<Route path="/monitor/mongodb" render={(props) => <Pantallas.Monitor.MongoDB {...props} />} />

							<Route path="/usuario" render={(props) => <Pantallas.Usuario {...props} />} />

							<Route path="/fedicom3/pedidos/:idPedido?" render={(props) => <Pantallas.Fedicom3.Pedidos.Navegador {...props} />} />
							<Route path="/fedicom3/transmisiones/:txId?" render={(props) => <Pantallas.Fedicom3.Transmisiones.Navegador {...props} />} />

							<Route path="/herramientas/tokens" render={(props) => <Pantallas.Herramientas.Tokens {...props} />} />

							{/*<Route path="/utilidades/visorTramasFedicom2" render={(props) => <Pantallas.VisorTramasFedicom2 {...props} />} /> */}
							<Route path="/" render={(props) => <Pantallas.Principal {...props} />} />
						</Switch>

					}

				</main>

			</div>
		</Router>
	);
}

export default App;
