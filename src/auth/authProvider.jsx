import { useDeferredValue } from 'react'
import {useContext, createContext, useState, useEffect} from 'react'
import { json } from 'react-router-dom'

const AuthContext= createContext({
  isAuthenticated: false,
  getAccessToken: () => {},

  //// getRefreshToken falta por implementar
  getRefreshToken: () => {},

  saveUser: (userData) => {},

})

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated]= useState(true)
  
  // Manejo de tokens
  const [accessToken, setAccessToken]= useState("")
  // const [refreshToken, setRefreshToken]=useState("")


  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await fetch("http://127.0.0.1:8000/senauthenticator/usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      return data.body.token;
    } catch (error) {
      console.error("Error fetching new access token:", error);
      return null;
    }
  }
  


  useEffect(()=>{

  },[]);


  async function checkAuth() {
    if (accessToken) {
      // si el usuario esta auhenticado
    }else{
      // si el usuario no esta auhenticado
      const token = getRefreshToken()
      if (token) {
        const newAccessToken= await requestNewAccessToken(token);
        if (newAccessToken) {
          
        }
      }
    }
  }











  // retornar token
  function getAccessToken() {
    return accessToken
  }


  // este a un falta por implementar

  // Se verifica si hay un refreshToken almacenado en el localStorage y
  // si oo hay se retorna para usarlo en otra parte el codigo
  function getRefreshToken() {
    const token= localStorage.getItem("token");
    if (token) {
      // este se debe implementar
      const {refreshToken} = JSON.parse(token)
      return refreshToken
    }

    return null
  }

  function saveUser(userData) {
    setAccessToken(userData.body.token)
    // setRefreshToken(userData.body.refresToken)

    // guardar el refreshToken en memoria del navegador
    // localStorage.setItem("token", JSON.stringify(userData.body.refresToken))

    setIsAuthenticated(true)
  }




  return (
    
  <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser, getRefreshToken}}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider

// Hook que permite acceder a funciones de useContext en cualquier componente, solo hay que llamarlo

export const useAuth =()=> useContext(AuthContext);