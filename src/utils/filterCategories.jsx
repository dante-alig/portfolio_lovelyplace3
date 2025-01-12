/**
 * Catégories de filtres pour la recherche de lieux
 * Structure hiérarchique des filtres disponibles pour la recherche et le tri des lieux
 *
 * @type {Object.<string, Array<string>>}
 *
 * Les catégories principales sont :
 * - Type de lieu : Classification générale de l'établissement
 * - Ambiance : Atmosphère et style du lieu
 * - Options alimentaires : Types de cuisine et régimes spéciaux
 * - Spécificités des boissons : Types de boissons proposées
 * - Préférences musicales : Styles de musique joués
 * - Services : Prestations et facilités disponibles
 * - Budget : Niveau de prix
 * - Activité : Divertissements proposés
 * - Décoration : Style et design du lieu
 * - Niveau de bruit : Ambiance sonore
 * - Type d'espace : Configuration des lieux
 * - Préférences saisonnières : Adaptation aux saisons
 * - Popularité : Évaluations et tendances
 */
export const filterCategories = {
  // Classification principale des établissements
  "Type de lieu": [
    "Restaurant",
    "Bar",
    "Café",
    "Parc",
    "Rooftop",
    "Musée",
    "Bar clandestin (speakeasy)",
    "Lieu éphémère",
    "Petite capacité (ambiance intime)",
    "Bar d'hôtel",
  ],

  // Atmosphère et style général du lieu
  Ambiance: [
    "Romantique",
    "Détendue",
    "Branchée",
    "Intime",
    "Animée",
    "Vue panoramique",
    "Musique live",
  ],

  // Types de cuisine et régimes alimentaires spéciaux
  "Options alimentaires": [
    "Menu végétarien",
    "Menu végan",
    "Options sans gluten",
    "Plats halal",
    "Cuisine italienne",
    "Cuisine japonaise",
    "Cuisine française",
    "Cuisine mexicaine",
    "Brunch",
    "Cuisine indienne",
    "Cuisine thaïlandaise",
    "Cuisine méditerranéenne",
    "Cuisine libanaise",
    "Cuisine africaine",
    "Cuisine coréenne",
    "Cuisine fusion",
    "Street food",
    "Menu gastronomique",
    "Snacks et tapas",
    "Bar à salade",
  ],

  // Types de boissons et spécialités
  "Spécificités des boissons": [
    "Cocktails artisanaux",
    "Large choix de vins",
    "Bières artisanales",
    "Thés et infusions spécialisés",
    "Café de spécialité",
    "Mocktails (sans alcool)",
  ],

  // Styles de musique proposés
  "Préférences musicales": [
    "Musique classique",
    "Jazz",
    "Rock",
    "Electro",
    "Hip-hop/Rap",
    "Pop",
    "Pas de musique",
  ],

  // Services et facilités disponibles
  Services: [
    "Privatisation possible",
    "Lieu ouvert tard",
    "Serveurs multilingues",
    "Service en continu",
    "Espaces privés (alcôves, séparés...)",
    "Tables partagées",
    "Animaux acceptés",
  ],

  // Niveaux de prix
  Budget: [
    "€ (économique)", // Prix bas
    "€€ (modéré)", // Prix moyen
    "€€€ (cher)", // Prix élevé
  ],

  // Divertissements et activités proposés
  Activité: [
    "Jeux (Billard, Baby-foot, Fléchettes, Jeux de société...)",
    "Karaoké",
    "Spectacles en direct",
  ],

  // Style de décoration et design
  Décoration: [
    "Moderne",
    "Vintage",
    "Cosy",
    "Luxueuse",
    "Insolite",
    "Thématique",
    "Instagrammable",
  ],

  // Niveau sonore du lieu
  "Niveau de bruit": [
    "Calme", // Conversation facile
    "Modéré", // Ambiance animée mais conversation possible
    "Bruyant", // Ambiance festive
  ],

  // Configuration des espaces
  "Type d'espace": ["Intérieur", "Extérieur", "Terrasse chauffée"],

  // Adaptation aux saisons
  "Préférences saisonnières": ["Adapté à l'hiver", "Idéal pour l'été"],

  // Évaluations et tendances
  Popularité: [
    "4+ étoiles", // Très bien noté
    "3+ étoiles", // Bien noté
    "Lieux tendance", // Populaire actuellement
    "Nouveautés", // Récemment ouvert
    "Recommandés", // Recommandé par la communauté
  ],
};
