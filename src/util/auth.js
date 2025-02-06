
import { jwtDecode } from "jwt-decode";

export function getAccessToken() {
   const accessToken = localStorage.getItem('accessToken');
   return accessToken;
}

export function setAccessToken(accessToken) {
   localStorage.setItem('accessToken', accessToken);
}

export function getRefreshToken() {
   const refreshToken = localStorage.getItem('refreshToken');
   return refreshToken;
}

export function setRefreshToken(refreshToken) {
   localStorage.setItem('refreshToken', refreshToken);
}

export function getUserIdFromAccessToken(accessToken) {
   const decoded = jwtDecode(accessToken);
   const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
   return userId;
}
