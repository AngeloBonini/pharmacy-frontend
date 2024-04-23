// src/app/products/product.model.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityInStock: number;
    isControlled: boolean;
  }
  