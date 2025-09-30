import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductRequest } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: ProductRequest = {
    name: '',
    description: '',
    stock: 0,
    price: 0
  };
  editingProduct: Product | null = null;
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.showMessage('Erro ao carregar produtos: ' + error.message, 'error');
      }
    });
  }

  createProduct() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: (product) => {
        if (Array.isArray(this.products)) {
          this.products.push(product);
        } else {
          this.products = [product];
        }
        this.clearForm();
        this.showMessage('Produto criado com sucesso!', 'success');
      },
      error: (error) => {
        console.error('Erro ao criar produto:', error);
        this.showMessage('Erro ao criar produto: ' + error.message, 'error');
      }
    });
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  saveEdit() {
    if (this.editingProduct) {
      const productRequest: ProductRequest = {
        name: this.editingProduct.name,
        description: this.editingProduct.description,
        stock: this.editingProduct.stock,
        price: this.editingProduct.price
      };

      this.productService.updateProduct(this.editingProduct.id, productRequest).subscribe({
        next: (product) => {
          const index = this.products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products[index] = product;
          }
          this.editingProduct = null;
          this.showMessage('Produto atualizado com sucesso!', 'success');
        },
        error: (error) => {
          this.showMessage('Erro ao atualizar produto: ' + error.message, 'error');
        }
      });
    }
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.showMessage('Produto deletado com sucesso!', 'success');
        },
        error: (error) => {
          this.showMessage('Erro ao deletar produto: ' + error.message, 'error');
        }
      });
    }
  }

  clearForm() {
    this.newProduct = {
      name: '',
      description: '',
      stock: 0,
      price: 0
    };
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
