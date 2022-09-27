import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/security/auth.service'
import { MenuService } from './services/menu.service';
import { Store } from '@ngrx/store';
import { invokeUserAPI } from './store/security/user.action';

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
