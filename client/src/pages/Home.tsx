import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useUser } from "@clerk/clerk-react";
import { BASE_API_URL } from "../App";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY; // Replace with your Google Maps API key

const Home: React.FC = () => {
  const { user } = useUser();

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // Dummy Data: Multiple markers near the University of Calgary
  const markers = [
    {
      id: 1,
      position: { lat: 51.0785, lng: -114.1306 },
      descriptions: ["Library", "Study Hall", "Cafeteria nearby"],
    },
    {
      id: 2,
      position: { lat: 51.079, lng: -114.131 },
      descriptions: ["Engineering Building", "Lecture Hall A", "Tech Labs"],
    },
    {
      id: 3,
      position: { lat: 51.0782, lng: -114.1295 },
      descriptions: ["Residence Hall", "Gym Facility", "Dining Area"],
    },
    {
      id: 4,
      position: { lat: 51.0788, lng: -114.1309 },
      descriptions: ["Student Union", "Events Center", "Food Court"],
    },
  ];

  // Fetch user's current location using Google's Geolocation API
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.location) {
          setUserLocation({ lat: data.location.lat, lng: data.location.lng });
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    const addUserToDb = async () => {
      await fetch(`${BASE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          username: user?.fullName,
        }),
      });
    };

    addUserToDb();
    fetchUserLocation();
  }, []);

  return (
    <div className="google-maps">
      <APIProvider apiKey={API_KEY}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map
            gestureHandling="greedy" // Allows full user control
            disableDefaultUI={false} // Ensure default UI elements are enabled
            mapId="e21db703daeafd54"
          >
            {/* Markers near University of Calgary */}
            {markers.map((marker) => (
              <AdvancedMarker
                key={marker.id}
                position={marker.position}
                onClick={() => setSelectedMarker(marker.id)}
              >
                <Pin
                  background="blue"
                  borderColor="white"
                  glyphColor="yellow"
                />
              </AdvancedMarker>
            ))}

            {/* InfoWindow for selected markers */}
            {selectedMarker !== null && (
              <InfoWindow
                position={
                  markers.find((marker) => marker.id === selectedMarker)!
                    .position
                }
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h4>Details:</h4>
                  <ul>
                    {markers
                      .find((marker) => marker.id === selectedMarker)!
                      .descriptions.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                  </ul>
                </div>
              </InfoWindow>
            )}

            {/* User's Current Location Marker */}
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <Pin background="red" borderColor="black" glyphColor="white" />
              </AdvancedMarker>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default Home;
