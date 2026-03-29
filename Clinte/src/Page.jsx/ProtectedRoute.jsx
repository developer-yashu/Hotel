import React from 'react'

const ProtectedRoute = ({ children }) => {

    let token = JSON.parse(localStorage.getItem("token"));

      
         if(!token){
               return <Navigate to="/signup"/>;
         }

  return {children}


}

export default ProtectedRoute
{}