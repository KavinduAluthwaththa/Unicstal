export interface Crystal {
  id: string;
  name: string;
  type?: string;
  price?: number;
  image: string;
  description?: string;
  slug: string;
  full_description?: string;
  properties?: string[];
  chakras?: string[];
  origin?: string;
  hardness?: string;
  size?: string;
  weight?: string;
}
