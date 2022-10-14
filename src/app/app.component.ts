import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/security/auth.service'
import { MenuService } from './services/menu.service';
import { select, Store } from '@ngrx/store';
import { invokeUserAPI } from './store/security/user.action';
import { selectUser } from './store/security/user.selector';
import { UserInfo } from './entities/userConnect';
import { IEmptyObject } from './entities/common';
import { getRol } from './utils/common';
import { TokenCognitoService } from './services/security/token-cognito.service';
import { ROL_EDITOR, ROL_VISUALIZER } from './utils/constants';

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
  accessMenuVisualizer = false;
  accessMenuEditor = false;

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
    private readonly tokenCognitoService: TokenCognitoService,
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
          this.getFirstTokenCognito();
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
      this.accessMenuVisualizer = getRol(user, ROL_VISUALIZER);
      this.accessMenuEditor = getRol(user, ROL_EDITOR);
    });
  }

  ngOnInit() {

  }

  async getFirstTokenCognito() {
    localStorage.removeItem('token_cognito');
    try {
      const tokenCognito = await this.tokenCognitoService.getTokenCognito();
      localStorage.setItem('token_cognito', tokenCognito?.access_token || '');
    } catch (error) {
      console.error('Error en getFirstTokenCognito = ', error);
      localStorage.removeItem('token_cognito');
    }
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
