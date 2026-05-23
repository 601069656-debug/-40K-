import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, browserLocalPersistence, setPersistence, Auth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer, Firestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Helper to check if config is valid
const isFirebaseConfigValid = () => {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== 'remixed-api-key';
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export const getFirebaseApp = () => {
  if (!isFirebaseConfigValid()) {
    console.warn("Firebase config is placeholder or missing. Please complete setup.");
    return null;
  }
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
  return app;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
      setPersistence(auth, browserLocalPersistence);
    }
  }
  return auth;
};

export const getFirestoreDb = () => {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      db = initializeFirestore(firebaseApp, {}, firebaseConfig.firestoreDatabaseId);
    }
  }
  return db;
};

export const googleProvider = new GoogleAuthProvider();

// Auth helper
export const signInWithGoogle = async () => {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) {
    throw new Error("Firebase Auth not initialized. Check your configuration.");
  }
  return signInWithPopup(firebaseAuth, googleProvider);
};

// Firestore error handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const QUOTA_BLOCK_KEY = 'firestore_quota_blocked_until';

export function isFirestoreQuotaBlocked(): boolean {
  const blockedUntil = localStorage.getItem(QUOTA_BLOCK_KEY);
  if (!blockedUntil) return false;
  
  const blockedTime = parseInt(blockedUntil, 10);
  if (isNaN(blockedTime)) return false;
  
  if (Date.now() < blockedTime) {
    return true;
  }
  
  localStorage.removeItem(QUOTA_BLOCK_KEY);
  return false;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const firebaseAuth = getFirebaseAuth();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    operationType,
    path,
    authInfo: {
      userId: firebaseAuth?.currentUser?.uid || null,
      email: firebaseAuth?.currentUser?.email || null,
      emailVerified: firebaseAuth?.currentUser?.emailVerified || null,
      isAnonymous: firebaseAuth?.currentUser?.isAnonymous || null,
      tenantId: firebaseAuth?.currentUser?.tenantId || null,
      providerInfo: firebaseAuth?.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId || null,
        email: provider.email || null,
      })) || []
    }
  };
  
  const isQuotaError = errorMessage.includes('resource-exhausted') || errorMessage.includes('Quota limit exceeded');
  if (isQuotaError) {
    const blockedUntil = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem(QUOTA_BLOCK_KEY, blockedUntil.toString());
    console.error('Firestore Quota Exceeded. Disabling cloud sync for 24 hours.', JSON.stringify(errInfo));
    return;
  }

  const isPermissionError = errorMessage.includes('Missing or insufficient permissions');
  if (isPermissionError) {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  } else {
    console.warn('Firestore Warning: ', JSON.stringify(errInfo));
  }
}

// Connection test
async function testConnection() {
  const firestoreDb = getFirestoreDb();
  if (!firestoreDb) return;

  try {
    await getDocFromServer(doc(firestoreDb, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();
