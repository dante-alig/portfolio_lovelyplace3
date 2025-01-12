/**
 * Type définissant la structure d'un lieu géolocalisé
 * @typedef {Object} GeocodedLocation
 * @property {string} key - Identifiant unique du lieu
 * @property {Object} location - Coordonnées géographiques
 * @property {number} location.lat - Latitude
 * @property {number} location.lng - Longitude
 * @property {string} title - Titre du lieu (même que la clé)
 * @property {string} description - Description du lieu
 * @property {string} image - URL de l'image du lieu
 * @property {string} id - Identifiant unique pour la base de données
 */

import axios from 'axios';

const BASE_URL = "https://site--portfolio-lovelyplace-backend--dqd24mcv82s5.code.run";

/**
 * Convertit une adresse en coordonnées géographiques via l'API du serveur
 *
 * @async
 * @function addressToCoordinates
 * @param {string} address - Adresse à convertir en coordonnées
 * @param {string} key - Identifiant unique du lieu
 * @param {string} locationDescription - Description du lieu
 * @param {string} photo - URL de l'image du lieu
 * @param {string} id - Identifiant unique pour la base de données
 * @returns {Promise<GeocodedLocation|null>} Objet contenant les coordonnées et informations du lieu, ou null en cas d'erreur
 * @throws {Error} Si la géolocalisation échoue
 */
export const addressToCoordinates = async (
  address,
  key,
  locationDescription,
  photo,
  id
) => {
  try {
    const response = await axios.post(`${BASE_URL}/geocode`, {
      address,
      key,
      locationDescription,
      photo,
      id
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la géolocalisation :', error.message);
    return null;
  }
};
