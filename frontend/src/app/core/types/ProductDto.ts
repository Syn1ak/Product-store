export interface ProductDto {
  id?: number;
  name: string;
  producer: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

export interface ProductModalDto {
  title: string;
  product?: ProductDto;
}
