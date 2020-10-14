export type Drink = {
  qualities: {
    flavorAccuracy: number;
    flavorIntensity: number;
    bubbles: number;
    body: number;
    smell: number;
    sweetness: number;
    sour: number;
    bitter: number;
  };
  score: number;
  numRatings: number;
  abv: number;
  calories: number;
  flavors: string[];
  image: string;
  _id: string;
  name: string;
  createdBy: string;
  editedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};
