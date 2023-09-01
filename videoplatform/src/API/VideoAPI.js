import { store } from "../firebase";
import { doc, getDoc, getDocs, orderBy, setDoc, updateDoc, where } from "firebase/firestore";
import { collection, query } from "firebase/firestore";

// VideoUpload시 DB에 Video의 메타 데이터를 저장하는 API
export const uploadVideoDataApi = async (VideoData) => {
  console.log("uploadVideoDataApi")
  await setDoc(doc(store, "VideoList", VideoData.id), VideoData)
    .then(() => {console.log("Upload Video Data is Success")})
    .catch((e) => { console.error(e); alert("Upload Video Data Api Fail")});
};


// HomePage에서 VideoList를 받아오는 API
export const getVideoListApi = async (sortOption) => {

  let sortKey = null
  if(sortOption === "Recently"){
    sortKey = "id"
  } else if (sortOption === "Like")(
    sortKey = "like"
  )
  
  return await getDocs(query(collection(store, "VideoList"), orderBy(sortKey, "desc")))
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

// Get User Video API
export const getUserVideoListApi = async (userName) => {
  console.log("getUserVideoListApi")
  return await getDocs(query(collection(store, "VideoList"), where("uploader", "==", userName)))
    .then((snapShot) => {
      const videoList = [];
      snapShot.forEach((doc) => {
        videoList.push(doc.data());
      });
      return videoList
    })
    .catch((e) => {
      console.error(e)
      alert("Get User Video List Api Fail")
      return []
    });
};

// Video Like Handler
export const handleLikeApi = async (targetVideoId, adjustVal) => {
  console.log("handleLikeApi")
  const targetVideoDoc = doc(store, "VideoList", targetVideoId)
  const currentLike = await getDoc(targetVideoDoc)
    .then((snapShot) => {return snapShot.get("like")})
    .catch((e) => { console.error(e); alert("Like Fail"); });
  await updateDoc(targetVideoDoc, {like: currentLike + adjustVal})
  return currentLike + adjustVal
}

// Watch Handler
export const handleWatchApi = async (targetVideoId) => {
  console.log("handleWatchApi")
  const targetVideoDoc = doc(store, "VideoList", targetVideoId)
  const currentWatch = await getDoc(targetVideoDoc)
    .then((snapShot) => {return snapShot.get("watch")})
    .catch((e) => { console.error(e); alert("Like Fail"); });
  await updateDoc(targetVideoDoc, {watch: currentWatch + 1})
  return currentWatch + 1
}

// likedVideoList Update
export const likedVideoListUpdateApi = async (likedVideoList, userName) => {
  console.log("likedVideoListUpdateApi")
  await updateDoc(doc(store, "Users", userName), {likedVideoList: likedVideoList})
    .catch((e) => { console.error(e); alert("Like Video Update Fail"); });
}


