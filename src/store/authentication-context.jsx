import { createContext, useState } from "react";


export const AuthContext = createContext({
   isAuthenticated: false,
   changeIsAuthenticated: () => { }
});


export default function AuthenticationContextProvider({ children }) {
   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.accessToken ? true : false);

   function changeIsAuthenticated(value) {
      setIsAuthenticated(value);

      if (value === false) {
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
      }
   }

   const ctxValue = {
      isAuthenticated: isAuthenticated,
      changeIsAuthenticated: changeIsAuthenticated
   };

   return (
      <AuthContext.Provider value={ctxValue}>
         {children}
      </AuthContext.Provider>
   );
}