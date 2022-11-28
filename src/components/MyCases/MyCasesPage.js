import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CaseListingView from "./CaseListingView";
import "./MyCasesPage.css"

const MyCasesPage = () => {
    const navigate = useNavigate();
    const casesCollectionRef = collection(db, "cases");

    const [uid, setUid] = useState("");
    const [cases, setCases] = useState([]);

    const getCases = (userId) => {
        const q = query(casesCollectionRef, where("patientId", "==", userId));
        getDocs(q)
            .then((data) => {
                setCases(data.docs.map((doc) => ({...doc.data(), caseId: doc.id})));
                console.log(`${data.size} cases found`)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUid(currentUser.uid);
                getCases(currentUser.uid);
            }
            else {
                navigate("/login");
            }
        });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    //if signed in
    if (uid) {
        return(
            <div id="case-listing-page">
                <h1>My Cases</h1>
                {(cases.length === 0) ? <h2>No Cases</h2> : <></>}
                <ul id="case-listings">
                    {console.log(cases)}
                    {cases.map((myCase) => {
                        return(
                            <li key={myCase.caseId}>
                                <CaseListingView 
                                    caseId={myCase.caseId} 
                                    title={myCase.title}
                                    date={myCase.date}
                                    doctorName={myCase.doctorName}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    else {
        return(<div><h1>Loading cases...</h1></div>)
    }
};

export default MyCasesPage;