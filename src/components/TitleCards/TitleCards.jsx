import React, { useEffect, useState } from 'react';
import "./TitleCard.css";
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiDat, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODcxMTExMTI4ZWI2ZmZhYTYzZDMxNjA1YzA4YmQ4MiIsIm5iZiI6MTc2MDYyMjIyNC4yMDk5OTk4LCJzdWIiOiI2OGYwZjY5MDNmODQ4MTEyYTVjMjNlYWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.q9BwDPLz-_LbwDRmp371elL8rxKqzMu_nuuuysBO-3Q"
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="title-Card">
      <h2>{title || "Popular on Netflix"}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="card-list">
        {apiDat.map((data) => (
          <Link to={`/player/${data.id}`} className="card" key={data.id}>
            <img
              src={
                data.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                  : "/fallback-image.jpg"
              }
              alt={data.original_title}
            />
            <p>{data.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
