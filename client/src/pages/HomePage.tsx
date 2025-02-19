import { JSX, useEffect, useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { LatitudeLongitude } from "@/types/mapTypes";
import { useToast } from "@/hooks/use-toast";
import { Container } from "@/components/container";
import { GOOGLE_MAPS_API_BASE_URL } from "@/App";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { IoIosAddCircle } from "react-icons/io";
import { AddSightingModal } from "@/components/addSightingModal";

export function HomePage(): JSX.Element {
  const { toast } = useToast();

  const [userLocation, setUserLocation] = useState<
    LatitudeLongitude | undefined
  >(undefined);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  async function fetchUserLocation(): Promise<void> {
    const googleMapsResponse = await fetch(GOOGLE_MAPS_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!googleMapsResponse.ok) {
      toast({
        title: "Error fetching user location",
        description: "Please try again later.",
      });
      return;
    }

    const locationJSON = await googleMapsResponse.json();
    if (locationJSON.location) {
      setUserLocation({
        lat: locationJSON.location.lat,
        lng: locationJSON.location.lng,
      });
    }
  }

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <Header
            header="Map Overview"
            subtext="Locate and explore wildlife around the map."
          />
          <Button
            className="font-normal"
            onClick={() => setIsAddModalOpen(true)}
          >
            <IoIosAddCircle />
            Add Sighting
          </Button>
        </div>
        <Map
          gestureHandling="greedy" // Allows full user control
          disableDefaultUI={false} // Ensure default UI elements are enabled
          mapId="e21db703daeafd54"
          defaultCenter={userLocation}
          className="h-[calc(68vh)] w-full mt-4"
          defaultZoom={10}
        >
          {/* User's Current Location Marker */}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <Pin background="red" borderColor="black" glyphColor="white" />
            </AdvancedMarker>
          )}
        </Map>
      </Container>
      <AddSightingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
