import { useEffect, useState, useRef } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase-access";
import { Box, Button } from "@mui/material";
import "./CasePage.css"

// When fetching user data, it assumes the user has an array containing the name of their cases (Case id from db)
// When fetching cases, it assumes we have a collection named "Cases" in db
// Still needs:
// * Pass user id from login
// * Navigate to path of caseview page
// * CSS and styling

export const CasePage = () => {

    const ref = useRef(null);
    let navigate = useNavigate(); 
    const userRef = doc(db, "users", ""); // specific user id here from db
    const [userData, getUserData] = useState([]); 
 
    const fetchUserCases = async () => {
        const documentSnapshot = await getDoc(userRef);
        let holdData = [];
        if (documentSnapshot.exists()) {
            holdData = documentSnapshot.data().Cases;
        } else {
            alert("User does not exist");
        }
        getUserData([...holdData]);
    };
    useEffect(() => {
        fetchUserCases();
    },[]);

    const [cases, getCases] = useState([]);
    const caseRef =  collection(db, "Cases"); // gather case collection from db (assuming there's one named "Cases")

    useEffect(() => {
        const getCase = async () => {
            const data = await getDocs(caseRef);
            getCases(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getCase();
    },[]); 

    const routeCase = event => {
        //console.log(event.currentTarget.id);
        navigate("/*", {/*state:{ caseName: event.currentTarget.id}*/}); //navigate to caseview here, passing the case name as value
    };
    
    return (
        <div className = "mainDiv">
            <h1 className = "header" >Cases:</h1>
        <Box className = "boxContainer">  
        {cases.map((caseCol) => {
            for(let i = 0; i <= userData.length; i++)
              if(caseCol.id === userData[i]){
                return (
                <>
                <Button variant="contained" ref={ref} id = {caseCol.id} onClick={routeCase}
                 style={{ width: '400px', height: '70px'}}>
                Case: {/*caseCol.id*/} <br/> 
                Date: {/*caseCol.Date*/} 
                </Button>
                <br/>
                </>
                ); 
              }
          return null;
          })}
        </Box>
        </div>
    );
}