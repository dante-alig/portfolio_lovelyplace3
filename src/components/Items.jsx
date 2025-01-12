import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ContentLoader from "react-content-loader";
import { getFirstSentence } from "../utils/getFirstSentence";

/**
 * Composant Items - Affiche une carte pour un lieu
 * Gère deux états :
 * 1. État de chargement : affiche un placeholder animé
 * 2. État normal : affiche les informations du lieu
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.item - Les données du lieu à afficher
 * @param {string} props.item._id - Identifiant unique du lieu
 * @param {string} props.item.locationName - Nom du lieu
 * @param {string} props.item.postalCode - Code postal
 * @param {string} props.item.priceRange - Fourchette de prix
 * @param {string} props.item.locationDescription - Description complète du lieu
 * @param {Array<string>} props.item.photos - Liste des URLs des photos du lieu
 */
const Items = ({ item }) => {
  // Récupération de l'état de chargement depuis le contexte
  const { loadingData } = useContext(MyContext);

  // Affichage d'un placeholder pendant le chargement
  if (loadingData) {
    return (
      <ContentLoader
        speed={2}
        width={276}
        height={400}
        viewBox="0 0 276 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Placeholder pour l'image */}
        <rect x="0" y="0" rx="0" ry="0" width="276" height="276" />
        {/* Placeholders pour les informations */}
        <rect x="200" y="285" rx="0" ry="0" width="88" height="20" />
        <rect x="0" y="285" rx="0" ry="0" width="88" height="20" />
        <rect x="0" y="310" rx="0" ry="0" width="52" height="20" />
        <rect x="0" y="340" rx="0" ry="0" width="52" height="20" />
        {/* Placeholder pour la description */}
        <rect x="0" y="370" rx="0" ry="0" width="276" height="60" />
      </ContentLoader>
    );
  } else {
    return (
      <div className="item-container">
        {/* Lien vers la page détaillée du lieu */}
        <Link to={`/selectedLocation/${item?._id}`}>
          {/* Section image */}
          <div className="item-img">
            <img
              src={item?.photos?.[0] || "/default-image.jpg"} // Image par défaut si aucune photo n'est disponible
              alt={item?.locationName || "Location"}
              className="img"
            />
          </div>

          {/* Section informations principales */}
          <div className="item-box">
            <div className="item-infos">
              {/* Nom, code postal et prix */}
              <div className="item-title">{item?.locationName || "N/A"}</div>
              <div className="item-postal">{item?.postalCode || "N/A"}</div>
              <div className="item-price">{item?.priceRange || "N/A"}</div>
            </div>
            {/* Note et étoile */}
            <div className="note">
              <div className="star"></div>
              <div className="value">
                <FontAwesomeIcon icon={faStar} />
                4.9
              </div>
            </div>
          </div>

          {/* Section description (première phrase uniquement) */}
          <div className="description">
            {getFirstSentence(
              item?.locationDescription || "No description available."
            )}
          </div>
        </Link>
      </div>
    );
  }
};

export default Items;
