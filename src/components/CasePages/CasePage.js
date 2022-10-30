import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase-access";
import { Button } from "@mui/material";
import { auth } from "../../firebase-access";
import { onAuthStateChanged } from "firebase/auth"; 
import "./CasePage.css";

// When fetching users, it assumes the user has an array of their cases (array named "cases" in user doc db)
// Cases have a timestamp named "date" and string named "title" for case name (based from current example case in db)  
 
export const CasePage = () => {
    let navigate = useNavigate(); 
    const [userDocs, getUserDocs] = useState([]); 
    const [cases, getCases] = useState([]);
    const caseRef =  collection(db, "cases");
 
    const fetchUserCases = async (userid) => {
        const documentSnapshot = await getDoc(userid);
        let caseArr = [];
        if (documentSnapshot.exists()){
            caseArr = documentSnapshot.data().cases;
            getUserDocs([...caseArr]);
        }
    };

    const getCase = async () =>{
            const data = await getDocs(caseRef);
            getCases(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    const routeCase = event => {
        //console.log(event.currentTarget.id);
        navigate("/*", {/*state:{ caseName: event.currentTarget.id}*/});
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
                    if(currentUser){
                        const userID = doc(db, "users", currentUser.uid);
                        fetchUserCases(userID);
                        getCase();
                    }else{
                        navigate("/login"); 
                    }
                })
    },[]);

    return (
        <div className = "mainDiv">
        <h1 className = "header" >Cases:</h1>
        {cases.map((caseDoc) => {
            for(let i = 0; i <= userDocs.length; i++){
              if(caseDoc.id === userDocs[i]){
                const date = new Date(caseDoc.date.seconds * 1000).toLocaleString('en-US');
                return (
                    <div key = {caseDoc.id} className = "buttonDiv">
                    <Button variant="contained" id = {caseDoc.id} onClick={routeCase} className = "button"
                    style={{ fontSize: '16px' }} >
                    Case: {caseDoc.title} <br/>
                    Date: {date} 
                    </Button>
                    </div>
                );
              }
            }
          return null;
          })
        }
        </div>
    );
}