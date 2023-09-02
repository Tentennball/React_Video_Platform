import { store, storage } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  orderBy,
  setDoc,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

// VideoUpload시 DB에 Video의 메타 데이터를 저장하는 API
export const uploadVideoDataApi = async (VideoData) => {
  await setDoc(doc(store, "VideoList", VideoData.id), VideoData)
    .then(() => {
      console.log("Upload Video Data is Success");
    })
    .catch((e) => {
      console.error(e);
      alert("Upload Video Data Api Fail");
    });
};

export const deleteVideo = async (VideoData) => {
  if (window.confirm("Are you Sure?")) {
    await deleteDoc(doc(store, "VideoList", VideoData));
    const VideoRef = ref(storage, `Video/${VideoData}`);
    await deleteObject(VideoRef);
    const ThumbRef = ref(storage, `Thumbnail/${VideoData}`);
    await deleteObject(ThumbRef);

    window.location.reload();
  }
};
// HomePage에서 VideoList를 받아오는 API
export const getVideoListApi = async (sortOption) => {
  let sortKey = null;
  if (sortOption === "Recently") {
    sortKey = "id";
  } else if (sortOption === "Like") sortKey = "like";

  return await getDocs(
    query(collection(store, "VideoList"), orderBy(sortKey, "desc"))
  )
    .then((snapShot) => {
      const videoList = [];
      snapShot.forEach((doc) => {
        videoList.push(doc.data());
      });
      return videoList;
    })
    .catch((e) => {
      console.error(e);
      alert("Get Video List Api Fail");
      return [];
    });
};

// Get User Video API
export const getUserVideoListApi = async (userName) => {
  return await getDocs(
    query(collection(store, "VideoList"), where("uploader", "==", userName))
  )
    .then((snapShot) => {
      const videoList = [];
      snapShot.forEach((doc) => {
        videoList.push(doc.data());
      });
      return videoList;
    })
    .catch((e) => {
      console.error(e);
      alert("Get User Video List Api Fail");
      return [];
    });
};

// Video Like Handler
export const handleLikeApi = async (targetVideoId, adjustVal) => {
  const targetVideoDoc = doc(store, "VideoList", targetVideoId);
  const currentLike = await getDoc(targetVideoDoc)
    .then((snapShot) => {
      return snapShot.get("like");
    })
    .catch((e) => {
      console.error(e);
      alert("Like Fail");
    });
  await updateDoc(targetVideoDoc, { like: currentLike + adjustVal });
  return currentLike + adjustVal;
};

// Watch Handler
export const handleWatchApi = async (targetVideoId) => {
  const targetVideoDoc = doc(store, "VideoList", targetVideoId);
  const currentWatch = await getDoc(targetVideoDoc)
    .then((snapShot) => {
      return snapShot.get("watch");
    })
    .catch((e) => {
      console.error(e);
      alert("Like Fail");
    });
  await updateDoc(targetVideoDoc, { watch: currentWatch + 1 });
  return currentWatch + 1;
};

// likedVideoList Update
export const likedVideoListUpdateApi = async (likedVideoList, userName) => {
  await updateDoc(doc(store, "Users", userName), {
    likedVideoList: likedVideoList,
  }).catch((e) => {
    console.error(e);
    alert("Like Video Update Fail");
  });
};
