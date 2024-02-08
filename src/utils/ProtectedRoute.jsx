import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoading, user } = useAuth();

    if(isLoading) {
      return <>Loading...</>
    }

    if(!user) {
        return <Navigate to='/login' />
    }

  return children;
}

export default ProtectedRoute
