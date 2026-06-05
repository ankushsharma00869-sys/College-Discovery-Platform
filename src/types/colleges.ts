export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Placements {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  type: "Government" | "Private";
  rating: number;
  fees: number;
  established: number;
  ranking: number;
  image: string;
  courses: string[];
  overview: string;
  placements: Placements;
  reviews: Review[];
  tags: string[];
}