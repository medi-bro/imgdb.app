import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import "./CaseListingView.css"


const CaseListingView = ({caseId, title, date, doctorName}) => {

    return(
        <div className="case-listing-view">
            <p>{title}</p>
            <p>Doctor: {doctorName}</p>
            <p>{new Date(date.seconds*1000).toDateString()}</p>
            <p>Case ID: {caseId}</p>
            <Link to={"/case/" + caseId}>View Case</Link>
        </div>
    );
};

export default CaseListingView;