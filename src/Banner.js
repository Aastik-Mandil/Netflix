import React, { useEffect, useState } from 'react';
import axios from './axios_';
import request from './request';
import "./Banner.css"

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(request.fetchNetflixOriginals);
            setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length - 1)]);
        }
        fetchData();
    }, [])
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition: "center center" }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h3 className="banner_description">{truncate(movie?.overview, 150)}</h3>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    )
}

export default Banner