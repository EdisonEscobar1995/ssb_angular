import { createAction, props } from "@ngrx/store";
import { UserInfo } from "src/app/entities/userConnect";

export const invokeUserAPI = createAction(
  "[User API] invoke user Fetch API"
);

export const userFetchAPISuccess = createAction(
  "[User API] user Fetch API Sucsess",
  props<{userInfo: UserInfo}>()
);
