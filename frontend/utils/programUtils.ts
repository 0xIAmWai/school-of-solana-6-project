import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey, Connection } from "@solana/web3.js";
import idl from "../program/mint_me_a_moment.json";
import { MintMeAMoment } from "../program/mint_me_a_moment";

const idlObject = JSON.parse(JSON.stringify(idl));

export const creatorAddress = new PublicKey("3k5oyFTAGiL3PpJWVGCS45GiZHpiWf8W6CvsUd1o4FXs");

export function createProgram(provider: AnchorProvider) {
  return new Program<MintMeAMoment>(idlObject, provider);
}

export async function fetchTipHistory(connection: Connection) {
  const provider = new AnchorProvider(connection, {
    publicKey: PublicKey.default,
    signTransaction: async () => {
      throw new Error("No signing needed");
    },
    signAllTransactions: async () => {
      throw new Error("No signing needed");
    },
  }, { commitment: "confirmed" });

  const program = createProgram(provider);
  try {
    const accounts = await program.account.tipHistory.all();
    return accounts.map(account => account.account);
  } catch (error) {
    console.error("Error fetching tip history:", error);
    return [];
  }
}
