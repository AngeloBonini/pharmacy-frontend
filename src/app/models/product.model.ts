import { SafeUrl } from "@angular/platform-browser";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityInStock?: number;
    isControlled?: boolean;
    imageUrl?: string;
  }
  