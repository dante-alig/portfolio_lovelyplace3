import React, { createContext, useState } from "react";

/**
 * Contexte global de l'application
 * Gère l'état partagé entre les composants pour les lieux et les filtres
 * @type {React.Context}
 */
export const MyContext = createContext();

/**
 * Provider du contexte global
 * Fournit les états et leurs setters à tous les composants enfants
 *
 * @component
 * @param {Object} props - Les propriétés du provider
 * @param {React.ReactNode} props.children - Les composants enfants qui auront accès au contexte
 */
export const MyContextProvider = ({ children }) => {
  // États liés aux lieux
  const [items, setItems] = useState(""); // Liste des lieux affichés
  const [loadingData, setLoadingData] = useState(""); // État de chargement des données
  const [selectedItem, setSelectedItem] = useState(""); // Lieu sélectionné pour la vue détaillée

  // État d'authentification
  const [adminLogin, setAdminLogin] = useState(false); // État de connexion administrateur

  // États liés aux filtres et catégories
  const [categorieItems, setCategorieItems] = useState("drink"); // Catégorie active (drink par défaut)
  const [filterParams, setFilterParams] = useState(null); // Paramètres de filtrage actuels

  // États liés aux détails des lieux
  const [address, setAddress] = useState(""); // Adresse du lieu
  const [priceRange, setPriceRange] = useState(""); // Fourchette de prix
  const [season, setSeason] = useState("été"); // Saison recommandée
  const [cuisine, setCuisine] = useState(""); // Type de cuisine (pour les restaurants)

  return (
    <MyContext.Provider
      value={{
        // États et setters pour les lieux
        items,
        setItems,
        loadingData,
        setLoadingData,
        selectedItem,
        setSelectedItem,

        // États et setters pour l'authentification
        adminLogin,
        setAdminLogin,

        // États et setters pour les filtres
        categorieItems,
        setCategorieItems,
        filterParams,
        setFilterParams,

        // États et setters pour les détails des lieux
        address,
        setAddress,
        priceRange,
        setPriceRange,
        season,
        setSeason,
        cuisine,
        setCuisine,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
