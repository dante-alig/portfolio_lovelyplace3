import { useState, useEffect } from "react";

/**
 * Composant ItemsFilters - Bouton de filtre pour les catégories de lieux
 * Permet de filtrer les lieux selon des catégories spécifiques (ex: restaurants, bars)
 * Le bouton peut être activé/désactivé et change d'apparence en conséquence
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.filterData - Données du filtre
 * @param {string} props.filterData.categorie - Catégorie principale (eat, drink, etc.)
 * @param {string} props.filterData.name - Nom affiché du filtre
 * @param {string} props.filterData.filterCategorieKey - Clé du filtre (ex: "type")
 * @param {string} props.filterData.filterCategorieValue - Valeur du filtre (ex: "restaurant")
 * @param {Function} props.setFilterParams - Fonction pour mettre à jour les paramètres de filtrage
 * @param {string} props.buttonActiv - ID du bouton actuellement actif
 * @param {Function} props.setButtonActiv - Fonction pour définir le bouton actif
 * @param {string} props.numberTab - ID unique du bouton
 * @param {Function} props.setCategorieItems - Fonction pour mettre à jour la catégorie active
 */
const ItemsFilters = ({
  filterData,
  setFilterParams,
  buttonActiv,
  setButtonActiv,
  numberTab,
  setCategorieItems,
}) => {
  // État local pour gérer l'activation/désactivation du filtre
  const [activ, setActiv] = useState(true);

  /**
   * Effet pour réinitialiser le bouton actif quand on change de catégorie principale
   * Se déclenche uniquement pour les catégories "eat" et "drink"
   */
  useEffect(() => {
    if (filterData.categorie === "eat" || filterData.categorie === "drink") {
      setButtonActiv("");
    }
  }, [filterData.categorie, setButtonActiv]);

  return (
    <div
      // Classe conditionnelle selon l'état d'activation du bouton
      className={
        buttonActiv === numberTab
          ? "itemFilters-container-hover"
          : "itemFilters-container"
      }
      onClick={() => {
        if (activ) {
          // Activation du filtre
          setButtonActiv(numberTab); // Marque ce bouton comme actif
          setActiv(false); // Désactive la possibilité de re-cliquer
          // Applique le filtre avec la catégorie spécifiée
          setFilterParams({
            filters: [
              `${filterData.filterCategorieKey}:${filterData.filterCategorieValue}`,
            ],
          });
          setCategorieItems(filterData.categorie); // Met à jour la catégorie principale
        } else {
          // Désactivation du filtre
          setButtonActiv(""); // Retire le marqueur de bouton actif
          setActiv(true); // Réactive la possibilité de cliquer
          setFilterParams(null); // Retire tous les filtres
        }
      }}
    >
      {/* Affichage du nom du filtre */}
      <p>{filterData.name}</p>
    </div>
  );
};

export default ItemsFilters;
