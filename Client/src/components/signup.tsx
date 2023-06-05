import "./LoginButton.css"
import { useNavigate } from "react-router-dom";

function SignUpButton() {
    const navigate = useNavigate();
    const NavigateToLogin = () => {
        navigate('/SignUp');
    }
    return (
        <>
            <button className="signupButton" onClick={NavigateToLogin}>SignUp</button>
        </>
    );
}

export default SignUpButton;