import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs";
import { UserInfo } from "src/app/entities/userConnect";
import { AuthService } from "src/app/services/security/auth.service";
import { UserConnectService } from "src/app/services/security/user-connect.service";
import { invokeUserAPI, userFetchAPISuccess } from "./user.action";

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions: Actions,
    private readonly userConnectService: UserConnectService
  ) {}

  getUserInfo = createEffect(() =>
    this.actions.pipe(
      ofType(invokeUserAPI),
      switchMap(() => {
        return this.userConnectService.getUserInfo().then((data: any) => {
          return userFetchAPISuccess({
            userInfo: data
          })
        });
      })
    )
  );
}
