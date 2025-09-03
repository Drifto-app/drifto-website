"use client"

import * as React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MapPin, Search, AlertCircle, Maximize, Minimize } from "lucide-react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import {Loader} from "@/components/ui/loader";

// Move libraries array outside component to prevent reloading
const GOOGLE_MAPS_LIBRARIES: ("places")[] = ["places"];

interface LocationData {
    coordinates: {
        lat: number;
        lng: number;
    };
    address: string;
    city: string;
    state: string;
    fullAddress: string;
    placeId?: string;
}

interface GoogleMapComponentProps {
    center: { lat: number; lng: number };
    onMapClick: (location: LocationData) => void;
    markerPosition: { lat: number; lng: number } | null;
    onMapLoad?: (map: google.maps.Map) => void;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
                                                                   center,
                                                                   onMapClick,
                                                                   markerPosition,
                                                                   onMapLoad,
                                                                   isFullscreen = false,
                                                                   onToggleFullscreen
                                                               }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    useEffect(() => {
        if (!mapRef.current || !window.google) return;

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
            center,
            zoom: isFullscreen ? 15 : 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });

        mapInstanceRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();

        // Initialize marker
        const marker = new google.maps.Marker({
            position: center,
            map,
            draggable: true,
        });

        markerRef.current = marker;

        // Map click handler
        map.addListener('click', (event: google.maps.MapMouseEvent) => {
            const position = event.latLng;
            if (!position || !geocoderRef.current) return;

            const coordinates = {
                lat: position.lat(),
                lng: position.lng()
            };

            marker.setPosition(position);

            // Reverse geocode to get address
            geocoderRef.current.geocode(
                { location: position },
                (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0];
                        const addressComponents = result.address_components;

                        let address = '';
                        let city = '';
                        let state = '';

                        addressComponents?.forEach(component => {
                            const types = component.types;
                            if (types.includes('street_number') || types.includes('route')) {
                                address += component.long_name + ' ';
                            } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                                city = component.long_name;
                            } else if (types.includes('administrative_area_level_1')) {
                                state = component.long_name;
                            }
                        });

                        onMapClick({
                            coordinates,
                            address: address.trim() || result.formatted_address.split(',')[0],
                            city: city || 'Unknown City',
                            state: state || 'Unknown State',
                            fullAddress: result.formatted_address,
                            placeId: result.place_id
                        });
                    } else {
                        // Fallback if geocoding fails
                        onMapClick({
                            coordinates,
                            address: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
                            city: 'Unknown City',
                            state: 'Unknown State',
                            fullAddress: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
                        });
                    }
                }
            );
        });

        // Marker drag handler
        marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
            const position = event.latLng;
            if (!position || !geocoderRef.current) return;

            const coordinates = {
                lat: position.lat(),
                lng: position.lng()
            };

            geocoderRef.current.geocode(
                { location: position },
                (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0];
                        const addressComponents = result.address_components;

                        let address = '';
                        let city = '';
                        let state = '';

                        addressComponents?.forEach(component => {
                            const types = component.types;
                            if (types.includes('street_number') || types.includes('route')) {
                                address += component.long_name + ' ';
                            } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                                city = component.long_name;
                            } else if (types.includes('administrative_area_level_1')) {
                                state = component.long_name;
                            }
                        });

                        onMapClick({
                            coordinates,
                            address: address.trim() || result.formatted_address.split(',')[0],
                            city: city || 'Unknown City',
                            state: state || 'Unknown State',
                            fullAddress: result.formatted_address,
                            placeId: result.place_id
                        });
                    }
                }
            );
        });

        if (onMapLoad) {
            onMapLoad(map);
        }

        return () => {
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }
        };
    }, [center, onMapClick, onMapLoad, isFullscreen]);

    // Update marker position when prop changes
    useEffect(() => {
        if (markerRef.current && markerPosition) {
            markerRef.current.setPosition(markerPosition);
        }
    }, [markerPosition]);

    // Update map center when prop changes
    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(center);
        }
    }, [center]);

    // Resize map when fullscreen changes
    useEffect(() => {
        if (mapInstanceRef.current) {
            setTimeout(() => {
                google.maps.event.trigger(mapInstanceRef.current!, 'resize');
                mapInstanceRef.current?.setCenter(center);
            }, 300);
        }
    }, [isFullscreen, center]);

    return (
        <div className="relative">
            {/* Fullscreen Toggle Button - Show only on mobile */}
            {isMobile && onToggleFullscreen && (
                <Button
                    onClick={onToggleFullscreen}
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white border border-gray-300 shadow-sm"
                >
                    {isFullscreen ? (
                        <Minimize className="h-4 w-4" />
                    ) : (
                        <Maximize className="h-4 w-4" />
                    )}
                </Button>
            )}

            <div
                ref={mapRef}
                className={`w-full rounded-lg border-2 border-gray-300 transition-all duration-300 ${
                    isFullscreen
                        ? 'fixed inset-0 z-50 h-screen rounded-none border-0'
                        : 'h-64'
                }`}
                style={{
                    minHeight: isFullscreen ? '100vh' : '256px',
                    // Ensure the map is above everything when fullscreen
                    zIndex: isFullscreen ? 9999 : 'auto'
                }}
            />
        </div>
    );
};

