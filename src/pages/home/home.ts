import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { IonicPage, NavController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {

creds : CredentialsDTO = {
  username : "",
  password : ""
};

constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

}

ionViewWillEnter() {
  this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
  this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriesPage');
      },
      error => {});  
  }

login(){
  this.auth.authenticate(this.creds)
  .subscribe(response => {
    this.auth.successfulLogin(response.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriesPage');
  },
  error => {});   
}

signup(){
  this.navCtrl.push("SignupPage");
}
}
