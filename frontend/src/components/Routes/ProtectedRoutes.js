import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoutes({ children, allowedRoles }) {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("docToken");
    const role = user ? user.role : null; // Check if user is defined before accessing role
    const isAllowed = role && allowedRoles.includes(role);
    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  
    return accessibleRoute;
  }
  
