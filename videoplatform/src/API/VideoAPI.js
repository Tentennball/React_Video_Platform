import { storage, store } from "../firebase";
import { doc, getDocs, setDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";


export const uploadVideoData = async (VideoData) => {
  await setDoc(doc(store, "VideoList", VideoData.id), VideoData).catch((e) => {
    console.log(e);
  });
};


export const getUserVideoList = async (setVideoList, userName) => {
  const videoList = [];
  console.log(userName);
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
export const getVideoList = async (setVideoList) => {
  const videoList = [];
  const videoListQuery = query(collection(store, "VideoList"));
  const snapShot = await getDocs(videoListQuery);
  snapShot.forEach((doc) => {
    videoList.push(doc.data());
  });
  setVideoList(videoList);
};
