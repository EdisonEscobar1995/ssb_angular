export interface UserRol {
  name: string;
  key: string;
  role: string;
};

export interface UserInfo {
  sub: string;
  userName: string;
  email: string;
  emailVerified: boolean;
  roles?: UserRol[] | [];
};
