export interface IResponse {
  data?: unknown;
  success: boolean;
  code: number;
  message: string;
  errors?: string;
}
