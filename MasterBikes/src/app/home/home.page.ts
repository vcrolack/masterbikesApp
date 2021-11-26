import { Component } from '@angular/core';
import { AuthenticateService } from '../services/authenticate/authenticate.service';
import { BikeService } from '../services/bikes/bike.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  bikes;
  bike;

  constructor(
    private authService: AuthenticateService,
    private bikeService: BikeService
  ) {
    this.getBikes();
  }

  logOut(): void {
    this.authService.logOut();
  }

  async getBikes() {
    this.bikes = await this.bikeService.getBikes();
    console.log(this.bikes)
  }


}
