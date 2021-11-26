import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  total$: Observable<number>;

  constructor(
    private cartService: CartService
  ) { 
    this.total$ = this.cartService.cart$.pipe(
      map(bikes => bikes.length)
    );
  }

  ngOnInit() {}

}
