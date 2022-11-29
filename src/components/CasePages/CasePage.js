import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from "../../firebase-access";
import { onAuthStateChanged } from "firebase/auth"; 
import ScanView from "./ScanView";
import CaseView from "./CaseView";
import "./CasePage.css";
 
export const CasePage = () => {
    const navigate = useNavigate();
    const { caseId } = useParams(); //get case id from url

    const [isAuth, setIsAuth] = useState(null);
    const [userDocData, setUserDocData] = useState(null);
    const [caseDocData, setCaseDocData] = useState(null);
    const [scanDocsData, setScanDocsData] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                console.log(currentUser.uid);
                if (userDocData === null)
                    getDoc(doc(db, "users", currentUser.uid))
                        .then((userDoc) => {
                            setUserDocData(userDoc.data());
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                if (caseDocData === null)
                    getDoc(doc(db, "cases", caseId))
                        .then((caseDoc) => {
                            if (caseDoc.exists() && caseDoc.data().patientId === currentUser.uid) {
                                setIsAuth(true);
                                setCaseDocData(caseDoc.data());
                                getDocs(collection(db, "cases", caseDoc.id, "scans"))
                                    .then((scansDocs) => {
                                        setScanDocsData(scansDocs.docs.map(doc => doc.data()));
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            }
                            else {
                                setIsAuth(false);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
            }else{
                navigate("/login");
            }
        })
    },[]); 

    if (isAuth === true) {
        return (
            <div id="case-page">
                <h1>Case</h1>
                <div id="case-page-info">
                    { scanDocsData===null ? <></> : <ScanView scanData={scanDocsData}/>}
                    { caseDocData===null ? <></> : <CaseView caseData={caseDocData} userData={userDocData}/>}
                </div>
            </div>
        );
    }
    else if (isAuth === false) {
        return (
            <div id="case-page">
                <h1>Unauthorized</h1>
                <p id="unauth-text">You do not have permission to look at this informaiton.</p>
            </div>
        );
    }
    else {
        return(<></>);
    }
    
}
