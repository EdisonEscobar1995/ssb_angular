import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {

  constructor(private readonly serviceMenu: MenuService) {
    debugger;
    this.serviceMenu.getMenuActive().next('companies');
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.serviceMenu.getMenuActive().unsubscribe();
  }

}
