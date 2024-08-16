import { User } from '@prisma/client';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRegisterResponse {
  hash: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface ILoginResponse {
  token: ITokenResponse;
  user: PartialBy<User, 'password'>;
}
