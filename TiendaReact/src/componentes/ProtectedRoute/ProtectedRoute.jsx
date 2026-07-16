import React from 'react';
import { useAuth } from '../../context/useAuth.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, rolesPermitidos }) => {
    const { user, loading } = useAuth();
    
    // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.src / componentes / ProtectedRoute / PotectedRoute.jsx
    // Esto es crucial para no redirigir al login prematuramente en una recarga de página.
    if (loading) {
        return <div>Cargando...</div>;
    }
    
    // Si no hay un usuario autenticado O si su rol no está incluido en la lista de roles permitidos, redirigimos al login.
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    if (rolesPermitidos && !rolesPermitidos.includes(user.rol)){
        // Si hay un usuario, renderizamos el componente hijo que está siendo protegido.
        return <Navigate to="/" replace />;
        //return <> {children} </>;
    }
    return <Outlet />;
}

export default ProtectedRoute;