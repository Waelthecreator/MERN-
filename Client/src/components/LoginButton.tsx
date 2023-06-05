import "./LoginButton.css"
import { useNavigate } from "react-router-dom";
import {FC} from "react";

interface LoginButtonProp {
    navig?:boolean;
}
const LoginButton:FC<LoginButtonProp> = ({ navig }) => {
    const navigate = useNavigate();
    const NavigateToLogin = () => {
        navigate('/Login');
    }
    const navigateToHome = () => {
        navigate('/');
    }
    return (
        <>
            <button className="loginbutton" onClick={navig ? NavigateToLogin : navigateToHome}>Login</button>
        </>
    );
}

export default LoginButton;