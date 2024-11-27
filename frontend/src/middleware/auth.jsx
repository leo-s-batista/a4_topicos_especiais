import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RouteMiddleware = ({ children, roles = [] }) => {

    const token = localStorage.getItem('token');
    const summaryRoles = ['funcionario', 'admin', 'medico'];


    if (!token) {
        return <Navigate to="/login" />;
    } else {
        const decodedToken = jwtDecode(token);
        const userRole = summaryRoles[decodedToken.funcao];
        const currentTime = Date.now() / 1000;

        console.log({
            token,
            decodedToken
        });

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        } else if (roles.length > 0 && !roles.includes(userRole)) {
            return <Navigate to="/" />;

        }
    }

    return children;
}

export default RouteMiddleware;