import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { ConsultantsView } from "./ConsultantView";

//a warning is disbled related to consitent updates

export const ConsultantsPage = () => {
    const querySize = 20;
    
    const consultantsCollectionRef = collection(db, "consultants");
    const tmpImage = "https://lh3.googleusercontent.com/a/ALm5wu3bR4cCcp4Y9b6p9VuKdTpzKGjA4NEwCIpry0B-=s83-c-mo";
    const [lastDoc, setLastDoc] = useState(null);
    const [consultants, setConsultants] = useState([]);
    const [showGetMoreButton, setShowGetMoreButton] = useState(false);
    
    
    const handleOnClick = (consultantUid) => {
        console.log(`Requesting consultation from uid:${consultantUid}`);
    };

    const loadMoreConsultants = () => {
        if (!showGetMoreButton)
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
                setConsultants(data.docs.map((doc) => ({...doc.data(), uid: doc.id})));
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
        getConsultants(null);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div id="consultants-page">
            <ul id="consultants-list">
                {consultants.map((consultant) => {
                    return(
                        <li key={consultant.uid}>
                            <ConsultantsView 
                                consultantUid={consultant.uid} 
                                imageUrl={tmpImage/*consultant.pictureUrl*/}
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
}