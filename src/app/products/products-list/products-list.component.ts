import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from 'src/app/services/products.service';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from 'src/app/product-details-dialog/product-details-dialog.component';
@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatGridListModule, MatChipsModule, MatButtonModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  openDetails(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: product
    });
  }
}
