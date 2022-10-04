import { UserInfo, UserRol } from "../entities/userConnect";
import { ROL_EDITOR, ROL_VISUALIZER } from "./constants";

export const getRol = (userInfo: UserInfo | any) => {
  let filter = [];
  if (Object.keys(userInfo).length > 0) {
    filter = (userInfo.roles || []).filter((rol: UserRol) => rol.role === ROL_VISUALIZER || rol.role === ROL_EDITOR);
  }
  return filter.length > 0;
};
