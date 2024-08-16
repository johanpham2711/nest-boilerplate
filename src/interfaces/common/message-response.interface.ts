export interface IMessageResponse<T = unknown> {
  message: string;
  data?: T;
}
