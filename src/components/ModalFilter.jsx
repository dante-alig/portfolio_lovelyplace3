import React, { useContext, useRef } from "react";
import { MyContext } from "../context/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

const ModalFilter = ({ modalRef, setShowModal }) => {
  const {
    address,
    setAddress,
    priceRange,
    setPriceRange,
    season,
    setSeason,
    cuisine,
    setCuisine,
    setCategorieItems,
    categorieItems,
    setFilterParams,
    filterParams,
  } = useContext(MyContext);

  const chooseCategory = (categorieItems) => {
    if (categorieItems === "drink") {
      return "prendre_un_verre";
    } else if (categorieItems === "eat") {
      return "manger_ensemble";
    } else if (categorieItems === "fun") {
      return "partager_une_activité";
    } else {
      return null;
    }
  };

  const handleApplyFilters = () => {
    if (address) {
      setFilterParams({
        ...filterParams,
        address: address,
        maxDistance: 100,
        placeCategory: chooseCategory(categorieItems),
      });
      setCategorieItems("filter-nearby");
      console.log("filterParams", filterParams);
    }

    setShowModal(false);
  };

  return (
    <div className="modal-overlay-filter">
      <div className="modal-filter-content" ref={modalRef}>
        <h2>Filtres</h2>
        <div className="modal-adress">
          <div>
            <p>Trouver des lieux ou des activités proche d'une adresse</p>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </div>

          <input
            type="text"
            placeholder="entrer une adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* <div className="modal-prix-title">Ranger par ordre de prix :</div>
        <div className="modal-prix-box">
          <div className="modal-prix">
            <p>économique</p>
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
          </div>
          <div className="modal-prix">
            <p>modéré</p>
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
          </div>
          <div className="modal-prix">
            <p>chère</p>
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
            <FontAwesomeIcon icon="fa-solid fa-euro-sign" />
          </div>
        </div>
        <div className="saison-global">
          <p>Trier en fonction de la saison</p>
          <div className="modal-saison-container">
            <div
              className="modal-saison-box"
              onClick={() => {
                setFilterParams({ typeOfSeason: "Intérieur" });
              }}
            >
              <FontAwesomeIcon
                className="fa-snowflake"
                icon="fa-solid fa-snowflake"
              />
              Adapté à l'hiver
            </div>
            <div
              className="modal-saison-box"
              onClick={() => {
                setFilterParams({ typeOfSeason: "Extérieur" });
              }}
            >
              <FontAwesomeIcon
                className="fa-umbrella-beach"
                icon="fa-solid fa-umbrella-beach"
              />
              Adapté à l'été
            </div>
          </div>
        </div>

        {categorieItems === "eat" && (
          <div>
            <label>Type de cuisine :</label>
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
        )} */}
        <div className="button-box">
          <div
            onClick={() => {
              setShowModal(false);
              setCategorieItems("drink");
              setFilterParams(null);
            }}
          >
            {/* <p>Tout effacer</p> */}
          </div>
          <button className="button-filter" onClick={handleApplyFilters}>
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
