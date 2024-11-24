import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { useConnection, useWallet, AnchorWallet } from "@solana/wallet-adapter-react";

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = new AnchorProvider(
    connection,
    wallet as AnchorWallet,
    AnchorProvider.defaultOptions()
  );
  setProvider(provider);
  return provider;
}
