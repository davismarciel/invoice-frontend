import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, CreateInvoiceRequest } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createInvoice(invoice: CreateInvoiceRequest): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.baseUrl}/invoice`, invoice);
  }

  listInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/invoice`);
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/invoice/${id}`);
  }

  getInvoiceByNumber(number: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/invoice/number/${number}`);
  }

  processInvoice(id: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.baseUrl}/invoice/${id}/process`, {});
  }
}
