import 'bootstrap/dist/css/bootstrap.css';
import { HouseDoorFill } from 'react-bootstrap-icons';
import LoginButton from './LoginButton';
import './navbar.css';
import {Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar navbar-dark bg-dark">
                <h1 className="title">ByteLounge CS</h1>
                <ul className='listitem'>
                    <li className='listitems'>
                        <LoginButton navig={true}/>
                    </li>
                    <li className='listitems'>
                        <Link to="/">
                        <HouseDoorFill className="icon ms-auto" color="white" size={33} id="home"/>
                        </Link>
                        
                    </li>

                </ul>
            </div>
        </>
    );
}

export default Navbar;