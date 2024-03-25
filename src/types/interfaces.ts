export interface Heading {
  title: string;
  fontSize: string;
  alignment: string;
}

export interface Jet {
  id: string;
  name: string;
  wingspan: number;
  engines: string;
  year: string;
}

export interface Jets {
  jets: Jet[];
}

export interface JetNameAndYear {
  name: string;
  year: string;
}

export interface GeminiAnswer {
  name: string;
  jetAttribute: {
    topSpeed?: number;
    fuelEfficiency?: number;
    maximumSeats?: number;
  };
  units: string;
}
