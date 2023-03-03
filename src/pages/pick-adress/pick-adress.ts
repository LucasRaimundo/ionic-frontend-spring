import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdressDTO } from '../../models/adress.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : AdressDTO[];

  order : OrderDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : StorageService, public clientService : ClientService, public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['adresses'];

        let cart = this.cartService.getCart();

        this.order = {
          client: {id: response['id']},
          finalAdress: null,
          payment: null,
          items: cart.items.map(x =>{return {quantity: x.quantity , product: {id: x.product.id}}})
        }
        
      }, 
      error=>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: AdressDTO){
    this.order.finalAdress = {id: item.id};
    this.navCtrl.push('PaymentPage', {order: this.order})
  }

}
