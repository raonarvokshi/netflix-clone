import React, { useEffect, useRef, useState } from 'react';
import "./TitleCards.css";
import { Link } from 'react-router-dom';

const TitleCards = ({ title = "Only In Netflix", category = "now_playing" }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTNmYmM4Y2M2NDZlNDM3M2E4NTMxNWRlMzcxOGI1NCIsIm5iZiI6MTcyMTY2MzA1Mi43ODU5MTEsInN1YiI6IjY2OWU3OWYxNDMzOTY2ZGVkMDM1YmJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TFvmHGiEPHH8SaC4fAu-jQaGE57Y8ci0tJxFNbp0MwQ'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener("wheel", handleWheel);
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div >
    );
}

export default TitleCards;