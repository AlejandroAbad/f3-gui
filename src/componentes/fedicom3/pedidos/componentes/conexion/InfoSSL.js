import { memo } from "react";
import { Avatar, Chip, Typography } from "@mui/material";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box } from "@mui/system";


const InfoSSL = ({ ssl }) => {

	let { protocoloSSL, suiteSSL } = ssl;

	//protocoloSSL = 'TLSv1.0'
	//suiteSSL = 'ECDHE-RSA-AES128-GCM-SHA256'

	if (!protocoloSSL) {
		return <Chip sx={{ ml: 1 }} avatar={<Avatar sx={{ bgcolor: 'error.contrastText' }}><NoEncryptionIcon sx={{ color: 'error.main' }}/></Avatar>} label="Sin protección" color="error" variant="outlined" />
	}

	let color = 'success';
	if (!['TLSv1.2', 'TLSv1.3'].includes(protocoloSSL)) {
		color = 'warning'
	}
	return <Box>
		<Chip sx={{ ml: 1 }} avatar={<Avatar sx={{ bgcolor: `${color}.contrastText` }}><VerifiedUserIcon sx={{ color: `${color}.main` }} /></Avatar>} label={protocoloSSL} color={color} variant="outlined" />
		<Typography sx={{ ml: 2, fontWeight: 'bold' }} variant='overline' component="div">
			{suiteSSL}
		</Typography>
	</Box>
}

export default memo(InfoSSL);
