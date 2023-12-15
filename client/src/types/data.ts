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
};

export type TCreateProperty = Partial<TProperty>;
