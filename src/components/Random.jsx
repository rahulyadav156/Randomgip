import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Random.css"; 
import Spinner from "./Spinner";

function Random() {
  const [rand, setRand] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGip = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_API_KEY}`
    );
   

    setRand(res.data.data.images.original.url);
    setLoading(false); // ✅ set back to false
  };

  useEffect(() => {
    fetchGip(); // load one gif on component mount
  }, []);

  function clickHandler() {
    fetchGip(); // fetch new gif on button click
  }

  return (
    <div>
      <h1>Random Gif</h1>

      {loading ? <Spinner /> : <img src={rand} alt="Random Gif" />}
      
      <br />
      <button onClick={clickHandler}>Get New Gif</button>
    </div>
  );
}

export default Random;
