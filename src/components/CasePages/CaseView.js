import { useState } from "react";
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Button, Modal, Box } from "@mui/material";
import ConsultantsPage from "../Consultants/ConsultantsPage";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #005a9c',
    boxShadow: 24,
    p: 4,
    overflow: "scroll"
  };

const CaseView = ({caseData, userData}) => {
    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div>  
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar variant="square">
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={caseData.doctorName} secondary="Your primary doctor" />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemAvatar>
                    <Avatar variant="square">
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userData.lastName + ", " + userData.firstName} secondary="Patient" />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary="Date" secondary={new Date(caseData.date.seconds*1000).toDateString()} />
                </ListItem>
                <Divider component="li" />  
                <ListItem>
                    <ListItemText primary="Infomation" secondary={caseData.text} />
                </ListItem>
            </List>
            <Box id="consultation-button-wrapper" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Button id="consultation-button" onClick={openModal} variant="contained">Get Consultation</Button>
            </Box>
            <Modal open={showModal} onClose={closeModal}>
                <Box sx={modalStyle}>
                    <ConsultantsPage/>
                </Box>
            </Modal>
        </div>
    );
}
export default CaseView;