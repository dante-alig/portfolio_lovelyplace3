import React, { useState, useCallback } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { getFirstSentence } from "../utils/getFirstSentence";

/**
 * Type définissant la structure d'un point d'intérêt (POI)
 * @typedef {Object} Poi
 * @property {string} key - Identifiant unique du marqueur
 * @property {google.maps.LatLngLiteral} location - Position géographique (lat/lng)
 * @property {string} title - Titre du lieu
 * @property {string} description - Description complète du lieu
 * @property {string} image - URL de l'image du lieu
 * @property {string} id - Identifiant unique pour le lien vers la page détaillée
 */
type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
  title: string;
  description: string;
  image: string;
  id: string;
};

/**
 * Composant PoiMarkers - Affiche des marqueurs personnalisés sur une carte Google Maps
 * Chaque marqueur représente un point d'intérêt et affiche une infobulle au clic
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Poi[]} props.pois - Liste des points d'intérêt à afficher
 * @param {string} props.color - Couleur de fond des marqueurs
 */
const PoiMarkers: React.FC<{ pois: Poi[]; color: string }> = ({
  pois = [],
  color = "",
}) => {
  // Récupération de l'instance de la carte
  const map = useMap();
  // État pour gérer l'infobulle active
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  /**
   * Gère le clic sur un marqueur
   * - Ferme l'infobulle précédente
   * - Crée et affiche une nouvelle infobulle avec les informations du POI
   * - Sécurise les données contre les injections XSS
   *
   * @param {Poi} poi - Le point d'intérêt cliqué
   */
  const handleClick = useCallback(
    (poi: Poi) => {
      if (!map) return;

      // Ferme l'infobulle précédente
      infoWindow?.close();

      // Sécurise les données contre les injections XSS
      const sanitizedTitle = poi.title
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const sanitizedDescription = getFirstSentence(poi.description)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Crée une nouvelle infobulle avec un contenu HTML personnalisé
      const newInfoWindow = new google.maps.InfoWindow({
        content: `
        <div style="max-width: 200px; font-family: Arial; line-height: 20px;">
          <h4 style="font-size: 19px; font-weight: 600;">${sanitizedTitle}</h4>
          <img src="${poi.image}" alt="${sanitizedTitle}" 
               style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-top: 5px; margin-bottom: 5px;" 
               onError="this.src='/default-image.jpg'"/>
          <p>${sanitizedDescription}</p>
          <a href="/selectedLocation/${poi.id}" target="_blank" 
             style="display: inline-block; text-align: center; text-decoration: none; padding: 10px 15px; background-color: #007BFF; color: #fff; border-radius: 5px; font-size: 14px; margin-top: 10px;">
             En savoir plus
          </a>
        </div>
      `,
      });

      // Positionne et affiche l'infobulle
      newInfoWindow.setPosition(poi.location);
      newInfoWindow.open(map);
      setInfoWindow(newInfoWindow);
    },
    [map, infoWindow]
  );

  return (
    <>
      {/* Création d'un marqueur pour chaque POI */}
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => handleClick(poi)}
        >
          {/* Pin personnalisé avec la couleur spécifiée */}
          <Pin background={color} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
