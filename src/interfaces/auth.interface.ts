import { User } from '@prisma/client';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRegisterResponse {
  hash: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IForgotPasswordResponse extends IRegisterResponse {}

export interface ITokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface ILoginResponse {
  token: ITokenResponse;
  user: PartialBy<User, 'password'>;
}
