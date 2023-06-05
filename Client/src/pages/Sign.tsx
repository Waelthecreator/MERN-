
import SignUpButton from "../components/signup";

function SignUp() {
    return (
    <>
    <div className='hero-container'>
                <div className='container'>
                    <h1 className="welcome">Login or Sign Up</h1>
                    <div className="box" >
                        <div id="login">
                        <h5>With an account, You can create your own guides which you can view and edit whenever you want!</h5>
                            <div>
                                <input type="text" id="user" name="user" placeholder="Username" />
                            </div>
                            <div >
                                <input type="password" id="pass" name="pass" placeholder="Password" />
                            </div>
                            <div>
                            <input type="password" id="confpass" name="pass" placeholder="Confirm Password" />
                            </div>
                            <div className="passdiv">
                            <input type="text" id="user" name="user" placeholder="name" />
                            </div>
                            <div className="middle">
                            <SignUpButton />
                            </div>
                            

                        </div>

                    </div>
                </div>
            </div>
    </>
    );
}

export default SignUp;