import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { fetchDataSelectedItem } from "../services/fetchDataItems";
import { editPhotosForm, deletePhoto } from "../services/sendForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeywordsModal from "../components/KeywordsModal";
import FiltersModal from "../components/FiltersModal";
import AddressModal from "../components/AddressModal";
import DescriptionModal from "../components/DescriptionModal";

/**
 * Page de détail d'un lieu
 * Affiche les informations détaillées d'un lieu sélectionné avec possibilité d'édition pour les administrateurs
 * @component
 */
const SelectedLocation = () => {
  // Récupération de l'ID du lieu depuis l'URL
  const { idLocation } = useParams();

  // Récupération des états depuis le contexte global
  const {
    selectedItem = {}, // Lieu sélectionné avec valeur par défaut vide
    setSelectedItem,
    adminLogin, // État de connexion administrateur
  } = useContext(MyContext) || {};

  // États pour la gestion des modales
  const [showModal, setShowModal] = useState(false); // Modal principale
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = useState(false); // Modal mots-clés
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false); // Modal filtres
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // Modal adresse
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false); // Modal description

  // États pour la gestion des images
  const [selectedFile, setSelectedFile] = useState(null); // Fichier image sélectionné
  const [previewImage, setPreviewImage] = useState(null); // Prévisualisation de l'image

  /**
   * Bascule l'affichage de la modal principale
   */
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  /**
   * Gère la sélection d'un fichier image
   * @param {Event} e - Événement de changement de fichier
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  /**
   * Gère l'envoi du formulaire d'ajout d'image
   */
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner une image avant de soumettre.");
      return;
    }

    editPhotosForm(idLocation, selectedFile);
    console.log("Image envoyée :", selectedFile);

    // Réinitialisation des états
    setSelectedFile(null);
    setPreviewImage(null);
    setShowModal(false);
  };

  /**
   * Met à jour l'adresse du lieu
   * @param {string} newAddress - Nouvelle adresse
   * @param {string} newPostalCode - Nouveau code postal
   */
  const handleAddressUpdate = (newAddress, newPostalCode) => {
    setSelectedItem({
      ...selectedItem,
      locationAddress: newAddress,
      postalCode: newPostalCode,
    });
  };

  /**
   * Met à jour la description du lieu
   * @param {string} newDescription - Nouvelle description
   */
  const handleDescriptionUpdate = (newDescription) => {
    setSelectedItem({
      ...selectedItem,
      locationDescription: newDescription,
    });
  };

  // Réinitialisation du lieu sélectionné au montage
  useEffect(() => {
    setSelectedItem("");
  }, []);

  // Chargement des données du lieu
  useEffect(() => {
    fetchDataSelectedItem(idLocation, setSelectedItem);
  }, []);

  /**
   * Gestion du script Instagram pour l'affichage des posts
   * Charge le script d'intégration Instagram si nécessaire
   */
  useEffect(() => {
    const existingScript = document.querySelector(
      "script[src='https://www.instagram.com/embed.js']"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [selectedItem]);

  return (
    <div className="selected-container">
      {/* En-tête avec nom du lieu et bouton retour */}
      <h2>
        <Link to="/">
          <FontAwesomeIcon
            className="select-arrow"
            icon="fa-solid fa-arrow-left"
          />
        </Link>
        {selectedItem.locationName}
      </h2>

      {/* Galerie d'images */}
      <div className="img-box">
        {/* Images 1 et 2 */}
        <div className="img1">
          {adminLogin && (
            <div
              className="deleted"
              aria-label={`Supprimer la photo 1`}
              onClick={() => {
                if (selectedItem.photos && selectedItem.photos[0])
                  deletePhoto(idLocation, selectedItem.photos[0]);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          )}
          {selectedItem.photos && selectedItem.photos[0] ? (
            <img src={selectedItem.photos[0]} alt={`Photo1`} />
          ) : (
            <p>image1</p>
          )}
        </div>

        <div className="img2">
          {adminLogin && (
            <div
              className="deleted"
              aria-label={`Supprimer la photo 2`}
              onClick={() => {
                if (selectedItem.photos && selectedItem.photos[1])
                  deletePhoto(idLocation, selectedItem.photos[1]);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          )}
          {selectedItem.photos && selectedItem.photos[1] ? (
            <img src={selectedItem.photos[1]} alt={`Photo2`} />
          ) : (
            <p>image2</p>
          )}
        </div>

        {/* Images 3 et 4 */}
        <div className="img-box2">
          <div className="img3">
            {adminLogin && (
              <div
                className="deleted"
                aria-label={`Supprimer la photo 3`}
                onClick={() => {
                  if (selectedItem.photos && selectedItem.photos[2])
                    deletePhoto(idLocation, selectedItem.photos[2]);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
            )}
            {selectedItem.photos && selectedItem.photos[2] ? (
              <img src={selectedItem.photos[2]} alt={`Photo3`} />
            ) : (
              <p>image3</p>
            )}
          </div>

          <div className="img4">
            {adminLogin && (
              <div
                className="deleted"
                aria-label={`Supprimer la photo 4`}
                onClick={() => {
                  if (selectedItem.photos && selectedItem.photos[3])
                    deletePhoto(idLocation, selectedItem.photos[3]);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
            )}
            {selectedItem.photos && selectedItem.photos[3] ? (
              <img src={selectedItem.photos[3]} alt={`Photo4`} />
            ) : (
              <p>image4</p>
            )}
          </div>
        </div>

        {/* Bouton d'édition des images pour les admins */}
        {adminLogin && (
          <div className="modal-box">
            <p onClick={handleToggleModal}>éditer les images</p>
          </div>
        )}
      </div>

      {/* Informations détaillées du lieu */}
      <div className="selected-box">
        <div className="about">
          {/* Boutons d'édition pour les admins */}
          {adminLogin && (
            <div>
              <div
                className="editkeywords"
                onClick={() => setIsKeywordsModalOpen(true)}
              >
                éditer les mots clés
              </div>
              <div
                className="editkeywords"
                onClick={() => setIsFiltersModalOpen(true)}
              >
                éditer les filtres
              </div>
            </div>
          )}

          {/* Description */}
          <h3>À propos de ce lieu</h3>
          <p>{selectedItem.locationDescription}</p>
          {adminLogin && (
            <div
              className="editdescription"
              onClick={() => setIsDescriptionModalOpen(true)}
            >
              éditer la description
            </div>
          )}

          {/* Adresse */}
          <p>
            <span>Adresse :</span>
            <Link to="#">
              {`${selectedItem.locationAddress}, ${selectedItem.postalCode}`}
            </Link>
          </p>
          {adminLogin && (
            <div
              className="editadress"
              onClick={() => setIsAddressModalOpen(true)}
            >
              éditer l'adresse
            </div>
          )}

          <div className="line"></div>

          {/* Conseils */}
          <div className="tips">
            <h4>Conseils</h4>
            <ul>
              {selectedItem.tips && JSON.parse(selectedItem.tips).length > 0 ? (
                JSON.parse(selectedItem.tips).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))
              ) : (
                <li>Aucun conseil disponible pour cet endroit.</li>
              )}
            </ul>
          </div>

          <div className="line"></div>

          {/* Section Instagram */}
          <div className="instagram">
            <div className="insta-title">
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
              <span>{selectedItem.socialmedia}</span>
            </div>
            <div className="insta-box">
              <div className="insta-line1">
                {Array.isArray(selectedItem.mediaLink) &&
                  selectedItem.mediaLink.length > 0 &&
                  selectedItem.mediaLink.map((link, index) => {
                    if (typeof link !== "string" || !link.trim()) {
                      return null;
                    }

                    return (
                      <div key={index}>
                        <blockquote
                          className="instagram-media"
                          data-instgrm-permalink={link}
                          data-instgrm-version="14"
                          style={{ maxWidth: "540px", margin: "auto" }}
                        ></blockquote>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Modales d'édition */}
          <KeywordsModal
            isOpen={isKeywordsModalOpen}
            onClose={() => setIsKeywordsModalOpen(false)}
            locationId={selectedItem._id}
            currentKeywords={selectedItem.keywords || []}
            onKeywordsUpdate={(updatedKeywords) => {
              setSelectedItem({
                ...selectedItem,
                keywords: updatedKeywords,
              });
            }}
          />
          <FiltersModal
            isOpen={isFiltersModalOpen}
            onClose={() => setIsFiltersModalOpen(false)}
            locationId={selectedItem._id}
            currentFilters={selectedItem.filters || []}
            onFiltersUpdate={(updatedFilters) => {
              setSelectedItem({
                ...selectedItem,
                filters: updatedFilters,
              });
            }}
          />
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            locationId={selectedItem._id}
            currentAddress={selectedItem.locationAddress}
            currentPostalCode={selectedItem.postalCode}
            onAddressUpdate={handleAddressUpdate}
          />
          <DescriptionModal
            isOpen={isDescriptionModalOpen}
            onClose={() => setIsDescriptionModalOpen(false)}
            locationId={selectedItem._id}
            currentDescription={selectedItem.locationDescription}
            onDescriptionUpdate={handleDescriptionUpdate}
          />
        </div>

        {/* Horaires */}
        <div className="horaires-box">
          <div className="horaires">
            <h3>
              <FontAwesomeIcon icon="fa-regular fa-clock" />
              Horaires
            </h3>
            {selectedItem.hours &&
              Object.entries(selectedItem.hours).map(
                ([jour, plages], index) => {
                  // Vérifie si le lieu est fermé ce jour
                  const isClosed = !Object.values(plages).some(
                    (horaires) => horaires.ouverture && horaires.fermeture
                  );

                  return (
                    <li key={index}>
                      <strong>
                        {jour.charAt(0).toUpperCase() + jour.slice(1)} :
                      </strong>
                      {isClosed ? (
                        <span>Fermé</span>
                      ) : (
                        <ul>
                          {Object.values(plages).map((horaires, idx) =>
                            horaires.ouverture && horaires.fermeture ? (
                              <li key={idx}>
                                {horaires.ouverture} - {horaires.fermeture}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </li>
                  );
                }
              )}
          </div>
        </div>
      </div>

      {/* Modal d'édition des images */}
      {showModal && (
        <div className="modal-overlay" onClick={handleToggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Éditer l'emplacement</h2>
            <p>Contenu de la modale ici</p>

            {/* Input file */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            {/* Afficher la prévisualisation de l'image */}
            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Prévisualisation"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            {/* Boutons pour envoyer le formulaire et fermer la modale */}
            <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
              Envoyer
            </button>
            <button onClick={handleToggleModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedLocation;
