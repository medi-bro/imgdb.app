import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CaseView = ({caseData, userData}) => {
    return (
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
    );
}
export default CaseView;