import { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchLocations } from "../services/sendForm";
import { MyContext } from "../context/myContext";
import { fetchDataItems } from "../services/fetchDataItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/lovelyplaceparis.png";

/**
 * Composant Header - Barre de navigation principale de l'application
 * Affiche différents éléments selon qu'on est sur la page d'accueil ou non :
 * - Sur la page d'accueil : logo, barre de recherche et bouton de connexion
 * - Sur les autres pages : logo et bouton de connexion uniquement
 */
const Header = () => {
  // Récupération de la location courante pour adapter l'affichage
  const location = useLocation();
  // États pour gérer la modal de connexion et la recherche
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Récupération des fonctions de mise à jour du contexte
  const { setItems, setCategorieItems } = useContext(MyContext);

  /**
   * Bascule l'affichage de la modal de connexion
   */
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  /**
   * Ferme la modal de connexion si on clique en dehors
   * @param {MouseEvent} e - L'événement de clic
   */
  const closeModalOnClickOutside = (e) => {
    if (e.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  /**
   * Gère la recherche de lieux
   * - Si la recherche n'est pas vide : lance la recherche
   * - Si la recherche est vide : réinitialise à la catégorie "drink"
   * @param {Event} e - L'événement de changement de l'input
   */
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      try {
        // Recherche des lieux correspondant à la requête
        await searchLocations(value, setItems);
      } catch (error) {
        console.error("Erreur de recherche:", error);
      }
    } else {
      // Réinitialisation à la catégorie par défaut
      setCategorieItems("drink");
      const items = await fetchDataItems("drink");
      setItems(items);
    }
  };

  // Détermine si nous sommes sur la page d'accueil
  const isHomePage = location.pathname === "/";

  return (
    <div className="header">
      {isHomePage ? (
        // Version header pour la page d'accueil
        <div className="header-container">
          {/* Logo avec lien vers l'accueil et réinitialisation des filtres */}
          <div className="header-logo">
            <Link
              to="/"
              onClick={() => {
                setCategorieItems("drink");
                setFilterParams(null);
              }}
            >
              <img src={logo} alt="logo" className="img" />
            </Link>
          </div>
          {/* Barre de recherche */}
          <div className="header-search">
            <input
              type="text"
              placeholder="Rechercher un lieu ou une activité..."
              value={searchQuery}
              onChange={handleSearch}
              className="header-search-input"
            />
          </div>
          {/* Bouton de connexion */}
          <div className="header-profil" onClick={toggleModal}>
            <FontAwesomeIcon icon={faUser} />
            <p>Se connecter</p>
          </div>
        </div>
      ) : (
        // Version header pour les autres pages
        <div className="header-container-location">
          {/* Logo avec lien simple vers l'accueil */}
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="logo" className="img" />
            </Link>
          </div>
          {/* Bouton de connexion */}
          <div className="header-profil" onClick={toggleModal}>
            <FontAwesomeIcon icon={faUser} />
            <p>Se connecter</p>
          </div>
        </div>
      )}

      {/* Modal de connexion */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModalOnClickOutside}>
          <div className="modal-content modal-content-login">
            <h2>Se connecter</h2>
            <form>
              {/* Formulaire de connexion */}
              <input type="email" placeholder="Votre email" required />
              <input
                type="password"
                placeholder="Votre mot de passe"
                required
              />
              <button type="submit">Connexion</button>
              {/* Bouton pour devenir membre premium */}
              <button className="premium">
                <p>Devenir membre Premium</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
