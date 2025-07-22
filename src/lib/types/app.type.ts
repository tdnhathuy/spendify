export interface Response<T> {
  data: T;
  message: string;
  status: number;
}

export type Wallet = {
  id: string;
  name: string;
  balance: number;
};
