import { store } from "../firebase";
import { doc, setDoc } from "firebase/firestore";



export const uploadVideoData = async(VideoData) => {
  await setDoc(doc(store, "VideoList", VideoData.id), VideoData)
    .catch((e) => {console.log(e)})
}