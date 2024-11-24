import { createContext, useContext, useState, useEffect } from "react";

import { auth } from '../services/firebase';
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
// const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [user, setAuthUser] = useState(null);
  const [loader, setLoader] = useState(true)
  
  useEffect(() => {
    const fetchData = async() => {
      onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
        setLoader(false)
        
        console.log ('user: ', user ? user.uid : 'xxxx')
      });
    }
    fetchData();
  }, []);

  const value = {
    user
  }

  return (
    <AuthContext.Provider value={value}>
      {!loader && children}
    </AuthContext.Provider>
  )
}