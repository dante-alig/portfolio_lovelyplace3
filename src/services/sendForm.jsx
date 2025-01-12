/**
 * Module de service pour la gestion des soumissions de formulaires et la gestion des photos
 */

import axios from "axios";

const BASE_URL =
  "https://site--portfolio-lovelyplace-backend--dqd24mcv82s5.code.run";

/**
 * Envoie un nouveau formulaire de lieu au serveur
 * @param {string} locationName - Nom du lieu
 * @param {string} locationAddress - Adresse du lieu
 * @param {string} locationDescription - Description du lieu
 * @param {Array} tips - Tableau de conseils pour le lieu
 * @param {string} socialmedia - Liens des réseaux sociaux
 * @param {Object} mediaLink - Objet contenant les liens médias
 * @param {FileList} photos - Liste des fichiers photos à télécharger
 * @param {Object} hours - Informations sur les heures d'ouverture
 * @param {string} priceRange - Fourchette de prix du lieu
 * @param {Object} keywords - Mots-clés associés au lieu
 * @param {Object} filters - Catégories de filtres pour le lieu
 * @param {string} postalCode - Code postal du lieu
 * @param {string} placeCategory - Catégorie du lieu
 * @returns {Promise<void>}
 */
export const sendForm = async (
  locationName,
  locationAddress,
  locationDescription,
  tips,
  socialmedia,
  mediaLink,
  photos,
  hours,
  priceRange,
  keywords,
  filters,
  postalCode,
  placeCategory
) => {
  // Validation des champs : vérification des champs requis
  if (
    !locationName ||
    !locationAddress ||
    !locationDescription ||
    !priceRange
  ) {
    alert("Vous devez remplir tous les champs obligatoires.");
    return;
  }

  // Validation des types : vérification que les champs complexes sont du bon type
  if (
    typeof mediaLink !== "object" ||
    typeof hours !== "object" ||
    typeof filters !== "object" ||
    typeof keywords !== "object"
  ) {
    alert(
      "Les champs mediaLink, hours, filters, et keywords doivent être des objets ou des tableaux."
    );
    return;
  }

  try {
    // Création d'un objet FormData pour gérer les téléchargements de fichiers et les données du formulaire
    const formData = new FormData();

    // Ajout de tous les champs au FormData
    formData.append("locationName", locationName);
    formData.append("locationAddress", locationAddress);
    formData.append("locationDescription", locationDescription);
    formData.append("tips", JSON.stringify(tips));
    formData.append("socialmedia", socialmedia || "");
    formData.append("mediaLink", JSON.stringify(mediaLink));
    formData.append("hours", JSON.stringify(hours));
    formData.append("priceRange", priceRange);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("filters", JSON.stringify(filters));
    formData.append("postalCode", postalCode || "");
    formData.append("placeCategory", placeCategory || "");

    // Gestion des photos : ajout de chaque photo au FormData séparément
    if (photos && photos.length) {
      photos.forEach((photo) => {
        formData.append("photos", photo);
        console.log("La photo existe >>>", photo);
      });
    }

    // Envoi de la requête POST au serveur avec les données multipart
    const response = await axios.post(`${BASE_URL}/location`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Journalisation du succès et des données du formulaire pour le débogage
    console.log("Réponse du serveur:", response.data);
    alert("Données enregistrées avec succès !");
    console.log("Données envoyées:", {
      locationName,
      locationAddress,
      locationDescription,
      tips,
      socialmedia,
      mediaLink,
      hours,
      priceRange,
      keywords,
      filters,
      postalCode,
      placeCategory,
      photos,
    });
  } catch (error) {
    // Gestion des erreurs : journalisation et affichage des messages appropriés
    console.error("Erreur lors de l'envoi du formulaire:", error);

    if (error.response) {
      console.error("Détails de l'erreur:", error.response.data);
      alert(
        `Une erreur est survenue: ${
          error.response.data.message || "Erreur inconnue"
        }`
      );
    } else {
      alert("Une erreur est survenue lors de l'enregistrement des données.");
    }
  }
};

/**
 * Met à jour les photos d'un lieu existant
 * @param {string} idLocation - ID du lieu à mettre à jour
 * @param {File} selectedFile - Nouveau fichier photo à télécharger
 * @returns {Promise<Object>} Données de réponse du serveur
 */
export const editPhotosForm = async (idLocation, selectedFile) => {
  try {
    // Création d'un objet FormData pour gérer les téléchargements de fichiers
    const formData = new FormData();

    // Ajout de la nouvelle photo au FormData
    if (selectedFile) {
      console.log("selectedFile >>>", selectedFile);
      formData.append("photos", selectedFile);
    }

    // Configuration des en-têtes pour le téléchargement de fichiers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // Envoi de la requête PUT au serveur avec les données multipart
    const response = await axios.put(
      `${BASE_URL}/items/${idLocation}`,
      formData,
      config
    );

    console.log("Réponse du serveur:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la location:", error);
    throw error;
  }
};

/**
 * Supprime une photo d'un lieu
 * @param {string} idLocation - ID du lieu
 * @param {string} photoUrl - URL de la photo à supprimer
 * @returns {Promise<Object>} Données de réponse du serveur
 */
export const deletePhoto = async (idLocation, photoUrl) => {
  try {
    // Envoi de la requête DELETE au serveur avec l'URL de la photo
    const response = await axios.delete(
      `${BASE_URL}/items/${idLocation}/photo`,
      {
        data: { photoUrl }, // Inclusion de l'URL de la photo dans le corps de la requête
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Photo supprimée avec succès :", response.data);
      return response.data.photos; // Retour de la liste mise à jour des photos
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo :", error);
    alert("Une erreur est survenue lors de la suppression de la photo.");
  }
};

/**
 * Modifie les mots-clés d'un lieu
 * @param {string} idLocation - ID du lieu
 * @param {string} action - Action à effectuer ('add' ou 'remove')
 * @param {Array} keywords - Tableau de mots-clés à ajouter ou supprimer
 * @returns {Promise<Object>} Données de réponse du serveur avec les mots-clés mis à jour
 */
export const updateKeywords = async (idLocation, action, keywords) => {
  try {
    // Vérification des paramètres
    if (!["add", "remove"].includes(action)) {
      throw new Error("L'action doit être 'add' ou 'remove'");
    }

    if (!Array.isArray(keywords)) {
      throw new Error("keywords doit être un tableau");
    }

    // Envoi de la requête PUT au serveur
    const response = await axios.put(
      `${BASE_URL}/location/${idLocation}/keywords`,
      {
        action,
        keywords,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Mots-clés mis à jour avec succès:", response.data);
    return response.data.keywords;
  } catch (error) {
    console.error("Erreur lors de la modification des mots-clés:", error);
    throw error;
  }
};

/**
 * Modifie les filtres d'un lieu
 * @param {string} idLocation - ID du lieu
 * @param {string} action - Action à effectuer ('add' ou 'remove')
 * @param {Array} filters - Tableau de filtres au format 'clé:valeur'
 * @returns {Promise<Object>} Données de réponse du serveur avec les filtres mis à jour
 */
export const updateFilters = async (idLocation, action, filters) => {
  try {
    // Vérification des paramètres
    if (!["add", "remove"].includes(action)) {
      throw new Error("L'action doit être 'add' ou 'remove'");
    }

    if (!Array.isArray(filters)) {
      throw new Error("filters doit être un tableau");
    }

    // Validation du format des filtres (clé:valeur)
    const isValidFormat = filters.every((filter) => {
      return typeof filter === "string" && filter.includes(":");
    });

    if (!isValidFormat) {
      throw new Error(
        "Chaque filtre doit être au format 'clé:valeur' (ex: 'Décoration:Cosy')"
      );
    }

    // Envoi de la requête PUT au serveur
    const response = await axios.put(
      `${BASE_URL}/location/${idLocation}/filters`,
      {
        action,
        filters,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Filtres mis à jour avec succès:", response.data);
    return response.data.filters;
  } catch (error) {
    console.error("Erreur lors de la modification des filtres:", error);
    throw error;
  }
};

/**
 * Met à jour l'adresse et le code postal d'un lieu
 * @param {string} idLocation - ID du lieu
 * @param {string} postalCode - Code postal (5 chiffres)
 * @param {string} locationAddress - Nouvelle adresse
 * @returns {Promise<Object>} Données de réponse du serveur avec l'adresse mise à jour
 */
export const updateAddress = async (
  idLocation,
  postalCode,
  locationAddress
) => {
  try {
    // Vérification des champs requis
    if (!postalCode || !locationAddress) {
      throw new Error("Le code postal et l'adresse sont requis");
    }

    // Envoi de la requête PUT au serveur
    const response = await axios.put(
      `${BASE_URL}/location/${idLocation}/address`,
      {
        postalCode,
        locationAddress,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Adresse mise à jour avec succès:", response.data);
    return {
      postalCode: response.data.postalCode,
      locationAddress: response.data.locationAddress,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adresse:", error);
    throw error;
  }
};

/**
 * Met à jour la description d'un lieu
 * @param {string} idLocation - ID du lieu
 * @param {string} locationDescription - Nouvelle description
 * @returns {Promise<Object>} Données de réponse du serveur avec la description mise à jour
 */
export const updateDescription = async (idLocation, locationDescription) => {
  try {
    // Vérification du champ requis
    if (!locationDescription) {
      throw new Error("La description est requise");
    }

    // Envoi de la requête PUT au serveur
    const response = await axios.put(
      `${BASE_URL}/location/${idLocation}/description`,
      {
        locationDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Description mise à jour avec succès:", response.data);
    return {
      locationDescription: response.data.locationDescription,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la description:", error);
    throw error;
  }
};

/**
 * Effectue une recherche globale sur les lieux
 * @param {string} searchQuery - Terme de recherche
 * @returns {Promise<Array>} Tableau des lieux trouvés
 */
export const searchLocations = async (searchQuery, setItems) => {
  try {
    // Vérification du terme de recherche
    if (!searchQuery || typeof searchQuery !== "string") {
      throw new Error("Le terme de recherche est requis");
    }

    // Encodage des caractères spéciaux dans l'URL
    const encodedQuery = encodeURIComponent(searchQuery.trim());

    // Envoi de la requête GET au serveur
    const response = await axios.get(
      `${BASE_URL}/search?query=${encodedQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return setItems(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        // Aucun résultat trouvé
        return [];
      }
      if (error.response.status === 400) {
        throw new Error("Le terme de recherche est invalide");
      }
    }
    console.error("Erreur lors de la recherche:", error);
    throw new Error("Une erreur est survenue lors de la recherche");
  }
};
