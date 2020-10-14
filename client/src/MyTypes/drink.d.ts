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
  abv: number;
  calories: number;
  createdAt: string;
  createdBy: string;
  editedBy: string;
  flavors: string[];
  id: string;
  image: string;
  name: string;
  numRatings: number;
  score: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type NewDrink = {
  abv: number;
  calories: number;
  flavors: string[];
  name: string;
};
