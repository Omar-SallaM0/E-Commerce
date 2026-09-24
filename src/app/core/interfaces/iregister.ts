export interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
