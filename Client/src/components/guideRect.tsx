import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import "./guideRect.css"


interface guideRectProp {
    title:string
    id:string
}
const Guiderect:FC<guideRectProp> = ({title, id}) => {
    const navigate = useNavigate();
    const navigateToGuide = () => {
        navigate("/Guide", {state: {Id:id}});
    }
    return(
    <div className="rectangle" onClick={navigateToGuide}>
        <h5>{title}</h5>
    </div>
    )
    
};

export default Guiderect;