import React, { useState } from "react";
import "./App.css";
import db, {cloud}   from "./firebase";
import { collection, doc,  addDoc } from "firebase/firestore";

function App() {
const [Name, setName] = useState("");
const [Password, setPassword] = useState("");
const [Fee,setFee ] = useState("");
const [Permit,setPermit] = useState("");
const [Opinon,setOpinion] = useState("");

const submit = async (e: { preventDefault: () => void; }) => {
      try {
      await addDoc(collection(db, "consultants") , {
        name: Name , 
        password: Password , 
        fee: Fee , 
        permit: Permit , 
        opinon: Opinon , 
        }) 
    } catch (err){ 
          alert(err) 
      }
};

console.log("Document written with ID: ", "foo");





return (
	<div className="App">
	<div className="App__form">
		<input
		type="text"
		placeholder="Name"
		value={Name}
		onChange={(e) => setName(e.target.value)}
		/>
		<input
		type="text"
		placeholder="Password"
		value={Password}
		onChange={(e) => setPassword(e.target.value)}
		/>
    <input
		type="text"
		placeholder="Fee"
		value={Fee}
		onChange={(e) => setFee(e.target.value)}
		/>
    <input
		type="text"
		placeholder="Permit"
		value={Permit}
		onChange={(e) => setPermit(e.target.value)}
		/>
    <input
		type="text"
		placeholder="Opinion"
		value={Opinon}
		onChange={(e) => setOpinion(e.target.value)}
		/>
		<button onClick={submit}>Submit</button>
	</div>
	</div>
);
}

export default App;

