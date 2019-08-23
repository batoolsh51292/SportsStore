import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Filter } from "./configClasses.repository";
import { Supplier } from "./supplier.model";
const productsUrl = "/api/products";
const suppliersUrl = "/api/suppliers";
@Injectable()
export class Repository {
  private filterObject = new Filter();

  constructor(private http: Http) {
    //this.filter.category = "soccer";
    this.filter.related = true;
    this.getProducts();
  }

  getProduct(id: number) {
    this.sendRequest(RequestMethod.Get, productsUrl + "/" + id)
      .subscribe(response => this.product = response);
  }

  getProducts() {
    let url = productsUrl + "?related=" + this.filter.related;

    if (this.filter.category) {
      url += "&category=" + this.filter.category;
    }
    if (this.filter.search) {
      url += "&search=" + this.filter.search;
    }

    url += "&metadata=true";
    this.sendRequest(RequestMethod.Get, url)
      .subscribe(response => {
        this.products = response.data;
        this.categories = response.categories;
      });
  }

  private sendRequest(verb: RequestMethod, url: string, data?: any)
    : Observable<any> {

    return this.http.request(new Request({
      method: verb, url: url, body: data
    })).map(response => response.json());
  }

  product: Product;
  products: Product[];
  categories: string[] = [];
  get filter(): Filter {
    return this.filterObject;
  }

  getSuppliers() {
    this.sendRequest(RequestMethod.Get, suppliersUrl)
      .subscribe(response => this.suppliers = response);
  }
  createProduct(prod: Product) {
    let data = {
      name: prod.name, category: prod.category,
      description: prod.description, price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };
    this.sendRequest(RequestMethod.Post, productsUrl, data)
      .subscribe(response => {
        prod.productId = response;
        this.products.push(prod);
      });
  }
  createProductAndSupplier(prod: Product, supp: Supplier) {
    let data = {
      name: supp.name, city: supp.city, state: supp.state
    };
    this.sendRequest(RequestMethod.Post, suppliersUrl, data)
      .subscribe(response => {
        supp.supplierId = response;
        prod.supplier = supp;
        this.suppliers.push(supp);
        if (prod != null) {
          this.createProduct(prod);
        }
      });
  }

  suppliers: Supplier[] = [];

  deleteProduct(id: number) {
    this.sendRequest(RequestMethod.Delete, productsUrl + "/" + id)
      .subscribe(response => this.getProducts());
  }
  deleteSupplier(id: number) {
    this.sendRequest(RequestMethod.Delete, suppliersUrl + "/" + id)
      .subscribe(response => {

        this.getProducts();
        this.getSuppliers();
      });
  }

  storeSessionData(dataType: string, data: any) {
    return this.sendRequest(RequestMethod.Post, "/api/session/" + dataType, data)
      .subscribe(response => { });
  }
  getSessionData(dataType: string): Observable<any> {
    return this.sendRequest(RequestMethod.Get, "/api/session/" + dataType);
  }
}