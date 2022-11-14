import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import ConsultantView from "./ConsultantView";
import "./ConsultantsPage.css"

//a warning is disbled related to consitent updates

const ConsultantsPage = () => {
    const querySize = 10;
    
    const consultantsCollectionRef = collection(db, "consultants");
    const [lastDoc, setLastDoc] = useState(null);
    const [consultants, setConsultants] = useState([]);
    const [showGetMoreButton, setShowGetMoreButton] = useState(false);
    
    
    const handleOnClick = (consultantUid) => {
        console.log(`Requesting consultation from uid:${consultantUid}`);
    };

    const loadMoreConsultants = () => {
        getConsultants(lastDoc);
    }

    const getConsultants = (lastDoc) => {
        let q;
        //if first query
        if (lastDoc === null) {
            q = query(consultantsCollectionRef, where("public", "==", true), limit(querySize));
        }
        else {
            q = query(consultantsCollectionRef, where("public", "==", true), limit(querySize), startAfter(lastDoc));
        }
        getDocs(q)
            .then((data) => {
                //following line preserves old items and merges with new while updating state
                //can cause issues on recompile, requiring reload
                setConsultants([...consultants, ...(data.docs.map((doc) => ({...doc.data(), uid: doc.id})))]);
                setLastDoc(data.docs[data.docs.length-1]);
                console.log(`${data.size} consultants found`)
                if (data.size < querySize) {
                    setShowGetMoreButton(false);
                }
                else {
                    setShowGetMoreButton(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (consultants.length === 0)
            getConsultants(null);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div id="consultants-page">
            <h1>Consultants</h1>
            <ul id="consultants-list">
                {consultants.map((consultant) => {
                    return(
                        <li key={consultant.uid}>
                            <ConsultantView 
                                consultantUid={consultant.uid} 
                                imageUrl={consultant.pictureURL}
                                name={consultant.displayName}
                                specialty={consultant.specialty}
                                fee={consultant.fee}
                                description={consultant.description}
                                onClick={handleOnClick} />
                        </li>
                    );
                })}
            </ul>
            {showGetMoreButton ? <Button onClick={loadMoreConsultants}>See More</Button> : <></>}
        </div>
    );
};

export default ConsultantsPage;