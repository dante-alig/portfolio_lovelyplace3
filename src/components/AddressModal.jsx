import React, { useState } from "react";
import { updateAddress } from "../services/sendForm";

/**
 * Composant modal pour modifier l'adresse d'un lieu
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - État d'ouverture de la modal
 * @param {function} props.onClose - Fonction pour fermer la modal
 * @param {string} props.locationId - ID du lieu à modifier
 * @param {string} props.currentAddress - Adresse actuelle du lieu
 * @param {string} props.currentPostalCode - Code postal actuel du lieu
 * @param {function} props.onAddressUpdate - Callback appelé après la mise à jour de l'adresse
 */
const AddressModal = ({
  isOpen,
  onClose,
  locationId,
  currentAddress,
  currentPostalCode,
  onAddressUpdate,
}) => {
  // États locaux pour gérer le formulaire
  const [address, setAddress] = useState(currentAddress || "");
  const [postalCode, setPostalCode] = useState(currentPostalCode || "");
  const [error, setError] = useState("");

  /**
   * Gère la soumission du formulaire de modification d'adresse
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API pour mettre à jour l'adresse
      const result = await updateAddress(locationId, postalCode, address);
      // Mise à jour de l'interface utilisateur avec la nouvelle adresse
      onAddressUpdate(result.locationAddress, result.postalCode);
      setError("");
      onClose();
    } catch (error) {
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
          <h2>Modifier l'adresse</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corps de la modal avec le formulaire */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Champ pour l'adresse */}
            <div className="form-group">
              <label htmlFor="address">Adresse :</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Entrez l'adresse"
                className="form-input"
              />
            </div>

            {/* Champ pour le code postal */}
            <div className="form-group">
              <label htmlFor="postalCode">Code postal :</label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Code postal (5 chiffres)"
                className="form-input"
              />
            </div>

            {/* Affichage des erreurs s'il y en a */}
            {error && <p className="error-message">{error}</p>}

            {/* Pied de la modal avec le bouton de soumission */}
            <div className="modal-footer">
              <button type="submit" className="submit-button">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
