import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { storage } from "../firebase";

export const FileUpload = (type, file) => {
  const storageRef = ref(storage, `${type}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('uploaded image: ' + imgURL);
        // We 'awaited' the imgURL, now resolve this Promise
        resolve(imgURL);
      }
    );
  })
  

}