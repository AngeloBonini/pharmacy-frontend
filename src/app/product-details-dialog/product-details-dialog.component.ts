import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss']
})
export class ProductDetailsDialogComponent implements OnInit {
  saldo: number | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getSaldo(this.product.id).subscribe((saldo: number | undefined) => {
      this.saldo = saldo;
    });
  }
}
