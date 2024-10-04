import React, { useEffect, useState } from "react";
import "./TitleCards.css";
 
import { useRef } from "react";
import { Link } from "react-router-dom";
const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWIyYjlmY2JmMDc4ZDI5Y2ZlNDk0NjRiZTUwZDNmOSIsIm5iZiI6MTcyNDg1Nzg1OC44MTA4NTEsInN1YiI6IjY2OGFlMjQxNTI0N2QwOTY3MDE1OTQyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BiAu1wNndQArkmXitQBSeUK0hjiwPpkiRHMVXPZH5nw",
    },
  };

  const HandleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaX;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", HandleWheel);
    
  });

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
