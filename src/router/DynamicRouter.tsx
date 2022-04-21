import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { auth } from "../firebase/firebase";
import AuthPage from "../pages/auth/AuthPage";
import ErrorPage from "../pages/error/ErrorPage";


const DynamicRouter: React.FC = ({ children }) => 
{
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <Loader/>;
    if (error) return <ErrorPage/>;
    if (!user) return <AuthPage/>;
  
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

export default DynamicRouter;