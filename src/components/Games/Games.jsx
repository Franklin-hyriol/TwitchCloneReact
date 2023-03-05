import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("https://api.twitch.tv/helix/games/top");

        let dataArray = result.data.data;

        let finalArray = dataArray.map((game) => {
          let newUrl = game.box_art_url
            .replace("{width}", "240")
            .replace("{height}", "290");
          game.box_art_url = newUrl;
          return game;
        });

        setGames(finalArray);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="titreGames">Jeux les plus populaires</h1>

      <div className="flexAccueil">
        {games.map((game, index) => (
          <div key={index} className="carteGames">
            <img
              src={game.box_art_url}
              alt="jeu profil pic"
              className="imgCarte"
            />

            <div className="cardBodyGames">
              <h5 className="titreCarteGames">{game.name}</h5>

              <Link className="lien"
                to={"/game/" + game.name}
                state={{ gameID: game.id }}>

                <div className="btnCarte">Regarder {game.name}</div>

              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
