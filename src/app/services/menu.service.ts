import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private callbackMenu = new Subject<string>();

  getMenuActive() {
    return this.callbackMenu;
  }
}
