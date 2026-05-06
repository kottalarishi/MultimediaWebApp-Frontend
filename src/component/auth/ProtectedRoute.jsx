import { Navigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
const ProtectedRoute = ({ children }) => {

    if (!ApiService.isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;