import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClientDTO } from '../../models/client.dto';
import { AdressDTO } from '../../models/adress.dto';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  andress: AdressDTO;
  codOrder: string;

  constructor(public orderService: OrderService, public cartService: CartService, public clientService: ClientService,public navCtrl: NavController, public navParams: NavParams) {

    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.order.client.id).subscribe(response => {
      this.client = response as ClientDTO;
      this.andress = this.findAdress(this.order.finalAdress.id, response['adresses']);
      console.log(this.findAdress(this.order.finalAdress.id, response['adresses']))
      
      
    },
    error => {
      this.navCtrl.setRoot('HomePage')
    })
  }

  private findAdress(id: string, list: AdressDTO[]) : AdressDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position]
  }

  total(){
    return this.cartService.total();
  }

  back(){
    this.navCtrl.setRoot('CartPage');

  }

  home(){
    this.navCtrl.setRoot('CategoriesPage')
  }

  checkout(){
    this.orderService.insert(this.order).subscribe(response =>{
      this.cartService.createOrClearCart();
      this.codOrder = this.extractId(response.headers.get('location'));
    }, error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
    });
  }

  private extractId(location: string): string{
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
