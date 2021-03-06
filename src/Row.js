import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import instance from './axios_';
import './Row.css';

const baseurl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLarge }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl.length > 0) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img src={`${baseurl}${isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row__poster ${isLarge && `row__posterLarge`}`} key={movie.id} onClick={() => { handleClick(movie) }} />
                ))}
            </div>
            {trailerUrl.length > 0 && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