interface LocationSearchDialogProps {
    currentLocation: {
        coordinates: {[key: string]: number};
        address: string;
        city: string;
        state: string;
    };
    onLocationUpdate: (location: LocationData) => void;
    googleMapsApiKey: string;
}

export const LocationSearchDialog: React.FC<LocationSearchDialogProps> = ({
                                                                              currentLocation, onLocationUpdate, googleMapsApiKey
                                                                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocationData>({
        coordinates: { lat: currentLocation.coordinates.latitude, lng: currentLocation.coordinates.longitude },
        address: currentLocation.address || "",
        city: currentLocation.city || "",
        state: currentLocation.state || "",
        fullAddress: ""
    });
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Load Google Maps script using useLoadScript hook with static libraries array
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
        libraries: GOOGLE_MAPS_LIBRARIES, // Use static array
        language: "en-US",
        region: "ng",
    });

    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

    // Autocomplete options - also make static to avoid recreating
    const autocompleteOptions = React.useMemo(() => ({
        fields: ['place_id', 'formatted_address', 'address_components', 'geometry'],
        types: ['establishment', 'geocode'],
        componentRestrictions: {
            country: 'ng'
        }
    }), []);

    // Handle fullscreen toggle
    const handleToggleFullscreen = useCallback(() => {
        setIsMapFullscreen(prev => !prev);

        // Prevent body scroll when map is fullscreen on mobile
        if (!isMapFullscreen && isMobile) {
            document.body.style.overflow = 'hidden';
            // Also handle iOS Safari viewport issues
            document.documentElement.style.height = '100%';
            document.body.style.height = '100%';
        } else if (isMobile) {
            document.body.style.overflow = '';
            document.documentElement.style.height = '';
            document.body.style.height = '';
        }
    }, [isMapFullscreen, isMobile]);

    // Clean up body scroll when component unmounts or dialog closes
    useEffect(() => {
        return () => {
            if (isMobile) {
                document.body.style.overflow = '';
                document.documentElement.style.height = '';
                document.body.style.height = '';
            }
        };
    }, [isMobile]);

    // Close fullscreen when dialog closes
    useEffect(() => {
        if (!isOpen && isMapFullscreen) {
            setIsMapFullscreen(false);
            if (isMobile) {
                document.body.style.overflow = '';
                document.documentElement.style.height = '';
                document.body.style.height = '';
            }
        }
    }, [isOpen, isMapFullscreen, isMobile]);

    // Handle place selection from autocomplete
    const onPlaceChanged = useCallback(() => {
        if (!autocomplete) return;

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            return;
        }

        const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        let address = '';
        let city = '';
        let state = '';

        if (place.address_components) {
            place.address_components.forEach(component => {
                const types = component.types;
                if (types.includes('street_number') || types.includes('route')) {
                    address += component.long_name + ' ';
                } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                    city = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                    state = component.long_name;
                }
            });
        }

        const locationData: LocationData = {
            coordinates,
            address: address.trim() || place.name || place.formatted_address?.split(',')[0] || '',
            city: city || 'Unknown City',
            state: state || 'Unknown State',
            fullAddress: place.formatted_address || '',
            placeId: place.place_id
        };

        // Batch state updates to reduce re-renders
        React.startTransition(() => {
            setMapCenter(coordinates);
            setMarkerPosition(coordinates);
            setSelectedLocation(locationData);
            setSearchQuery(place.formatted_address || '');
        });
    }, [autocomplete]);

    const handleMapClick = useCallback((locationData: LocationData) => {
        setSelectedLocation(locationData);
        setMarkerPosition(locationData.coordinates);
    }, []);

    const handleConfirm = useCallback(() => {
        onLocationUpdate(selectedLocation);

        // Reset fullscreen state first, then close dialog
        if (isMapFullscreen) {
            setIsMapFullscreen(false);
            if (isMobile) {
                document.body.style.overflow = '';
                document.documentElement.style.height = '';
                document.body.style.height = '';
            }
        }

        setIsOpen(false);
    }, [selectedLocation, onLocationUpdate, isMapFullscreen, isMobile]);

    // Handle loading error
    if (loadError) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="py-3 px-4 bg-neutral-200 rounded-md text-wrap flex flex-row justify-between items-center cursor-pointer hover:bg-neutral-300 transition-colors">
                        <span className="text-sm">
                            {currentLocation.address && currentLocation.city && currentLocation.state
                                ? `${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state}`
                                : "Select Location"
                            }
                        </span>
                        <CiEdit size={22} />
                    </div>
                </DialogTrigger>
                <DialogContent className="w-full max-w-2xl flex flex-col gap-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center text-red-600">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Failed to load Google Maps</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Handle loading state
    if (!isLoaded) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="py-3 px-4 bg-neutral-200 rounded-md text-wrap flex flex-row justify-between items-center cursor-pointer hover:bg-neutral-300 transition-colors">
                        <span className="text-sm">
                            {currentLocation.address && currentLocation.city && currentLocation.state
                                ? `${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state}`
                                : "Select Location"
                            }
                        </span>
                        <CiEdit size={22} />
                    </div>
                </DialogTrigger>
                <DialogContent className="w-full max-w-2xl flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader />
                        <p className="text-sm text-gray-600">Loading Google Maps...</p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Render fullscreen overlay when map is fullscreen
    if (isMapFullscreen) {
        return (
            <>
                {/* Original dialog trigger for when not fullscreen */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <div className="py-3 px-4 bg-neutral-200 rounded-md text-wrap flex flex-row justify-between items-center cursor-pointer hover:bg-neutral-300 transition-colors">
                            <span className="text-sm">
                                {currentLocation.address && currentLocation.city && currentLocation.state
                                    ? `${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state}`
                                    : "Select Location"
                                }
                            </span>
                            <CiEdit size={22} />
                        </div>
                    </DialogTrigger>
                </Dialog>

                {/* Fullscreen Map Overlay */}
                <div className="fixed inset-0 z-[9999] bg-white">
                    {/* Fullscreen Header */}
                    <div className="absolute top-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Select Location</h3>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleToggleFullscreen}
                                    variant="outline"
                                    size="sm"
                                >
                                    <Minimize className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Search in fullscreen */}
                        <div className="mt-3">
                            <Autocomplete
                                onLoad={setAutocomplete}
                                onPlaceChanged={onPlaceChanged}
                                options={autocompleteOptions}
                            >
                                <Input
                                    type="text"
                                    placeholder="Search location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full"
                                />
                            </Autocomplete>
                        </div>
                    </div>

                    {/* Fullscreen Map */}
                    <div className="pt-32 h-full">
                        <GoogleMapComponent
                            center={mapCenter}
                            onMapClick={handleMapClick}
                            markerPosition={markerPosition}
                            isFullscreen={true}
                            onMapLoad={(map) => {
                                placesServiceRef.current = new google.maps.places.PlacesService(map);
                            }}
                        />
                    </div>

                    {/* Fullscreen Footer with selected location and actions */}
                    {selectedLocation.fullAddress && (
                        <div className="absolute bottom-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
                            <div className="mb-3">
                                <p className="text-sm font-medium text-gray-800">{selectedLocation.fullAddress}</p>
                                <p className="text-xs text-gray-600">
                                    {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleToggleFullscreen}
                                    variant="outline"
                                    className="text-lg py-6 px-8 flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className="text-lg py-6 px-8 flex-1 bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="py-3 px-4 bg-neutral-200 rounded-md text-wrap flex flex-row justify-between items-center cursor-pointer hover:bg-neutral-300 transition-colors">
                    <span className="text-sm">
                        {currentLocation.address && currentLocation.city && currentLocation.state
                            ? `${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state}`
                            : "Select Location"
                        }
                    </span>
                    <CiEdit size={22} />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Select Location</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        Search for a location or click on the map to place a marker
                        {isMobile && " (Tap the expand icon to go fullscreen)"}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Search Input with Autocomplete */}
                    <div className="grid gap-2">
                        <Label htmlFor="location-search" className="text-sm font-medium text-gray-700">
                            Search Location
                        </Label>
                        <Autocomplete
                            onLoad={setAutocomplete}
                            onPlaceChanged={onPlaceChanged}
                            options={autocompleteOptions}
                        >
                            <Input
                                id="location-search"
                                type="text"
                                placeholder="Start typing your location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </Autocomplete>
                    </div>

                    {/* Map */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Map Location
                        </Label>
                        <GoogleMapComponent
                            center={mapCenter}
                            onMapClick={handleMapClick}
                            markerPosition={markerPosition}
                            isFullscreen={false}
                            onToggleFullscreen={handleToggleFullscreen}
                            onMapLoad={(map) => {
                                placesServiceRef.current = new google.maps.places.PlacesService(map);
                            }}
                        />
                    </div>

                    {/* Selected Location Info */}
                    {selectedLocation.fullAddress && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Label className="text-sm font-medium text-blue-800 mb-1 block">
                                Selected Location
                            </Label>
                            <p className="text-sm text-blue-700">{selectedLocation.fullAddress}</p>
                            <p className="text-xs text-blue-600 mt-1">
                                Coordinates: {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="w-full flex flex-row justify-between gap-3">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="text-lg bg-neutral-300 py-6 px-8 font-semibold hover:bg-neutral-400"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!selectedLocation.fullAddress}
                        className="text-lg py-6 px-8 bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};