export interface Sighting {
  'Date of Sighting': string;
  'Latitude of Sighting': number;
  'Longitude of Sighting': number;
  'Nearest Approximate City': string;
  'US State': string;
  'Notes about the sighting': string;
  'Time of Day': string;
  'Tag of Apparition': string;
  'Image Link': string;
}

export interface SightingStats {
  totalSightings: number;
  mostRecentDate: string;
  mostRecentDaysAgo: number;
  mostGhostlyCity: string;
  mostGhostlyCityState: string;
}

