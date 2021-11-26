import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class BikeService {
  bikesTemp;
  bikeTemp;
  bikes = {
    
      nameBike: "",
      price: 0,
      description: '',
      imgUrl: ''
  }; 

  errorMessage = '';
  bike = [{
    nameBike: "",
    price: 0,
    description: '',
    imgUrl: ''
}];

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  getBikes(){
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/bikes/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          this.bikesTemp = data;
          //console.log(this.bikesTemp)
          //this.bikes[0].nameBike = this.bikesTemp.nameBike
          //console.log(this.bikesTemp.bikes)
          if (this.bikes) {
            //console.log(this.bikes)
            accept(this.bikesTemp.bikes)
          } else {
            reject(this.errorMessage = "Bikes not found.")
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }) 
  }

  getBike(id) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/bikes/${id}`;
      this.http.get(apiURL).subscribe(
      (data) => {
        this.bike = data['bike']
        if (this.bike) {
          accept(this.bike)
        }
      }
      )
    })
  }
}
