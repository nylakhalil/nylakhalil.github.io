import { OptionsProp, Word } from "react-wordcloud";

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

export interface GeoIpProps {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
  ip: string;
  isp: string;
}