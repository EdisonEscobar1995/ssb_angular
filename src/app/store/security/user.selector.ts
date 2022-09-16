import { createFeatureSelector } from "@ngrx/store";
import { UserInfo } from "src/app/entities/userConnect";

export const selectUser = createFeatureSelector<UserInfo | {}>("userConnect");
