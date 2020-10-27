export type Review = {
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
  meta: {
    upvotes: number;
    downvotes: number;
  };
  score: number;
  _id: string;
  title: string;
  description: string;
  drinkId: string;
  username: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export type NewReview = {
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
  title: string;
  description: string;
};

export type ReviewUpdate = {
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
  title: string;
  description: string;
};
