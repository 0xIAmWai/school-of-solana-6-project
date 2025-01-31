import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

export const network = WalletAdapterNetwork.Devnet;
export const endpoint = clusterApiUrl(network);

export function handleWalletError(error: any) {
  console.error(error);
}
