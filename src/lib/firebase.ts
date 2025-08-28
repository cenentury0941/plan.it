import { initializeApp } from "firebase/app";
import { child, Database, get, getDatabase, onValue, ref, set, Unsubscribe } from 'firebase/database';
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check';
import { ChatLog, Place } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyAxf0DAc7cHUcKz5t6agBHSjf3jE1RcgyM",
  authDomain: "plan-it-32b7f.firebaseapp.com",
  projectId: "plan-it-32b7f",
  storageBucket: "plan-it-32b7f.firebasestorage.app",
  messagingSenderId: "469778796466",
  appId: "1:469778796466:web:884d4fc07240fe37cc9eab"
};

const app = initializeApp(firebaseConfig);

let appCheck: any = null;
let rtdbChat: Database = null;
let rtdbPlan: Database = null;
let rtdbChatUnsubscribe: Unsubscribe = null;
let rtdbPlanUnsubscribe: Unsubscribe = null;

export function initAppCheck(){
  console.log("Setting up security...")
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    console.log("Initializing...")
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!),
        isTokenAutoRefreshEnabled: true,
      });
      console.log("Done security setup.")
    } catch (error) {
      console.error('App Check initialization failed:', error);
    }
  }
}

export function getData(){
  console.log("Getting Data")
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    console.log("Window Not Undefined")
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!),
        isTokenAutoRefreshEnabled: true,
      });
      
      console.log("AppCheck" , appCheck)
      if(!rtdbChat){
      rtdbChat = getDatabase(app);
      }

      console.log( "Checking DB..." )
      get(child(ref(rtdbChat), `message`)).then((snapshot) => {
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

export function postMessage(message: ChatLog, chatId: string){
  if(!rtdbChat){
    rtdbChat = getDatabase(app);
    }
  set(ref(rtdbChat, `${chatId}/messages/${message.ts}`), message);
}

export function updateItinerary(itinerary: Place[], chatId: string){
  if(!rtdbChat){
    rtdbChat = getDatabase(app);
    }
  set(ref(rtdbChat, `${chatId}/itinerary`), itinerary);
}

export function setupMessageListener(chatId: string, updateMessages: (sortedChatLog: ChatLog[]) => void){
  console.log("Setting Up Message Listener...")
  if(!rtdbChat){
    console.log("DB Connection Init...")
    rtdbChat = getDatabase(app);
    }
  if(rtdbChatUnsubscribe)
  {
    console.log("Disconnecting Pre-existing Connection...")
    rtdbChatUnsubscribe();
    rtdbChatUnsubscribe = null;
  }
  const messagesRef = ref(rtdbChat, `${chatId}/messages`);
  console.log("Adding DB listener...")
  rtdbChatUnsubscribe = onValue(messagesRef, (snapshot) => {
    const data = snapshot.toJSON();
    
    if(!data)
    {
      console.log("Database Empty");
      updateMessages([]);
      return;
    }

    const messagesArray = Object.entries(data).map(([key, value]) => ({
      ...value
    } as ChatLog));
    
    // Sort messages if needed (by timestamp, etc.)
    const sortedMessages = messagesArray.sort((a, b) => 
      b.ts - a.ts
    );

    console.log("Sorted Database Data : " , sortedMessages)
    updateMessages(sortedMessages);
  });
}

export function setupItineraryListener(chatId: string, updateItinerary: (itinerary: Place[]) => void){
  console.log("Setting Up Itinerary Listener...")
  if(!rtdbPlan){
    console.log("DB Connection Init...")
    rtdbPlan = getDatabase(app);
    }
  if(rtdbPlanUnsubscribe)
  {
    console.log("Disconnecting Pre-existing Connection...")
    rtdbPlanUnsubscribe();
    rtdbPlanUnsubscribe = null;
  }
  const itineraryRef = ref(rtdbPlan, `${chatId}/itinerary`);
  console.log("Adding DB listener...")
  rtdbPlanUnsubscribe = onValue(itineraryRef, (snapshot) => {
    const data = snapshot.toJSON();
    
    if(!data)
    {
      console.log("Database Empty");
      updateItinerary([]);
      return;
    }

    const itineraryArray = Object.entries(data).map(([key, value]) => ({
      ...value
    } as Place));

    console.log("Latest Itinerary : " , itineraryArray)
    updateItinerary(itineraryArray);
  });
}

export { appCheck };
export default app;