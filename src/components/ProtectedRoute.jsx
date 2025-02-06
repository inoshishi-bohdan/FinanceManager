import { useContext } from "react";
import { AuthContext } from "../store/authentication-context";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
   const { isAuthenticated } = useContext(AuthContext);
 
   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
 }