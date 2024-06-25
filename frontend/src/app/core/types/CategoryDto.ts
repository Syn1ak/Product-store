export interface CategoryDto {
  id?: number;
  name: string;
  description: string;
}

export interface CategoryModalDto {
  title: string;
  category?: CategoryDto;
}
