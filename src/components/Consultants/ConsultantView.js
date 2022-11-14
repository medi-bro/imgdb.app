import { Button } from "@mui/material";
import "./ConsultantView.css"

//just a hint as to why it is stored as string
const convertCurrencyToLocal = (usd) => {
    return usd;
}

const ConsultantView = ({consultantUid, imageUrl, name, specialty, fee, description, onClick}) => {
    const onClickWrapper = () => {
        onClick(consultantUid);
    };

    return(
        <div className="consultant-view">
            <img src={imageUrl} alt={`${name}`} className="consultant-image"/>
            <div className="consultant-listing">
                <p className="consultant-name">{name}</p>
                <p className="consultant-specialty"><span className="consultant-specialty-label">Specializes In:</span> {specialty}</p>
                <p className="consultant-fee"><span className="consultant-fee-label">Fee:</span>   ${convertCurrencyToLocal(fee)}</p>
            </div>
            <p className="consultant-description">{description}</p>
            <Button className="consultant-request" onClick={onClickWrapper} variant="contained">Get Consultation</Button>
        </div>
    );
};

export default ConsultantView;