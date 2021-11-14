import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDasSKfS4YGPnfcMnpdBm9xx5VLm7UFZ2M',
  authDomain: 'meta-bus.firebaseapp.com',
  projectId: 'meta-bus',
  storageBucket: 'meta-bus.appspot.com',
  messagingSenderId: '214905002079',
  appId: '1:214905002079:web:fa02568984065782c1e3ea',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
