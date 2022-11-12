import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography} from "@mui/material";
import { db, auth } from "../../firebase-access";
import { onAuthStateChanged } from "firebase/auth"; 
import { CaroScans } from "./CarouselScans";
import "./CasePage.css";

// When fetching users, it assumes the user has an array of their cases (array named "cases" in user doc db)
// Cases have a timestamp named "date" and string named "title" for case name (based from current example case in db)  
 
export const CasePage = () => {
    let navigate = useNavigate();
    const [userDocs, getUserDocs] = useState([]); 
    const [cases, getCases] = useState([]);
    let   [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserCases = async (userRef) => {
        const documentSnapshot = await getDoc(userRef);
        let caseArr = [];
        if (documentSnapshot.exists() && documentSnapshot.data().cases !== undefined){
            caseArr = documentSnapshot.data().cases;
            getUserDocs([...caseArr]);
        }
        if(caseArr.length === 0){
            setFlag(true);
            setIsLoading(false);  
        }else{
            const data = await getDocs(collection(db, "cases"));
            getCases(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setIsLoading(false); 
        }
    }

    const DisplayCases = () => {
        return(
            cases.map((caseDoc) => {
            for(let i = 0; i <= userDocs.length; i++){
              if(caseDoc.id === userDocs[i]){
                try{
                    var date = new Date(caseDoc.date.seconds * 1000).toLocaleString('en-US');
                }catch{ 
                    console.log("No date timestamp for " + caseDoc.id);
                }
                return (
                    <div key = {caseDoc.id}>
                        <Card sx={{ width: 550, boxShadow: 15 }} className = "cards">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Case ID: {caseDoc.id}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {caseDoc.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Physician: {caseDoc.doctorId}
                                </Typography>
                                <Typography sx={{ mb: -1 }}>
                                    Date: {date}
                                </Typography>
                            </CardContent>
                            <CardActions sx= {{justifyContent: 'center'}}>
                                <button id = {caseDoc.id} onClick={routeCase} variant = "outlined" className="button">
                                    <span>
                                        Learn More
                                    </span>
                                </button>
                            </CardActions>
                        </Card>
                        <br/>  
                    </div>
                );
              }
            }
          return null;
          })
        )
    }

    const NoCases = () => {
        return(
            <Card sx={{ boxShadow: 15 }} className = "cards">
                <CardContent>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold'}}>
                        No cases to display
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const routeCase = event => {
        console.log(event.currentTarget.id);
        navigate("/*", {/*state:{ caseName: event.currentTarget.id}*/});
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                const userRef = doc(db, "users", currentUser.uid);
                fetchUserCases(userRef);
                setIsLoading(true); 
            }else{
                navigate("/login"); 
            }
        })
    },[]); 

    return (
        <div className = "mainDiv">
            <h1 className = "header">Cases</h1>
            {isLoading? <div className="loading"/> : (flag? <NoCases/> : <DisplayCases/>)}
            <CaroScans/> 
        </div>
    );
}
