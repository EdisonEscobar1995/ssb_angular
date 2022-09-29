import { createReducer, on } from "@ngrx/store";
import { UserInfo } from "src/app/entities/userConnect";
import { userFetchAPISuccess } from "./user.action";

export const initialState: UserInfo = {
  userName: '',
  email: '',
  emailVerified: false,
  sub: ''
};

export const userReducer = createReducer(
  initialState,
  on(userFetchAPISuccess, (_state, { userInfo }) => {
    return userInfo;
  })
);
