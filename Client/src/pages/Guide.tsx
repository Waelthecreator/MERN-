import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BookmarkPlus, Pen, PenFill, BookmarkPlusFill, XCircle,PlusSquare } from 'react-bootstrap-icons';
import Slideshow from "../components/caraousel";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface guideobj {
    Name:string,
    Author:string,
    Notes:string,
    Cards:string[][],
    Access:boolean
}
const Guide = () => {
    const {state} = useLocation();
    let Id = state.id || "";
    useEffect(() =>{
        axios.get("http://localhost:5000/Guides", {
            params: {
                id:Id
            }
        }).then((Response) => {
                
        })
    }, [])
    let flashcards = [
        ["front1", "back1"],
        ["front2", "back2"],
        ["front3", "back3"],
        ["front4", "back4"],
    ];
    const author = "john";
    let title = "guide1";
    const personal = true;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isPenClicked, setIsPenClicked] = useState(false);
    const [flashcardsState, setFlashcardsState] = useState(flashcards);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handlePenClick = () => {
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
            return <Slideshow flashcards={flashcardsState} />
        }
    }

    const setup = (personal: boolean) => {
        if (personal) {
            return (
                <button className={`invis ${isPenClicked ? 'pen-clicked' : ''}`} onClick={handlePenClick}>
                    {renderPenIcon()}
                </button>
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
                            <h1>{title}</h1>
                            {setup(personal)}
                        </div>
                        <h3 className="author">By: {author}</h3>
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