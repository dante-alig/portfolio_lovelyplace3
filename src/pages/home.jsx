import { useState, useContext, useEffect, useRef } from "react";
import Items from "../components/Items";
import ItemsFilters from "../components/ItemsFilters";
import { MyContext } from "../context/myContext";
import {
  drinkItemsFiltersData,
  eatItemsFiltersData,
  funItemsFiltersData,
} from "../utils/itemsFiltersData";
import ModalFilter from "../components/ModalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMartiniGlass,
  faUtensils,
  faTicket,
  faAngleLeft,
  faAngleRight,
  faMap,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import MapLocation from "../components/MapLocation";
import { fetchDataItems } from "../services/fetchDataItems";

/**
 * Page d'accueil de l'application
 * Affiche les lieux selon différentes catégories (drink, eat, fun) avec des filtres
 * Permet de basculer entre une vue liste et une vue carte
 */
const Home = () => {
  // Récupération des états et setters depuis le contexte global
  const {
    items,
    setItems,
    setLoadingData,
    categorieItems,
    setCategorieItems,
    filterParams,
    setFilterParams,
  } = useContext(MyContext);

  // États locaux pour la gestion de l'interface
  const [buttonActiv, setButtonActiv] = useState(null); // Bouton de filtre actif
  const [openMap, setOpenMap] = useState(false); // État d'affichage de la carte
  const [showModal, setShowModal] = useState(false); // État d'affichage de la modal de filtres

  // Références pour la gestion des clics extérieurs et du défilement
  const modalRef = useRef(null);
  const filtersRef = useRef(null);

  /**
   * Effet pour charger les données des lieux
   * Se déclenche lors des changements de catégorie ou de filtres
   */
  useEffect(() => {
    fetchDataItems(setItems, setLoadingData, categorieItems, filterParams);
  }, [categorieItems, filterParams]);

  /**
   * Gère la fermeture de la modal lors d'un clic à l'extérieur
   * @param {MouseEvent} event - L'événement de clic
   */
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  /**
   * Sélectionne les données de filtres selon la catégorie active
   * @returns {Array} Tableau des filtres disponibles pour la catégorie
   */
  const selecItemsFiltersData = () => {
    switch (categorieItems) {
      case "eat":
        return eatItemsFiltersData;
      case "drink":
        return drinkItemsFiltersData;
      case "fun":
        return funItemsFiltersData;
      default:
        return [];
    }
  };

  /**
   * Effet pour gérer les événements de clic extérieur sur la modal
   */
  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  /**
   * Gère le défilement horizontal de la barre de filtres
   * @param {string} direction - Direction du défilement ('left' ou 'right')
   */
  const handleScroll = (direction) => {
    if (filtersRef.current) {
      const scrollAmount = 200; // Quantité de défilement en pixels
      const currentScroll = filtersRef.current.scrollLeft;
      filtersRef.current.scrollTo({
        left:
          direction === "right"
            ? currentScroll + scrollAmount
            : currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-container">
      <div className="mobile-notice">
        <p>
          Ce site n'est pas encore adapté à ce format nous vous conseillons de
          le lancer depuis un ordinateur
        </p>
      </div>
      {/* Barre de catégories principales */}
      <div className="category-bar-box">
        <div className="category-bar">
          {/* Catégorie "Prendre un verre" */}
          <div
            className={categorieItems === "drink" ? "drink-activ" : "drink"}
            onClick={() => {
              setCategorieItems("drink");
              setFilterParams(null);
            }}
          >
            Prendre un verre
            <FontAwesomeIcon icon={faMartiniGlass} />
          </div>
          {/* Catégorie "Manger ensemble" */}
          <div
            className={categorieItems === "eat" ? "eat-activ" : "eat"}
            onClick={() => {
              setCategorieItems("eat");
              setFilterParams(null);
            }}
          >
            Manger ensemble
            <FontAwesomeIcon icon={faUtensils} />
          </div>
          {/* Catégorie "Partager une activité" */}
          <div
            className={categorieItems === "fun" ? "fun-activ" : "fun"}
            onClick={() => {
              setCategorieItems("fun");
              setFilterParams(null);
            }}
          >
            Partager une activité <FontAwesomeIcon icon={faTicket} />
          </div>
        </div>
      </div>

      {/* Barre de filtres avec défilement */}
      <div className="filters-bar">
        {/* Boutons de défilement */}
        <div className="arrow" onClick={() => handleScroll("left")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {/* Liste des filtres défilante */}
        <div className="direct-filters" ref={filtersRef}>
          {Array.isArray(selecItemsFiltersData()) &&
            selecItemsFiltersData().map((filter) => (
              <ItemsFilters
                key={filter.id}
                filterData={filter}
                setFilterParams={setFilterParams}
                setButtonActiv={setButtonActiv}
                buttonActiv={buttonActiv}
                numberTab={filter.id}
                setCategorieItems={setCategorieItems}
              />
            ))}
        </div>
        <div className="arrow" onClick={() => handleScroll("right")}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>

        {/* Bouton de basculement carte/liste */}
        <div
          className={!openMap ? "map" : "map-closed"}
          onClick={() => setOpenMap(!openMap)}
        >
          {!openMap ? "Regarder sur une carte" : "Fermer la carte"}
          <FontAwesomeIcon className="fa-map" icon={faMap} />
        </div>

        {/* Bouton d'ouverture de la modal de filtres */}
        <div className="filter-icon" onClick={() => setShowModal(true)}>
          Filtres
          <FontAwesomeIcon icon={faSliders} />
        </div>
      </div>

      {/* Contenu principal : liste des lieux ou carte */}
      {!openMap ? (
        // Vue liste
        <div className="items-container">
          <div className="items-box">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => <Items key={item._id} item={item} />)
            ) : (
              <div>Aucun item trouvé</div>
            )}
          </div>
        </div>
      ) : (
        // Vue carte
        <div className="geoloc-container">
          <MapLocation />
          <div className="geoloc"></div>
        </div>
      )}

      {/* Modal de filtres avancés */}
      {showModal && (
        <ModalFilter modalRef={modalRef} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Home;
