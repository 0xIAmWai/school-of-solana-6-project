import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  setProvider(provider);
  return provider;
}
