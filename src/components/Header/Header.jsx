import React, { useEffect, useState } from "react";
import logo from "./IconeTwitch.svg";
import search from "./Search.svg";
import menuIcon from "./MenuIcon.svg";
import croix from "./Croix.svg";
import { Link } from "react-router-dom";

function Header() {
  const [menu, showMenu] = useState(false);
  const [smallScreen, setsmallScreen] = useState(false);
  const [searchInput, setSearch] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    mediaQuery.addEventListener("change", () => handleMediaQueryChange(mediaQuery));

    return () => {
      mediaQuery.removeEventListener("change", () => handleMediaQueryChange(mediaQuery));
    }
  })

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setsmallScreen(true);
    } else {
      setsmallScreen(false);
    }
  }

  const toggleNavRes = () => {
    showMenu(!menu);
  }

  const hideMenu = () => {
    if (menu === true) {
      showMenu(!menu)
    }
  }

  const handleSubmit = () => {
    e.preventDefault();
  }

  const handleKeyPress = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (

          <ul className="listeMenu">
            <li className="liensNav" onClick={hideMenu}>
              <Link className="lien" to="/">
                <img src={logo} alt="logo twitch" className="logo" />
              </Link>
            </li>
            <li className="liensNav" onClick={hideMenu}>
              <Link className="lien" to="/">
                Top Games
              </Link>
            </li>
            <li className="liensNav" onClick={hideMenu}>
              <Link className="lien" to="/top-streams">
                Top Streams
              </Link>
            </li>
            <li className="liensNav">
              <form className="formSubmit" onSubmit={handleSubmit}>
                <input value={searchInput} type="text" className="inputSearch" onChange={(e) => handleKeyPress(e)} />

                <Link className="lien" to={"/resultats/" + searchInput}>
                  <button type="submit">
                    <img src={search} alt="icone loupe" className="logoLoupe" />
                  </button>
                </Link>


              </form>
            </li>
          </ul>
        )}
      </nav>

      <div className="menuResBtn">
        <img onClick={toggleNavRes} src={!menu ? menuIcon : croix} alt="icone menu responsive" className="menuIcon" />
      </div>
    </div >
  );
}

export default Header;
