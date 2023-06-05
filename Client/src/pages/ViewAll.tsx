import { FC } from 'react';
import Guiderect from '../components/guideRect';

interface ViewAllProp {
    page: string,
}
const ViewAll: FC<ViewAllProp> = ({ page }) => {
    return (
        <>
            <div className="hero-container">
                <div className="container">
                    <h2 className="welcome">Viewing {page} Guides</h2>
                    <div className="box">
                        <div className="grid">
                        <Guiderect title="hello" id="1" />
                        <Guiderect title="hello" id="1" />
                        <Guiderect title="hello" id="1" />
                        <Guiderect title="hello" id="1" />
                        </div>
                        

                    </div>
                </div>

            </div>


        </>
    );

}

export default ViewAll;