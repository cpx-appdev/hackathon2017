import NavPoint from "./NavPoint";
export interface NavPointDto {
  navPointName: string;

  entries: EntryDto[];
}

export interface EntryDto {
  name: string;
  bssid: string;
  level: number;
}
