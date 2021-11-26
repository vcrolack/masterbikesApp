import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Bike } from '../models/bike.model';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  bikes$: Observable<Bike[]>;

  constructor(
    private cartService: CartService
  ) {
    this.bikes$ = this.cartService.cart$
  }

  ngOnInit() {
  }

}
