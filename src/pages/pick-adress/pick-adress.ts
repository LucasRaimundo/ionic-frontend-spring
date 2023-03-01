import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdressDTO } from '../../models/adress.dto';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : AdressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logadouro: "Rua Quinze de Novembro",
        number: "300",
        complement: "Apto 200",
        district: "Santa Mônica",
        cep: "48293822",
        city: {
          id: "1",
          name: "Uberlândia",
          state: {
            id: "1",
            name: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logadouro: "Rua Alexandre Toledo da Silva",
        number: "405",
        complement: null,
        district: "Centro",
        cep: "88933822",
        city: {
          id: "3",
          name: "São Paulo",
          state: {
            id: "2",
            name: "São Paulo"
          }
        }
      }
    ];
    
  }

}
