import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.handleBranch();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  handleBranch = () => {
    // only on devices
    if (!this.platform.is('cordova')) { return }
    // tslint:disable-next-line: no-string-literal
    const Branch = window['Branch'];
    Branch.setDebug(true)
    Branch.initSession().then(data => {
      if (data['+clicked_branch_link']) {
        // read deep link data on click
        alert('Deep Link Data: ' + JSON.stringify(data));
      }
    });
  }
}
