/*
    Expected JSON Object has the form: 
        [{
            "Consultant": "MD",
            "Patient": "Johnny Appleseed",
            "ScanType": "MRI",
            "Reason": "spine", 
            "Severity": 0 // 0 being least severe and 3 being most severe 
        }]
    **************************************************************************************
    There's a total of 4 functions in this file:
        constructString(data): Main function with the 'data' parameter being the main json object
                            expected. Contains a large string template that will call other
                            functions to fill in the gaps.

        fetchDesc(info): Function containing a large local json object that's filled with 
                        strings based on the types of scans (MRI,XRAY,CT,ETC). These strings 
                        are just general descriptive phrases. These phrases are temporary, 
                        and might need adjustment based on the official cases to be used in project.
                        'info' parameter is just the main json object that is expected originally, 
                        and is needed to determine the type of phrase to return.

        fetchAdj(num): Function that simply chooses adjectives to add to the phrases. So far, 
                    there is only two types of adjectives, of type mild and critical. Based on 
                    the 'num' parameter (severity indicated in the original json), the function 
                    will choose a random adjective from the array of words. 
                    (This function is called within the fetchDesc function)

        fetchOutro(info): Function that will return broad recommendations based on the indicated
                        severity. 
    **************************************************************************************
*/


// Main function, calls other functions to construct the 'consultation' string
const constructString = (data) => {
    if (typeof data !== 'object') return `No object found.`; 

    return(
    `Consulation by: ${data[0].Consultant} -- 
    Consulation for: ${data[0].Patient} -- 
    Findings: Analysis of the ${data[0].ScanType} scan/s for the patient's ${data[0].Reason} - ${fetchDesc(data)} 
    Recommendation: ${fetchOutro(data)}  
    
    Thank you for giving me the opportunity to assist you in your case, please take care. 
    With appreciation, ${data[0].Consultant}.`
    );
}

const fetchDesc = (info) =>{ 
    const caseDesc = [{
        "CaseType" : "MRI",
        "chest": `The heart seems to be in ${fetchAdj(info[0].Severity)} condition, ${fetchAdj(info[0].Severity)} vessels, and pulmonary vasculature are ${fetchAdj(info[0].Severity)}.`, 
        "head": `Masslike expansion of the left temporal lobe, seems to be in ${fetchAdj(info[0].Severity)} condition. Cortical thickening of the mesial temporal lobe and hippocampus also looks to be in a ${fetchAdj(info[0].Severity)} state.`, 
        "spine": `An expansile enhancing intramedullary cervical spinal cord lesion, associated with extensive cord edema. In ${fetchAdj(info[0].Severity)} shape.`, 
        "ETC...": `` 
},
{
    "CaseType" : "XRay",
        "chest" : `On evaluation, there's a ${fetchAdj(info[0].Severity)} pneumothorax. On closer examination, visualization of the right heart border appears to be in ${fetchAdj(info[0].Severity)} state.`, 
        "lungs" : `Frontal view of the chest ${fetchAdj(info[0].Severity)}, ${fetchAdj(info[0].Severity)} nodular opacities.`, 
        "ETC...": ``
    
}, 
{
    "CaseType" : "CT",
        "tumor": `Mass appears to be well defined. Evidence of a growing tumor are evident.`, 
        "cancer": `Cancer cell clump in ${fetchAdj(info[0].Severity)} state. Cell division and spread to surrounding present, metastasis likely. `, 
        "ETC": " "
}]; 

    // Loops through json object above and returns appropriate string based on the given data
    for (let i = 0; i <= caseDesc.length; i++)
        if(info[0].ScanType === caseDesc[i].CaseType)
            return caseDesc[i][info[0].Reason]; 

}

const fetchAdj = (num) => {
    const mild  = [`unremarkable`, `normal`, `typical`, `ordinary`]; 
    const critical = [`poor`, `bad`,`ruinous`,`unsatisfactory`,`inadequate`]; 

    switch (num){
        case 0: return mild[Math.floor(Math.random() * mild.length + 1)];   
        case 1: return critical[Math.floor(Math.random() * critical.length + 1)]; 
        default: 
            return `{ no severity indicated/indicator out of range }`; 
    }
}


const fetchOutro = (info) => {
    const mild = [
        `Patient need not to proceed with any futher actions.`,
        `Patient condition seems stable, no precautions need to be adviced.`,
        `Optional follow up for physical therapy and occupational therapy, but not necessary. No preventative measures necessary.`,
        `Yearly physical examination and monthly checkups with primary physician.`
    ];
    const critical = [
        `Re-examination is appropriate at this time to prevent a more invasive diagnostic procedures.`,
        `Patient needs to be back at doctors office in ${Math.floor(Math.random() * 4)} weeks to reevaluate health condition, and as to whether or not medical therapy will be necessary.`,
        `${Math.floor(Math.random() * 4)} month follow up to document stability.`,
        `Suggest weekly follow-up observations, a repeat ${info.ScanType} scan is necessary to fully determine if additionally precations are necessary.`,
        `Hospital admission highly recommended, possibly necessary.`,
        `Strongly recommend that patient seeks additional medical treatment immediately. Daily follow-ups necessary.`,
        `Health in critical condition. Patient needs to seek medical attention within ${Math.floor(Math.random() * 5) + 2} days.`
    ];
    switch (info[0].Severity){
        case 0: return mild[Math.floor(Math.random() * mild.length + 1)];   
        case 1: return critical[Math.floor(Math.random() * critical.length + 1)]; 
        default: 
            return `{ no severity indicated/indicator out of range }`; 
    }
}
export default constructString;