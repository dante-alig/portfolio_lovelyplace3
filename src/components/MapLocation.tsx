import React, { useContext, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import PoiMarkers from "./PoiMarkers";
import { MyContext } from "../context/myContext";
import { addressToCoordinates } from "../utils/addressToCoordinates";

/**
 * Composant MapLocation - Affiche une carte Google Maps avec les lieux et la position de l'utilisateur
 * Fonctionnalités :
 * - Géolocalisation de l'utilisateur
 * - Affichage des lieux (POIs) à partir des items du contexte
 * - Conversion des adresses en coordonnées géographiques
 * - Marqueurs personnalisés pour les lieux et la position utilisateur
 */
const MapLocation = () => {
  /**
   * Type pour les points d'intérêt (POIs) sur la carte
   * @typedef {Object} Poi
   * @property {string} key - Identifiant unique du POI
   * @property {google.maps.LatLngLiteral} location - Coordonnées géographiques
   * @property {string} title - Nom du lieu
   * @property {string} description - Description du lieu
   * @property {string} image - URL de l'image du lieu
   * @property {string} id - ID unique du lieu dans la base de données
   */
  type Poi = {
    key: string;
    location: google.maps.LatLngLiteral;
    title: string;
    description: string;
    image: string;
    id: string;
  };

  // Récupération des items depuis le contexte global
  const { items } = useContext(MyContext);

  // États pour gérer les lieux et la position utilisateur
  const [locations, setLocations] = useState<Poi[]>([]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({
    lat: 48.8566, // Coordonnées par défaut (Paris)
    lng: 2.3522,
  });

  /**
   * Effet pour gérer la géolocalisation de l'utilisateur
   * Utilise l'API de géolocalisation du navigateur
   * Si non disponible, garde les coordonnées par défaut (Paris)
   */
  useEffect(() => {
    // Géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
    }
  }, []);

  /**
   * Effet pour convertir les adresses des items en coordonnées géographiques
   * Se déclenche à chaque changement des items
   * Utilise le service de géocodage pour obtenir les coordonnées
   */
  useEffect(() => {
    const fetchLocations = async () => {
      // Conversion de chaque adresse en coordonnées
      const promises = items.map(async (item) => {
        const key = item.locationName;
        const locationAdress = `${item.locationAddress} ${item.postalCode}`;
        const locationDescription = item.locationDescription;
        const photo = item.photos[0];
        const id = item._id;
        return await addressToCoordinates(
          locationAdress,
          key,
          locationDescription,
          photo,
          id
        );
      });

      // Filtrage des résultats nuls (adresses non trouvées)
      const results = (await Promise.all(promises)).filter(
        (loc) => loc !== null
      );
      setLocations(results);
    };

    fetchLocations();
    console.log(locations);
  }, [items]);

  return (
    <div className="items-container-map">
      {/* Provider pour l'API Google Maps */}
      <APIProvider
        apiKey={"AIzaSyDGTAFKoRVbBsH6XN_FEXAoLcIksZd9jCU"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        {/* Composant Map avec configuration initiale */}
        <Map
          defaultZoom={13}
          defaultCenter={userLocation} // Centré sur la position utilisateur
          mapId="55c6528e13212143"
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          {/* Marqueurs pour les lieux (POIs) */}
          <PoiMarkers pois={locations} color="#FBBC04" />

          {/* Marqueur pour la position de l'utilisateur */}
          <PoiMarkers
            pois={[
              {
                key: "user-location",
                location: userLocation,
                title: "Votre position",
                description: "Vous êtes ici",
                image: "",
                id: "user",
              },
            ]}
            color="#DA443B"
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapLocation;
