import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BookmarkPlus, Pen, PenFill, BookmarkPlusFill, XCircle,PlusSquare } from 'react-bootstrap-icons';
import Slideshow from "../components/caraousel";
import { useLocation } from 'react-router-dom';
import axios from 'axios';



interface guideobj {
    _id:string
    Name:string,
    Author:string,
    Notes:string,
    Cards:string[][],
    Access:boolean
}
interface jsonresp {
    guide:guideobj
}
interface editRights {
    mes1:boolean
}
interface message {

}
const Guide = () => {
    const {state} = useLocation();
    const [personal, setPersonal] = useState(false);
    const [flashcardsState, setFlashcardsState] = useState<string[][]>([]);
    const [privacy, setPrivacy] = useState(false);
    const [guide, setGuide] = useState<guideobj>({
        _id:"",
        Name: "",
        Author: "",
        Notes: "",
        Cards: [],
        Access: false,
      });
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isPenClicked, setIsPenClicked] = useState(false);
    useEffect(() =>{
        axios.get<jsonresp>(`http://localhost:5000/Guides/${state.Id}`)
        .then((Response) => {
            const data = Response.data;
            setGuide(data.guide);
            setFlashcardsState(data.guide.Cards);
            setPrivacy(data.guide.Access);
            setPersonal(!data.guide.Access);
        }
        ).catch((error) => {
            console.log(error);
        })
        if (!personal){
            axios.get<editRights>(`http://localhost:5000/Guides/edit/${state.Id}`)
            .then((Response) =>{
                const data =Response.data;
                setPersonal(data.mes1);
            })
            .catch((error) => {
                console.log(error);
                setPersonal(false);
            })
        }
    }, [])
    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handlePenClick = () => {
        if(isPenClicked){
        }
        setIsPenClicked(!isPenClicked);
    };

    const handleDeleteClick = (index: number) => {
        const updatedFlashcards = [...flashcardsState];
        updatedFlashcards.splice(index, 1);
        setFlashcardsState(updatedFlashcards);
    }

    const handleCardChange = (cardIndex: number, fieldIndex: number, newValue: string) => {
        const updatedFlashcards = [...flashcardsState];
        updatedFlashcards[cardIndex][fieldIndex] = newValue;
        setFlashcardsState(updatedFlashcards);
    };
    const HandlePrivacyClick = () => {
        axios.put<message>(`http://localhost:5000/Guides/access/${state.Id}`, {access:!privacy})
        .then((Response) =>{
        })
        .catch((error) => {
            console.log(error);
        })
        setPrivacy(!privacy);
        
        
    }


    const renderBookmarkIcon = () => {
        if (isBookmarked) {
            return <BookmarkPlusFill className="icon ms-auto" id="bookmark" size={60} color={"#4184e9"} />;
        } else {
            return <BookmarkPlus className="icon ms-auto" id="bookmark" size={60} color={"#4184e9"} />;
        }
    };

    const renderPenIcon = () => {
        if (isPenClicked) {
            return <PenFill className="icon ms-auto pen-filled" id="pen" size={50} color={"#4184e9"} />;
        } else {
            return <Pen className="icon ms-auto" id="pen" size={50} color={"#4184e9"} />;
        }
    };

    const renderEdit = () =>{
        return (
            <div className="card-container">
                <div className="inputcardstext">
                    <h4>Front</h4>
                    <h4>Back</h4>
                </div>
                {flashcardsState.map((fcstate) => (
                    <div key={fcstate[0]}>
                        <div className="inputcards">
                            <input
                                type="text"
                                className='front-back'
                                defaultValue={fcstate[0]}
                                onBlur={(e) => handleCardChange(flashcardsState.indexOf(fcstate), 0, e.target.value)}

                            />
                            <input
                                type="text"
                                className='front-back'
                                defaultValue={fcstate[1]}
                                onBlur={(e) => handleCardChange(flashcardsState.indexOf(fcstate), 1, e.target.value)}
                            />
                            <button className="invis" onClick={() => handleDeleteClick(flashcardsState.indexOf(fcstate))}><XCircle size={30} color='red'/></button>
                        </div>
                    </div>
                ))}
                <button className='invis' id="push200" onClick={ () => setFlashcardsState([...flashcardsState,[`front ${flashcardsState.length+1}`,`back ${flashcardsState.length+1}`]])}>
                    <PlusSquare  size={30} color='green'/>
                </button>
            </div>
        );

    }

    const renderCards = () => {
        if (isPenClicked) {
            return (renderEdit());
        }
        else {
            if (flashcardsState.length === 0){
                return <></>
            }
            else{
                return <Slideshow flashcards={flashcardsState} />
            }
            
        }
    }

    const setup = (personal: boolean) => {
        if (personal) {
            return (
                <div>
                    <button className='privacybutton' onClick={HandlePrivacyClick}>{privacy ? "Public" : "Private"}</button> 
                    <button className={`invis ${isPenClicked ? 'pen-clicked' : ''}`} onClick={handlePenClick}>
                    {renderPenIcon()}
                </button>
                </div>
                
            );
        } else {
            return (
                <button className="invis" onClick={handleBookmarkClick}>
                    {renderBookmarkIcon()}
                </button>
            );
        }
    };

    return (
        <>
            <div className='hero-container'>
                <div className='container'>
                    <h1 className="welcome">Guide</h1>
                    <div className="biggerBox" id="spaceabove">
                        <div className="guides4">
                            <h1>{guide.Name}</h1>
                            {setup(personal)}
                        </div>
                        <h3 className="author">By: {guide.Author}</h3>
                        <div className="middle">
                            {renderCards()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Guide;