export type TProperty = {
  name: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  description: string;
  price: number;
  popular: boolean;
  recommended: boolean;
  Status: string;
  type: string;
  photo: string;
  agent: string;
  _id: string;
  facility: {
    wifi: boolean;
    rooms: number;
    baths: number;
    space: number;
    smookingArea: boolean;
    parkingArea: boolean;
    kitchen: boolean;
    balcon: boolean;
  };
};

export type TCreateProperty = {
  file: File;
  data: Partial<TProperty>;
};
