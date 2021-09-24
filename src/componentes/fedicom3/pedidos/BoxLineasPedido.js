import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { memo} from "react"
//import ContextoPedido from "./ContextoPedido";



const BoxLineasPedido = () => {

	//let { pedido } = useContext(ContextoPedido);

	return <Box>
		<Paper elevation={10} sx={{ py: 1 }}>
			Estas son las lineas
		</Paper>
	</Box>
}

export default memo(BoxLineasPedido);