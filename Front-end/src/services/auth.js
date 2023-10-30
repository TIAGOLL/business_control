import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSLOuq6DB1A4temCZuSSQE5iy-Uz7wAyo",
  authDomain: "autenticacao-14e9b.firebaseapp.com",
  projectId: "autenticacao-14e9b",
  storageBucket: "autenticacao-14e9b.appspot.com",
  messagingSenderId: "996422673776",
  appId: "1:996422673776:web:3d7123e682f7af0e631bb5"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
