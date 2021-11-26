import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BikeService } from 'src/app/services/bikes/bike.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.scss'],
})
export class BikeDetailComponent implements OnInit {

  bike;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getBike(id)
    })
  }

  ngOnInit() {
  }

getBike(id) {
    this.bikeService.getBike(id)
    .then(bike => {
      console.log(bike)
      this.bike = bike;
    })
    .catch(error => {
      console.log(error);
    })
  }

  addCart() {
    console.log('agregar al carrito')
    this.cartService.addCart(this.bike);
  }

}
