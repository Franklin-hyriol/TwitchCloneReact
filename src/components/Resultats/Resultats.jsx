import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import Erreur from '../Erreur/Erreur';

function Resultats() {

    const { slug } = useParams();
    const [result, setResult] = useState(true);
    const [streamerInfo, setstreamerInfo] = useState([]);

    let cleanSearch = slug.replace(/ /g, '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get("https://api.twitch.tv/helix/users?login=" + cleanSearch);

                if (result.data.data.length === 0) {
                    setResult(false);
                } else {
                    setstreamerInfo(result.data.data);
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [slug]);

    return (

        result ?

            <div>

                <div className="containerDecaleResultats">
                    <h4>Resultat de recherche : </h4>

                    {streamerInfo.map((stream, index) => (
                        <div key={index} className="carteResultats">
                            <img src={stream.profile_image_url} alt="profil image" />

                            <div className="cardBodyResults">
                                <h5 className="titreCartesStream">{stream.display_name}</h5>

                                <div className="txtResult">
                                    {stream.description}
                                </div>

                                <Link className="lien" to={"/live/" + stream.login}>
                                    <div className="btnCarte btnResult">Regarder {stream.display_name}</div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            : <Erreur />
    )
}

export default Resultats;