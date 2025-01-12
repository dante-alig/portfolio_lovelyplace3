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

/**
 * Convertit une adresse en coordonnées géographiques via l'API Google Maps Geocoding
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
  // Configuration de l'API Google Maps
  const apiKey = "AIzaSyDGTAFKoRVbBsH6XN_FEXAoLcIksZd9jCU";

  // Construction de l'URL de l'API avec l'adresse encodée
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    // Appel à l'API de géocodage
    const response = await fetch(url);
    const data = await response.json();

    // Vérification de la réponse
    if (data.status === "OK") {
      // Extraction des coordonnées de la réponse
      const location = data.results[0].geometry.location;

      // Construction de l'objet de retour avec toutes les informations du lieu
      return {
        key: key,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        title: key,
        description: locationDescription,
        image: photo,
        id: id,
      };
    } else {
      // Gestion des erreurs de l'API
      throw new Error(`Erreur lors de la géolocalisation : ${data.status}`);
    }
  } catch (error) {
    // Gestion des erreurs de requête
    console.error("Erreur :", error.message);
    return null;
  }
};
