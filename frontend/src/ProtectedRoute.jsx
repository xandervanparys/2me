import { Route, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, ...rest }) => {
    const user = // retrieve user state here
    return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};