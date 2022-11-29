import React, { useRef, useState, useEffect } from "react";
//import { auth } from "firebase-access";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc  } from "firebase/firestore";
//import { db } from "firebase-access";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
// Import Swiper styles

import "./caro.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
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

function AccordionConsultants() {
  return (
    <div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Consultant 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           I got selected Based on your condition and my speciality 
          </Typography>
        </AccordionDetails>
      </Accordion>
      
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Consultant 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ITS CANSUR Bro
         </Typography>
        </AccordionDetails>
      </Accordion>   

     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Consultant N</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Clearly is Cansur and is bad and is gonna cost you 
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

 function SubheaderDividers() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 650,
        bgcolor: 'background.paper',
        ml: -150,
        mt: 5,
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="square">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Doctor" secondary="Some name from Firbase" />
      </ListItem>

      <ListItem>
        <ListItemText primary="Date" secondary="Some Date from firebase or whatever" />
      </ListItem>
      <Divider component="li" variant="inset" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 9 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
        </Typography>
      </li>

      <ListItem>
        <ListItemText primary="Doctors Note" secondary="Its Not cansur" />
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
       </Typography>
      </li>
      
     <ListItem>
        <ListItemText primary="Modality" secondary="scandata from firestore= XR-PlainFilm" />
      </ListItem>
      <Divider component="li" variant="inset" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 9 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
        </Typography>
      </li>

     <AccordionConsultants/>

    </List>
  );
}
export const CaroScans = ()=>  { 

   /*
 const [userDoc, getUserDocs] = useState();

   const handleDoc = async (id)=>{    
      const docSnap =  await getDoc(docRef);
      getUserDocs(docSnap.data());
   }
      
   useEffect(() => {
      onAuthStateChanged(auth,(currentUser) => {
      const docRef = doc(db,"users",currentUser.uid);
      handleDoc(docRef);
      })
   }) 
*/
   return (
    <>
      <p class="caro-case-title"> Dynamic Title </p>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          type: "bullets",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      > 
        <SwiperSlide> <img src="https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FKneeCap-CT.jpg?alt=media&token=c3a12898-302b-4cab-9335-5aca2b272da9"/> </SwiperSlide>
        <SwiperSlide> <img src="https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FAbdominal-CT.jpg?alt=media&token=a4927075-5bc4-46f9-9abc-a1d710a1c10d"/> </SwiperSlide>
        <SwiperSlide> <img src="https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FWhoa-CT.jpg?alt=media&token=eaef1f08-520b-4e53-8bd0-31f09010ccf0"/> </SwiperSlide>
        
     </Swiper>
      
    < SubheaderDividers/> 
    </>
  );
}

