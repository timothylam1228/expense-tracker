import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config"; // Import your Firebase setup
import { signInWithGoogle } from "../firebase/auth"; // Import your User type from the authentication module
import { User, UserCredential } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type UserProfile = {
  displayName: string;
  email: string;
  createdAt: Date;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function checkUserExist(params: { email: string | null }) {
    const { email } = params;
    if (!email) return false;
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.exists());
    if (docSnap.exists()) {
      return true;
    }
    return false;
  }

  const signIn = async () => {
    const result = await signInWithGoogle();
    if (result.user) {
      setUser(result.user);
    }
    //  check if user exist in the database
    const isExist = await checkUserExist({ email: result.user.email });
    // create a new user
    if (!isExist) {
      await createUserProfile({
        displayName: result.user.displayName!,
        email: result.user!.email!,
        createdAt: new Date(),
      });
    }

    return result;
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const createUserProfile = async (user: UserProfile): Promise<void> => {
    // 1. create a new collection called users
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, user.email!), {
      displayName: user.displayName,
      email: user.email,
      createdAt: user.createdAt,
    });
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
