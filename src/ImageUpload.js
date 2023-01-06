import React, {useState} from "react"
import {Button} from '@material-ui/core'
import firebase from 'firebase'
import {storage, db} from './firebase'
import './ImageUpload.css'

function ImageUpload ({username}){
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) =>{
        // get the file you selected
        if(e.target.files[0]){
            // then setimage into that - file you selected
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () =>{
        // image of ref and put image you select
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        // we need to listen what is happening 
        uploadTask.on(
            "state_changed",
            // on state change take snapshot
            (snapshot) => {
                // progress bar
                const progress = Math.round (
                    // gives you a progress between 0 to 100
                    (snapshot.bytesTransferred)/snapshot.totalBytes * 100
                )
                setProgress(progress)
            }, 
            (error) => {
                // if error during upload
                console.log(error)
                alert(error.message)
            },
            () => {
                // upload complete
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    // get the url then do some stuff
                    .then((url) => {
                        // post image
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption, 
                            imageUrl: url,
                            username: username,
                        })
                        // once login  no progress, caption
                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
        )
    }

    return (
        <div className="imageUpload__container">
            <div className="imageupload">
                <progress
                    className="imageupload__progress"
                    value={progress}
                    max="100"
                    />
                
                <input 
                    className="imageupload__text"
                    type="text"
                    placeholder="Enter a caption"
                    onChange={(event) => setCaption(event.target.value)}
                    value={caption}
                />
                <input 
                    type="file" onChange={handleChange} />
                <Button 
                    className="imageupload__button"
                    disabled={!image}
                    onClick={handleUpload}>
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload