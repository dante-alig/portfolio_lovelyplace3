import React, { useState } from "react";
import { updateFilters } from "../services/sendForm";

/**
 * Composant modal pour gérer les filtres d'un lieu
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - État d'ouverture de la modal
 * @param {function} props.onClose - Fonction pour fermer la modal
 * @param {string} props.locationId - ID du lieu à modifier
 * @param {Array<string>} props.currentFilters - Liste des filtres actuels au format "clé:valeur"
 * @param {function} props.onFiltersUpdate - Callback appelé après la mise à jour des filtres
 */
const FiltersModal = ({
  isOpen,
  onClose,
  locationId,
  currentFilters,
  onFiltersUpdate,
}) => {
  // États locaux pour gérer le formulaire d'ajout de filtre
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");

  /**
   * Gère l'ajout d'un nouveau filtre
   * Vérifie que les champs ne sont pas vides avant d'ajouter
   */
  const handleAddFilter = async () => {
    if (!filterKey.trim() || !filterValue.trim()) {
      setError("La clé et la valeur sont requises");
      return;
    }

    const filterString = `${filterKey}:${filterValue}`;
    try {
      // Appel à l'API pour ajouter le nouveau filtre
      const updatedFilters = await updateFilters(locationId, "add", [
        filterString,
      ]);
      // Mise à jour de l'interface utilisateur
      onFiltersUpdate(updatedFilters);
      // Réinitialisation des champs et de l'erreur
      setFilterKey("");
      setFilterValue("");
      setError("");
    } catch (error) {
      setError(error.message || "Erreur lors de l'ajout du filtre");
    }
  };

  /**
   * Gère la suppression d'un filtre existant
   * @param {string} filterString - Le filtre à supprimer au format "clé:valeur"
   */
  const handleRemoveFilter = async (filterString) => {
    try {
      // Appel à l'API pour supprimer le filtre
      const updatedFilters = await updateFilters(locationId, "remove", [
        filterString,
      ]);
      // Mise à jour de l'interface utilisateur
      onFiltersUpdate(updatedFilters);
      setError("");
    } catch (error) {
      setError(error.message || "Erreur lors de la suppression du filtre");
    }
  };

  /**
   * Gère l'appui sur la touche Entrée pour ajouter un filtre
   * @param {KeyboardEvent} e - L'événement clavier
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && filterKey.trim() && filterValue.trim()) {
      handleAddFilter();
    }
  };

  // Ne rien afficher si la modal est fermée
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* En-tête de la modal */}
        <div className="modal-header">
          <h2>Gérer les filtres</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corps de la modal */}
        <div className="modal-body">
          {/* Formulaire d'ajout de filtre */}
          <div className="filter-inputs">
            <div className="filter-input-group">
              {/* Champ pour la clé du filtre */}
              <input
                type="text"
                value={filterKey}
                onChange={(e) => setFilterKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Clé du filtre (ex: Décoration)"
                className="filter-input"
              />
              {/* Champ pour la valeur du filtre */}
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Valeur du filtre (ex: Cosy)"
                className="filter-input"
              />
              {/* Bouton d'ajout, désactivé si les champs sont vides */}
              <button
                onClick={handleAddFilter}
                className="add-filter-button"
                disabled={!filterKey.trim() || !filterValue.trim()}
              >
                Ajouter
              </button>
            </div>
            {/* Affichage des erreurs s'il y en a */}
            {error && <p className="error-message">{error}</p>}
          </div>

          {/* Liste des filtres existants */}
          <div className="current-filters">
            <h3>Filtres actuels :</h3>
            <div className="filters-list">
              {currentFilters.map((filter, index) => {
                // Séparation de la chaîne "clé:valeur" en deux parties
                const [key, value] = filter.split(":");
                return (
                  <div key={index} className="filter-item">
                    <span>
                      {key}: {value}
                    </span>
                    {/* Bouton de suppression pour chaque filtre */}
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="remove-filter-button"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
