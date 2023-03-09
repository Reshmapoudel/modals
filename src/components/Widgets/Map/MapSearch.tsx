// import { LatLong } from "@/../src/components/types/locationType";
// import { FC, useEffect, useRef, useState } from "react";
// interface Props {
//   updateLngLat: (val: LatLong) => void;
//   inputFormHook?: any;
//   placeName?: string;
// }
// const AutoComplete: FC<Props> = ({
//   updateLngLat,
//   inputFormHook,
//   placeName,
// }) => {
//   const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const options = {
//     fields: ["address_components", "geometry", "icon", "name"],
//     types: ["establishment"],
//   };

//   useEffect(() => {
//     autoCompleteRef.current = new globalThis.google.maps.places.Autocomplete(
//       inputRef.current as HTMLInputElement,
//       options
//     );
//     autoCompleteRef?.current?.addListener("place_changed", async function () {
//       const place = await autoCompleteRef?.current?.getPlace();

//       const lat = place?.geometry?.location.lat();
//       const lng = place?.geometry?.location.lng();
//       const name = place?.name;
//       updateLngLat({ lat: lat!, lng: lng!, name: name! });
//     });
//   }, [autoCompleteRef]);
//   return (
//     <div className="w-full">
//       <input
//         ref={inputRef}
//         className=" outline-none border p-2 rounded-md w-full"
//         {...inputFormHook}
//       />
//     </div>
//   );
// };
// export default AutoComplete;
import { LatLong } from "@/../src/components/types/locationType";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  updateLngLat: (val: LatLong) => void;
  inputFormHook?: any;
  placeName?: string;
}

const AutoComplete: FC<Props> = ({
  updateLngLat,
  inputFormHook,
  placeName,
}) => {
  const [apiLoaded, setApiLoaded] = useState(false);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);
  const options = {
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (!script) {
      script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      document.head.appendChild(script);
      script.onload = () => setApiLoaded(true);
    } else {
      setApiLoaded(true);
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!apiLoaded) return;

    try {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current as HTMLInputElement,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef?.current?.getPlace();

        const lat = place?.geometry?.location.lat();
        const lng = place?.geometry?.location.lng();
        const name = place?.name;
        updateLngLat({ lat: lat!, lng: lng!, name: name! });
      });
    } catch (error) {
      console.error("Error initializing Autocomplete:", error);
    }
  }, [apiLoaded, options]);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        className="outline-none border p-2 rounded-md w-full"
        {...inputFormHook}
      />
    </div>
  );
};

export default AutoComplete;
