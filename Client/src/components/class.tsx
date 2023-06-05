import 'bootstrap/dist/css/bootstrap.css';
import { FC } from 'react';
import {useNavigate} from 'react-router-dom';
import './class.css';
interface ClassIconProps {
    name: string,
    id: string
}
const ClassIcon: FC<ClassIconProps> = ({ name, id }) => {

    const navigate = useNavigate();
    const navigateToGuide = () => {
        navigate("/guide", {state: {Id:id}});
    }
    return (
        <div className='container' id="box" onClick={navigateToGuide}>
            <h4>{name}</h4>
        </div>

    );
}

export default ClassIcon;