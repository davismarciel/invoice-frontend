import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductComponent, InvoiceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Sistema de Nota Fiscal';
  activeTab: 'products' | 'invoices' = 'products';

  setActiveTab(tab: 'products' | 'invoices') {
    this.activeTab = tab;
  }
}
