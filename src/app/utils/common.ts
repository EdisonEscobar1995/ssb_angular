import { UserInfo, UserRol } from "../entities/userConnect";
import { ROL_EDITOR, ROL_VISUALIZER } from "./constants";

export const getRol = (userInfo: UserInfo | any, role: any) => {
  let filter = [];
  if (Object.keys(userInfo).length > 0) {
    filter = (userInfo.roles || []).filter((rol: UserRol) => rol.role === role);
  }
  return filter.length > 0;
};

export const getAnyRol = (userInfo: UserInfo | any) => {
  let filter = [];
  if (Object.keys(userInfo).length > 0) {
    filter = (userInfo.roles || []).filter((rol: UserRol) => rol.role === ROL_VISUALIZER || rol.role === ROL_EDITOR);
  }
  return filter.length > 0;
};

export const isValidToken = (expireOn:number):boolean => {
  const validToken = Date.now() >= (expireOn * 1000) ? false : true;
  return validToken;
}
