import "./LoginButton.css"
import { useNavigate } from "react-router-dom";
import {FC} from "react";

interface LogoutButtonProp {
    navig?:boolean;
}
const LogoutButton:FC<LogoutButtonProp> = ({ navig }) => {
    const navigate = useNavigate();
    const NavigateToLogin = () => {
        navigate('/Login');
    }
    const navigateToHome = () => {
        navigate('/');
    }
    return (
        <>
            <button className="loginbutton" onClick={navig ? NavigateToLogin : navigateToHome}>Logout</button>
        </>
    );
}

export default LogoutButton;