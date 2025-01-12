import axios from "axios";

/**
 * URL de base de l'API backend
 * @constant {string}
 */
const BASE_URL =
  "https://site--portfolio-lovelyplace-backend--dqd24mcv82s5.code.run";

/**
 * Récupère la liste des lieux selon la catégorie et les filtres
 *
 * @async
 * @function fetchDataItems
 * @param {Function} setItems - Fonction pour mettre à jour la liste des lieux
 * @param {Function} setLoadingData - Fonction pour gérer l'état de chargement
 * @param {string} categorieItems - Catégorie des lieux à récupérer ('drink', 'eat', 'fun')
 * @param {Object} filterParams - Paramètres de filtrage (optionnel)
 * @throws {Error} Si la requête échoue
 *
 * @example
 * // Récupérer tous les restaurants
 * fetchDataItems(setItems, setLoadingData, 'eat', null);
 *
 * // Récupérer les bars avec des filtres
 * fetchDataItems(setItems, setLoadingData, 'drink', { price: 'low', ambiance: 'cozy' });
 */
export const fetchDataItems = async (
  setItems,
  setLoadingData,
  categorieItems,
  filterParams
) => {
  try {
    // Active l'indicateur de chargement si la fonction est fournie
    setLoadingData && setLoadingData(true);

    // Construction de l'URL avec les paramètres de filtrage
    const queryString = new URLSearchParams(filterParams).toString();
    const url = `${BASE_URL}/${categorieItems}${
      queryString ? `?${queryString}` : ""
    }`;
    console.log("filterParams>>>>", filterParams);
    console.log("URL de la requête:", url);

    // Exécution de la requête GET
    const response = await axios.get(url);
    const data = response.data;
    console.log("Données récupérées avec succès :", data);

    // Mise à jour de l'état avec les données reçues
    setItems(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  } finally {
    // Désactive l'indicateur de chargement, même en cas d'erreur
    setLoadingData && setLoadingData(false);
  }
};

/**
 * Récupère les détails d'un lieu spécifique
 *
 * @async
 * @function fetchDataSelectedItem
 * @param {string} idLocation - Identifiant unique du lieu
 * @param {Function} setSelectedItem - Fonction pour mettre à jour les détails du lieu
 * @returns {Promise<Object|null>} Les données du lieu ou null en cas d'erreur
 *
 * @example
 * // Récupérer les détails d'un lieu
 * const location = await fetchDataSelectedItem('123', setSelectedItem);
 * if (location) {
 *   console.log('Lieu trouvé:', location.name);
 * }
 */
export const fetchDataSelectedItem = async (idLocation, setSelectedItem) => {
  try {
    // Requête GET pour récupérer les détails du lieu
    const response = await axios.get(`${BASE_URL}/items/${idLocation}`);
    const location = response.data;
    console.log("Location récupérée :", location);

    // Mise à jour de l'état avec les détails du lieu
    setSelectedItem(location);
    return location;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'élément :", error);
    alert("Une erreur est survenue lors de la récupération de la location.");
    return null;
  }
};
