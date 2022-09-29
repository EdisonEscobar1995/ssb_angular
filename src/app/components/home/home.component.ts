import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IEmptyObject } from 'src/app/entities/common';
import { UserInfo } from 'src/app/entities/userConnect';
import { MenuService } from 'src/app/services/menu.service';
import { selectUser } from 'src/app/store/security/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userConect: UserInfo | IEmptyObject = {};
  title = 'Bienvenido(a) al SSB';
  constructor(private readonly serviceMenu: MenuService, private readonly store:Store) {
    this.serviceMenu.getMenuActive().next('home');
    this.store.pipe(select(selectUser)).subscribe((user) => {
      console.log('user ===== ', user);
      this.userConect = user;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // this.serviceMenu.getMenuActive().unsubscribe();
  }
}
