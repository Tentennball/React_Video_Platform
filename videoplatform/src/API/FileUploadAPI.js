import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const FileUpload = (type, file, timeStamp, setProgress) => {
  const storageRef = ref(storage, `${type}/${timeStamp}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        throw error;
      },
      async () => {
        const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
        // We 'awaited' the imgURL, now resolve this Promise
        resolve(imgURL);
      }
    );
  });
};
