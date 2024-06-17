export interface ProductDto {
  name: string;
  manufacturer: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

export interface ProductModalDto {
  title: string;
  product?: ProductDto;
}
