import { OptionsProp, Word } from "react-wordcloud";
import { DivIcon, Map } from "leaflet";

export interface HomeViewProps {
  fullname: string;
  profession: string;
}

export interface DescriptionCardProps {
  title: string;
  description: string;
  link: string;
}

export interface WordCloudCardProps {
  options: OptionsProp;
  words: Array<Word>;
}

export interface StageInfo {
  words: Array<Word>;
  content: string;
  source: string;
  link: string;
}

export interface CodeViewResponse {
  [stage: string]: StageInfo;
}

export interface PhotoInfo {
  key: string;
  title: string;
  link: string;
  url: string;
}

export interface MapLayerInfo {
  id: string;
  on: string;
  name: string;
  url: string;
  attribution: string;
}

export interface MapMarkerInfo {
  id: string;
  icon: string;
  color: string;
  position: L.LatLngExpression;
  text: string;
}

export interface MapInfo {
  zoom: number;
  center: Array;
  baselayers: Array<MapLayerInfo>;
  markers: Array<MapMarkerInfo>;
}

export interface GeoIpProps {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
  ip: string;
  isp: string;
}

export interface GeoIpMarkerProps {
  icon: DivIcon;
  geoIP: GeoIpProps;
  map: Map | null;
}
