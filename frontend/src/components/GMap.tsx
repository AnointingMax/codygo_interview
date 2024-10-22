import {
	APIProvider,
	ControlPosition,
	MapControl,
	AdvancedMarker,
	Map,
	useMap,
	useMapsLibrary,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

type Props = {
	coordinates?: google.maps.LatLngLiteral | null;
	setValues: (value: google.maps.places.PlaceResult | null) => void;
};
const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY ?? "YOUR_API_KEY";

const GMap = ({ coordinates = null, setValues }: Props) => {
	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
	const [markerRef, marker] = useAdvancedMarkerRef();

	return (
		<APIProvider apiKey={API_KEY} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">
			<Map
				mapId={"bf51a910020fa25a"}
				style={{ width: "100%", aspectRatio: "16/9" }}
				defaultCenter={coordinates || { lat: 22.54992, lng: 0 }}
				defaultZoom={coordinates ? 15 : 3}
				gestureHandling={"greedy"}
				disableDefaultUI={true}
			>
				<AdvancedMarker ref={markerRef} position={coordinates} />
			</Map>
			{!coordinates && (
				<MapControl position={ControlPosition.LEFT_CENTER}>
					<div className="autocomplete-control" onClick={(event) => event.stopPropagation()}>
						<PlaceAutocomplete
							onPlaceSelect={(value) => {
								setSelectedPlace(value);
								setValues(value);
							}}
						/>
					</div>
				</MapControl>
			)}
			<MapHandler place={selectedPlace} marker={marker} />
		</APIProvider>
	);
};

interface MapHandlerProps {
	place: google.maps.places.PlaceResult | null;
	marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
	const map = useMap();

	useEffect(() => {
		if (!map || !place || !marker) return;

		if (place.geometry?.viewport) {
			map.fitBounds(place.geometry?.viewport);
		}
		marker.position = place.geometry?.location;
	}, [map, place, marker]);

	return null;
};

interface PlaceAutocompleteProps {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
	const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary("places");

	useEffect(() => {
		if (!places || !inputRef.current) return;

		const options = {
			fields: ["geometry", "name", "formatted_address"],
		};

		setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
	}, [places]);

	useEffect(() => {
		if (!placeAutocomplete) return;

		placeAutocomplete.addListener("place_changed", () => {
			console.log(placeAutocomplete.getPlace());

			onPlaceSelect(placeAutocomplete.getPlace());
		});
	}, [onPlaceSelect, placeAutocomplete]);

	return (
		<div className=" autocomplete-container">
			<input ref={inputRef} className="px-3 py-3 border-2 border-gray-700 min-w-[250px] rounded-md text-sm " />
		</div>
	);
};

export default GMap;
