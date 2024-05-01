// src/app/products/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatGridListModule]
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantityInStock', 'isControlled'];
  dataSource: Product[] = [];

  constructor(private productService: ProductService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.dataSource = products;
      this.dataSource.forEach(product => {
        this.productService.getRandomImage().subscribe((blob: Blob | MediaSource) => {
          const objectURL = URL.createObjectURL(blob);
          product.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      });
    });
  }
}