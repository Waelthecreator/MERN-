import "./ViewButton.css"
import {FC} from 'react'
import {useNavigate} from 'react-router-dom';

interface ViewButtonProp {
    color:string;
}
const ViewButton:FC<ViewButtonProp> = ({color}) => {
    const navigate = useNavigate();
    const navigateToView = () => {
        navigate('/View');
    }
    return (<>
    <button className={color} id="button" onClick={navigateToView}><b>View All</b></button>
    </>);
}

export default ViewButton;