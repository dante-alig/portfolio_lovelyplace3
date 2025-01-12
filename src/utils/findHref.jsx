/**
 * Utilitaire pour extraire l'URL d'un attribut href dans une chaîne HTML
 *
 * @function extractHref
 * @param {string} htmlString - Chaîne de caractères HTML contenant potentiellement un attribut href
 * @returns {string|null} L'URL extraite de l'attribut href ou null si non trouvée
 *
 * @example
 * // Extraire une URL d'une balise HTML
 * const html = '<a href="https://example.com">Lien</a>';
 * const url = extractHref(html); // Retourne "https://example.com"
 *
 * // Si aucun href n'est trouvé
 * const text = 'Simple texte sans href';
 * const result = extractHref(text); // Retourne null
 */
export const extractHref = (htmlString) => {
  // Expression régulière pour trouver l'attribut href et son contenu
  // Capture les URLs entre guillemets simples ou doubles
  const hrefRegex = /href=["']([^"']+)["']/;

  // Recherche du pattern dans la chaîne HTML
  const match = htmlString.match(hrefRegex);

  // Retourne l'URL capturée (premier groupe de capture) ou null
  return console.log(match ? match[1] : null);
};
