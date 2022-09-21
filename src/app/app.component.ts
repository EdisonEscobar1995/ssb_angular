import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/security/auth.service'
import { MenuService } from './services/menu.service';
import { UserConnectService } from './services/security/user-connect.service';
import { Store } from '@ngrx/store';
import { invokeUserAPI } from './store/security/user.action';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ssb_angular';
  token = '';
  isLogin = this.authService.isLoggedIn();
  activeMenu = '';

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly userConnectService: UserConnectService,
    private readonly store: Store
  ) {
    // let isLog = this.authService.isLoggedInObs();
    // isLog.subscribe((loggedin) => {
    //   this.isLogin = loggedin;
    // });
    if (localStorage.getItem('loginEnd') && localStorage.getItem('loginEnd') === 'si') {
      localStorage.removeItem('loginEnd');
      this.authService.startLogout();
    }
    this.authService
      .isLoggedInSubject()
      .subscribe(async (loggedin) => {
        // debugger;
        this.isLogin = loggedin;
        if (loggedin) {
          // const dataUser = await this.userConnectService.getUserInfo();
          this.store.dispatch(invokeUserAPI());
          // console.log('dataUser == ', dataUser);
        }
      });
    this.menuService
      .getMenuActive()
      // .pipe(take(1))
      .subscribe((menuActive: string) => {
        debugger;
        this.activeMenu = menuActive;
        const menus = document.querySelectorAll('#sidebarMenu a.nav-link');
        menus.forEach((el) => {
          el.classList.remove('active');
        })
        const aMenu = document.querySelector(`a.${menuActive}`);
        aMenu?.classList.add('active');
      });
  }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    // debugger;
    localStorage.setItem('loginEnd', 'si');
    this.authService.startLogout();
  }

  loginStart() {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.startAuthentication();
    return false;
  }

  ngOnDestroy() {
    this.authService.isLoggedInSubject().unsubscribe();
  }

}
