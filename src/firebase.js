import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP7Xp_rYhmCVzptkqoXw3_sU4injE4bPU",
  authDomain: "litter-lotto-79fd3.firebaseapp.com",
  projectId: "litter-lotto-79fd3",
  storageBucket: "litter-lotto-79fd3.appspot.com",
  messagingSenderId: "1063410354968",
  appId: "1:1063410354968:web:231e56dc2d84cbe08dec6d",
  measurementId: "G-6L10T21FHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics };