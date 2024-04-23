// src/app/products/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantityInStock', 'isControlled'];
  dataSource: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource = products;
    });
  }
}
