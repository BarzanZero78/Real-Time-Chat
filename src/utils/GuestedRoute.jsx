import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const GuestedRoute = ({ children }) => {
    const { isLoading, user } = useAuth();

    if(isLoading) {
      return <>Loading...</>
    }

    if(user) {
      return <Navigate to='/' />
    }

  return children;
}

export default GuestedRoute
