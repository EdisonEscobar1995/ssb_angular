import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/security/auth.service'
import { MenuService } from './services/menu.service';
import { select, Store } from '@ngrx/store';
import { invokeUserAPI } from './store/security/user.action';
import { selectUser } from './store/security/user.selector';
import { UserInfo } from './entities/userConnect';
import { IEmptyObject } from './entities/common';
import { getRol } from './utils/common';

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
  userConect: UserInfo | IEmptyObject = {};
  accessMenu = false;

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
    private readonly store: Store
  ) {
    if (localStorage.getItem('loginEnd') && localStorage.getItem('loginEnd') === 'si') {
      localStorage.removeItem('loginEnd');
      this.authService.startLogout();
    }
    this.authService
      .isLoggedInSubject()
      .subscribe(async (loggedin) => {
        this.isLogin = loggedin;
        if (loggedin) {
          this.store.dispatch(invokeUserAPI());
        }
      });
    this.menuService
      .getMenuActive()
      .subscribe((menuActive: string) => {
        this.activeMenu = menuActive;
        const menus = document.querySelectorAll('#sidebarMenu a.nav-link');
        menus.forEach((el) => {
          el.classList.remove('active');
        })
        const aMenu = document.querySelector(`a.${menuActive}`);
        aMenu?.classList.add('active');
      });
    this.store.pipe(select(selectUser)).subscribe((user) => {
      console.log('user ===== ', user);
      this.userConect = user;
      this.accessMenu = getRol(user);
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
