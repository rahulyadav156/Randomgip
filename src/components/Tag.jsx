import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import "./Tag.css";

function Tag() {
  const [tag, setTag] = useState("");
  const [rand, setRand] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGip = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_API_KEY}&tag=${tag}`
      );
      setRand(res.data.data.images.original.url);
    } catch (error) {
      console.error("Error fetching gif:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGip();
  }, []);

  const clickHandler = () => fetchGip();
  const changeHandler = (e) => setTag(e.target.value);

  return (
    <div className="app-container">
      <h1>🎬 Random GIF Generator</h1>
      <div className="gif-card">
        {loading ? <Spinner /> : <img src={rand} alt="Random Gif" />}
      </div>

      <input
        type="text"
        placeholder="Enter tag (optional)"
        value={tag}
        onChange={changeHandler}
      />

      <button onClick={clickHandler} >
     Generate
      </button>
    </div>
  );
}

export default Tag;
