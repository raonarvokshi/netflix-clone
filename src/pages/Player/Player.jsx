import React, { useEffect, useState } from 'react';
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: "",
    });

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTNmYmM4Y2M2NDZlNDM3M2E4NTMxNWRlMzcxOGI1NCIsIm5iZiI6MTcyMTY2MzA1Mi43ODU5MTEsInN1YiI6IjY2OWU3OWYxNDMzOTY2ZGVkMDM1YmJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TFvmHGiEPHH8SaC4fAu-jQaGE57Y8ci0tJxFNbp0MwQ'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results[0]))
            .catch(err => console.error(err));
    }, [])
    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={() => { navigate("/") }} />
            <iframe src={`https://www.youtube.com/embed/${apiData.key}`}
                frameBorder="0" width="90%" height="90%"
                title='trailer' allowFullScreen></iframe>

            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    );
}

export default Player;