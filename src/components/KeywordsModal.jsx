import React, { useState } from "react";
import { updateKeywords } from "../services/sendForm";

/**
 * Composant KeywordsModal - Modal de gestion des mots-clés d'un lieu
 * Permet d'ajouter et de supprimer des mots-clés associés à un lieu
 *
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - État d'ouverture de la modal
 * @param {Function} props.onClose - Fonction pour fermer la modal
 * @param {string} props.locationId - ID du lieu dont on gère les mots-clés
 * @param {Array<string>} props.currentKeywords - Liste des mots-clés actuels
 * @param {Function} props.onKeywordsUpdate - Callback appelé après la mise à jour des mots-clés
 */
const KeywordsModal = ({
  isOpen,
  onClose,
  locationId,
  currentKeywords,
  onKeywordsUpdate,
}) => {
  // États locaux pour gérer le formulaire d'ajout et les erreurs
  const [newKeyword, setNewKeyword] = useState("");
  const [error, setError] = useState("");

  /**
   * Gère l'ajout d'un nouveau mot-clé
   * Vérifie que le mot-clé n'est pas vide avant d'effectuer l'ajout
   */
  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) {
      setError("Le mot-clé ne peut pas être vide");
      return;
    }

    try {
      // Appel à l'API pour ajouter le nouveau mot-clé
      const updatedKeywords = await updateKeywords(locationId, "add", [
        newKeyword,
      ]);
      // Mise à jour de l'interface utilisateur
      onKeywordsUpdate(updatedKeywords);
      // Réinitialisation du formulaire
      setNewKeyword("");
      setError("");
    } catch (error) {
      setError(error.message || "Erreur lors de l'ajout du mot-clé");
    }
  };

  /**
   * Gère la suppression d'un mot-clé existant
   * @param {string} keyword - Le mot-clé à supprimer
   */
  const handleRemoveKeyword = async (keyword) => {
    try {
      // Appel à l'API pour supprimer le mot-clé
      const updatedKeywords = await updateKeywords(locationId, "remove", [
        keyword,
      ]);
      // Mise à jour de l'interface utilisateur
      onKeywordsUpdate(updatedKeywords);
    } catch (error) {
      setError(error.message || "Erreur lors de la suppression du mot-clé");
    }
  };

  // Ne rien afficher si la modal est fermée
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* En-tête de la modal */}
        <div className="modal-header">
          <h2>Gérer les mots-clés</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corps de la modal */}
        <div className="modal-body">
          {/* Formulaire d'ajout de mot-clé */}
          <div className="keyword-input-container">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Nouveau mot-clé"
              className="keyword-input"
            />
            <button onClick={handleAddKeyword} className="add-keyword-button">
              Ajouter
            </button>
          </div>

          {/* Affichage des erreurs s'il y en a */}
          {error && <p className="error-message">{error}</p>}

          {/* Liste des mots-clés existants */}
          <div className="current-keywords">
            <h3>Mots-clés actuels :</h3>
            <div className="keywords-list">
              {currentKeywords.map((keyword, index) => (
                <div key={index} className="keyword-item">
                  <span>{keyword}</span>
                  {/* Bouton de suppression pour chaque mot-clé */}
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="remove-keyword-button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordsModal;
