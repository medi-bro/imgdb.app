import "./App.css";
import { useState} from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
    const [imageUpload, setImageUpload] = useState(null);
  
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `img_folder/${imageUpload.name + v4()}`); //uploads image and saves it with name + rng id added to it

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {console.log(url) //url of image to be added to firestore database for retrieval
                alert("Image Uploaded")});
        });
    };

    return (
        <div className="App">
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadFile}> Upload Image</button>
         
        </div>
    );
}

export default App;