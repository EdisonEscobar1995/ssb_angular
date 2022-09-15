import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private readonly serviceMenu: MenuService) {
    debugger;
    this.serviceMenu.getMenuActive().next('home');
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.serviceMenu.getMenuActive().unsubscribe();
  }
}
