import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

function Sidebar() {
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("https://api.twitch.tv/helix/streams");

        let dataArray = result.data.data;

        let gameIDs = dataArray.map((stream) => {
          return stream.game_id;
        });

        let userIDs = dataArray.map((stream) => {
          return stream.user_id;
        });

        //Création des URLs personnalisés

        let baseUrlGames = "https://api.twitch.tv/helix/games?";
        let baseUrlUsers = "https://api.twitch.tv/helix/users?";

        let queryParamsGame = "";
        let queryParamsUsers = "";

        gameIDs.map((id) => {
          return (queryParamsGame = queryParamsGame + `id=${id}&`);
        });

        userIDs.map((id) => {
          return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
        });

        let urlFinalGames = baseUrlGames + queryParamsGame;
        let urlFinalUsers = baseUrlUsers + queryParamsUsers;

        let gamesNames = await api.get(urlFinalGames);
        let getUsers = await api.get(urlFinalUsers);

        let gamesNameArray = gamesNames.data.data;
        let arrayUsers = getUsers.data.data;

        //creation tableau final

        let finalArray = dataArray.map((stream) => {
          stream.gameName = "";
          stream.truePic = "";
          stream.login = "";

          gamesNameArray.forEach((name) => {
            arrayUsers.forEach((user) => {
              if (stream.user_id === user.id && stream.game_id === name.id) {
                stream.truePic = user.profile_image_url;
                stream.gameName = name.name;
                stream.login = user.login;
              }
            });
          });
          return stream;
        });

        setTopStreams(finalArray.slice(0, 6));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaines recommandées</h2>
      <ul className="listeStream">
        {topStreams.map((stream, index) => (

          <Link key={index} to={"/live/" + stream.login} className="lien">


            <li className="containerFlexSidebar">
              <img
                src={stream.truePic}
                alt="logo user"
                className="profilePicRonde"
              />

              <div className="streamUser">{stream.user_name}</div>

              <div className="viewerRight">
                <div className="pointRouge"></div>

                <div>{stream.viewer_count}</div>
              </div>

              <div className="gameNameSidebar">{stream.gameName}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
