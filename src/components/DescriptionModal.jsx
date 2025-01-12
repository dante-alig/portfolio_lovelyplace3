import React, { useState } from "react";
import { updateDescription } from "../services/sendForm";

/**
 * Composant modal pour modifier la description d'un lieu
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - État d'ouverture de la modal
 * @param {function} props.onClose - Fonction pour fermer la modal
 * @param {string} props.locationId - ID du lieu à modifier
 * @param {string} props.currentDescription - Description actuelle du lieu
 * @param {function} props.onDescriptionUpdate - Callback appelé après la mise à jour de la description
 */
const DescriptionModal = ({
  isOpen,
  onClose,
  locationId,
  currentDescription,
  onDescriptionUpdate,
}) => {
  // État local pour gérer le contenu de la description
  const [description, setDescription] = useState(currentDescription || "");
  // État local pour gérer les messages d'erreur
  const [error, setError] = useState("");

  /**
   * Gère la soumission du formulaire de modification de la description
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API pour mettre à jour la description
      const result = await updateDescription(locationId, description);
      // Mise à jour de l'interface utilisateur avec la nouvelle description
      onDescriptionUpdate(result.locationDescription);
      // Réinitialisation de l'état d'erreur
      setError("");
      // Fermeture de la modal
      onClose();
    } catch (error) {
      // Gestion des erreurs avec message personnalisé
      setError(error.message || "Une erreur est survenue");
    }
  };

  // Ne rien afficher si la modal est fermée
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* En-tête de la modal */}
        <div className="modal-header">
          <h2>Modifier la description</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corps de la modal avec le formulaire */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Zone de texte pour la description */}
            <div className="form-group">
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Entrez la description"
                className="form-textarea"
                rows={6} // Hauteur de 6 lignes pour une meilleure lisibilité
              />
            </div>

            {/* Affichage des erreurs s'il y en a */}
            {error && <p className="error-message">{error}</p>}

            {/* Pied de la modal avec le bouton de soumission */}
            <div className="modal-footer">
              <button
                type="submit"
                className="submit-button"
                disabled={!description.trim()} // Désactive le bouton si la description est vide
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
