import { storage, store } from "../firebase";
import { doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

// VideoUpload시 DB에 Video의 메타 데이터를 저장하는 API
export const uploadVideoDataApi = async (VideoData) => {
  await setDoc(doc(store, "VideoList", VideoData.id), VideoData)
    .then(() => {console.log("Upload Video Data is Success")})
    .catch((e) => { console.error(e); alert("Upload Video Data Api Fail")});
};


// HomePage에서 VideoList를 받아오는 API
export const getVideoListApi = async () => {
  return await getDocs(query(collection(store, "VideoList")))
    .then((snapShot) => {
      const videoList = [];
      snapShot.forEach((doc) => {
        videoList.push(doc.data());
      });
      return videoList
    })
    .catch((e) => {
      console.error(e)
      alert("Get Video List Api Fail")
      return []
    });
};

// Video Like Handler
export const handleLikeApi = async (targetVideoId, adjustVal) => {
  const targetVideoDoc = doc(store, "VideoList", targetVideoId)
  const currentLike = await getDoc(targetVideoDoc)
    .then((snapShot) => {return snapShot.get("like")})
    .catch((e) => { console.error(e); alert("Like Fail"); });
  await updateDoc(targetVideoDoc, {like: currentLike + adjustVal})
  return currentLike + adjustVal
}



//여기 userName
export const getUserVideoList = async (setVideoList, userName) => {
  const videoList = [];
  console.log(userName);//
  const videoListQuery = query(collection(store, "VideoList"));
  const snapShot = await getDocs(videoListQuery);
  snapShot.forEach((doc) => {
    if (doc.data().uploader === userName) {
      videoList.push(doc.data());
    }
    else{
      return;
    }
  });
  setVideoList(videoList);
};