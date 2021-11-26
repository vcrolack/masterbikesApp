import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Bike } from 'src/app/models/bike.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private bikes: Bike[] = [];
  private cart = new BehaviorSubject<Bike[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(bike: Bike) {
    this.bikes = [...this.bikes, bike]
    this.cart.next(this.bikes);
    console.log(this.bikes)
  }
}
