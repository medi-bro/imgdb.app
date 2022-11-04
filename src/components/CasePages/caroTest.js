import React, { useRef, useState, useEffect } from "react";
//import { auth } from "firebase-access";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc  } from "firebase/firestore";
//import { db } from "firebase-access";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "./caro.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

export const Test = ()=>  { 
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
        <SwiperSlide> <img src={"https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FKneeCap-CT.jpg?alt=media&token=c3a12898-302b-4cab-9335-5aca2b272da9"}/> </SwiperSlide>
        <SwiperSlide> <img src="https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FAbdominal-CT.jpg?alt=media&token=a4927075-5bc4-46f9-9abc-a1d710a1c10d"/> </SwiperSlide>
        <SwiperSlide> <img src="https://firebasestorage.googleapis.com/v0/b/medical-direct-5a084.appspot.com/o/scans%2FWhoa-CT.jpg?alt=media&token=eaef1f08-520b-4e53-8bd0-31f09010ccf0"/> </SwiperSlide>
        
     </Swiper>
    </>
  );
}

