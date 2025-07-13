export interface WalletDto {
  id: string;
  name: string;
  balance: number;
  userId: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CreateWalletDto {
  name: string;
  balance?: number;
  userId: string;
}

export interface UpdateWalletDto {
  name: string;
  balance?: number;
}
