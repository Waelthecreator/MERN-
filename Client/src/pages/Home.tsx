import 'bootstrap/dist/css/bootstrap.css';
import './styling.css';
import { useState, useEffect } from 'react';
import ClassIcon from '../components/class';
import LoginButton from '../components/LoginButton';
import ViewButton from '../components/ViewButton';
import axios from 'axios';
import { connect } from 'react-redux';
import { authen, unauthen } from '../stateManagement/actions';



interface guideobj {
  Name: string,
  _id: string
}
interface jsonresp {
  guides: guideobj[]
  mes1:string
}
interface MyComponentProps {
  authen: () => void;
  unauthen: () => void;
  isAuthenticated: boolean;
}
function Home(props:MyComponentProps) {
  const { authen, unauthen, isAuthenticated } = props;
  const handleAuthen =() => {
    authen();
  }
  const handleunAuthen = () => {
    unauthen();
  }
  const [popularguides, setPopularGuides] = useState<guideobj[]>([]);
  const [persguides, setPersGuides] = useState<guideobj[]>([])
    useEffect(() => {
      axios.get<jsonresp>("http://localhost:5000/")
      .then((Response) =>{
        const data = Response.data;
        setPopularGuides(data.guides);
      })
      axios.get<jsonresp>("http://localhost:5000/pers")
      .then((Response) => {
        const data =Response.data;
          handleAuthen();
          setPersGuides(data.guides);
      })
      .catch((error) => {
        handleunAuthen();
        throw error;
      }).catch(() =>{

      })
    }, [])

    const renderPersonal  = () =>{
      if(isAuthenticated){
        persguides.map((guide) => {
          return <ClassIcon key={guide._id}name={guide.Name} id={guide._id} />
        })
      }
      else{
        return(<>
        <h2 className='logintext'>You need to login or signup to create guides</h2>
        <LoginButton navig={true} />
        </>);

      }
    }
    let name: string = "";
    return (
      <>
        <div className='hero-container'>
          <div className='container'>
            <h1 className='welcome'>Welcome {name}!</h1>
            <div className='box'>
              <div className='searchbar'>
                <h3>Public Popular Guides: </h3>
                <ViewButton color="black" />
              </div>
              <div className='searchbar' id="popularguides">
              {popularguides.map((guide) => {
            return <ClassIcon key={guide._id}name={guide.Name} id={guide._id} />
          })}
              </div>
            </div>
            <div className='box2'>
              <div className="searchbar">
                <h3>Your Guides:</h3>
                <ViewButton color="white" />
              </div>
              {renderPersonal()}
            </div>
          </div>
        </div>
      </>
    )
  }
  const mapStateToProps = (state: any) => {
    return {
      isAuthenticated: state.authenticated
    };
  };
  const mapDispatchToProps = {
    authen,
    unauthen
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);