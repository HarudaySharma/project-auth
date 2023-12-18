import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log("current User:", currentUser);
    return (
        currentUser ? <Outlet/> : <Navigate to='sign_in' /> 
    )
}

export default PrivateRoute;