import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from 'firebase/database';
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyAxf0DAc7cHUcKz5t6agBHSjf3jE1RcgyM",
  authDomain: "plan-it-32b7f.firebaseapp.com",
  projectId: "plan-it-32b7f",
  storageBucket: "plan-it-32b7f.firebasestorage.app",
  messagingSenderId: "469778796466",
  appId: "1:469778796466:web:884d4fc07240fe37cc9eab"
};

const app = initializeApp(firebaseConfig);

// Initialize App Check
let appCheck: any = null;

export function getData(){
  console.log("Getting Data")
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    console.log("Window Not Undefined")
    try {
      // For development - you can set debug token
      // if (process.env.NODE_ENV === 'development') {
      //   (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
      // }
      //(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN || true;

      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!),
        isTokenAutoRefreshEnabled: true,
      });
      console.log("AppCheck" , appCheck)
      const rtdb = getDatabase(app);

      console.log( "Checking DB..." )
      get(child(ref(rtdb), `message`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log( "Found Snapshot" )
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
    } catch (error) {
      console.error('App Check initialization failed:', error);
    }
  }
}

export { appCheck };
export default app;