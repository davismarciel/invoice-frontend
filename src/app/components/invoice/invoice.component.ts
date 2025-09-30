import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';
import { Invoice, CreateInvoiceRequest, AddItemRequest, InvoiceStatus } from '../../models/invoice.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  products: Product[] = [];
  newInvoice: CreateInvoiceRequest = { items: [] };
  newItem: AddItemRequest = {
    productId: 0,
    quantity: 1,
    unitPrice: 0
  };
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  InvoiceStatus = InvoiceStatus;

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadInvoices();
    this.loadProducts();
  }

  loadInvoices() {
    this.invoiceService.listInvoices().subscribe({
      next: (invoices) => {
        this.invoices = Array.isArray(invoices) ? invoices : [];
      },
      error: (error) => {
        console.error('Erro ao carregar notas fiscais:', error);
        this.showMessage('Erro ao carregar notas fiscais: ' + error.message, 'error');
      }
    });
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

  addItem() {
    if (this.newItem.productId && this.newItem.quantity > 0 && this.newItem.unitPrice > 0) {
      this.newInvoice.items.push({ ...this.newItem });
      this.clearNewItem();
    }
  }

  removeItem(index: number) {
    this.newInvoice.items.splice(index, 1);
  }

  createInvoice() {
    if (this.newInvoice.items.length > 0) {
      this.invoiceService.createInvoice(this.newInvoice).subscribe({
        next: (invoice) => {
          if (Array.isArray(this.invoices)) {
            this.invoices.push(invoice);
          } else {
            this.invoices = [invoice];
          }
          this.clearForm();
          this.showMessage('Nota fiscal criada com sucesso!', 'success');
        },
        error: (error) => {
          console.error('Erro ao criar nota fiscal:', error);
          this.showMessage('Erro ao criar nota fiscal: ' + error.message, 'error');
        }
      });
    }
  }

  processInvoice(invoice: Invoice) {
    this.invoiceService.processInvoice(invoice.id).subscribe({
      next: (updatedInvoice) => {
        const index = this.invoices.findIndex(n => n.id === updatedInvoice.id);
        if (index !== -1) {
          this.invoices[index] = updatedInvoice;
        }
        this.showMessage('Nota fiscal processada com sucesso!', 'success');
        this.loadProducts();
      },
      error: (error) => {
        this.showMessage('Erro ao processar nota fiscal: ' + error.message, 'error');
        this.loadInvoices();
      }
    });
  }

  onProductSelected() {
    const product = this.products.find(p => p.id === this.newItem.productId);
    if (product) {
      this.newItem.unitPrice = product.price;
    }
  }

  calculateItemTotal(item: AddItemRequest): number {
    return item.quantity * item.unitPrice;
  }

  calculateInvoiceTotal(): number {
    return this.newInvoice.items.reduce((total, item) => total + this.calculateItemTotal(item), 0);
  }

  clearNewItem() {
    this.newItem = {
      productId: 0,
      quantity: 1,
      unitPrice: 0
    };
  }

  clearForm() {
    this.newInvoice = { items: [] };
    this.clearNewItem();
  }

  getStatusText(status: number): string {
    switch (status) {
      case InvoiceStatus.Open:
        return 'Aberta';
      case InvoiceStatus.Processing:
        return 'Processando';
      case InvoiceStatus.Closed:
        return 'Fechada';
      case InvoiceStatus.Failed:
        return 'Falha';
      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case InvoiceStatus.Open:
        return 'status-aberta';
      case InvoiceStatus.Processing:
        return 'status-processando';
      case InvoiceStatus.Closed:
        return 'status-fechada';
      case InvoiceStatus.Failed:
        return 'status-falha';
      default:
        return 'status-desconhecido';
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : `Produto ${productId}`;
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
