import { UserInfo, UserRol } from "../entities/userConnect";


export class UserInfoMapper {
  public static mapperInfo(data: any): UserInfo | null {
    let option: UserInfo | null = null;
    if (data) {
      option = {
        sub: data.sub || '',
        userName: data.preferred_username || '',
        email: data.email || '',
        emailVerified: data.email_verified || '',
      };
    }
    return option;
  }

  public static mapperUserRol(data: any): UserRol | null {
    let option: UserRol | null = null;
    if (data) {
      option = {
        key: data.key || '',
        name: data.name || '',
        role: data.role || '',
      };
    }
    return option;
  }

  public static mapperUserInfo(data: any): UserInfo {
    return data.map((item: any) => {
      return this.mapperInfo(item);
    });
  }

  public static mapperUserRoles(data: any): UserRol[] {
    return data.map((item: any) => {
      return this.mapperUserRol(item);
    });
  }

}
