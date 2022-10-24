import { Button } from "@mui/material";

//just a hint as to why it is stored as string
const convertCurrencyToLocal = (usd) => {
    return usd;
}

export const ConsultantsView = ({consultantUid, imageUrl, name, specialty, fee, description, onClick}) => {
    const onClickWrapper = () => {
        onClick(consultantUid);
    };

    return(
        <div className="consultant-view">
            <img src={imageUrl} alt={`${name}`}/>
            <p className="consultant-name">{name}</p>
            <p className="consultant-specialty"><span className="consultant-specialty-label">Specializes In:</span> {specialty}</p>
            <p className="consultant-fee">${convertCurrencyToLocal(fee)}</p>
            <p className="consultant-description">{description}</p>
            <Button className="consultant-request" onClick={onClickWrapper}>Get Consultation</Button>
        </div>
    );
}