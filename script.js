
//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: `$(process.env.API_KEY)`,
  authDomain: "shloka070.firebaseapp.com",
  databaseURL: "https://shloka070-default-rtdb.firebaseio.com",
  projectId: "shloka070",
  storageBucket: "shloka070.appspot.com",
  messagingSenderId: "345068955708",
  appId: "1:345068955708:web:02c76a26c1ae37bbef7b39",
  measurementId: "G-WY3DRK9KY4",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Translations/${languageKey}`
  );
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
//   ----------------------/Database Integration End/-----------------------

window.changeText = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};
window.changeText1 = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};
window.changeText2 = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};

window.navClick = async function (shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);
  const audioRef = ref(database, `Shloka-${shlokaNumber}/aud`);
  const snapshot = await get(audioRef);
  const snapshot1 = await get(mainRef);
  if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
};
