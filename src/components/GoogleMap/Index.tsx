import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import(`./MapComponent`), { ssr: false });

export default Map;
