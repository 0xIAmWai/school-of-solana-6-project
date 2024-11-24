import { Clock, Coins, User } from 'lucide-react';
import { PublicKey, Connection } from '@solana/web3.js';
import { Program, BN, AnchorProvider } from '@coral-xyz/anchor';
import idl from './../program/mint_me_a_moment.json';
import { MintMeAMoment } from './../program/mint_me_a_moment';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

type TipHistory = MintMeAMoment["accounts"]["tipHistory"];

const idlString = JSON.stringify(idl);
const idlObject = JSON.parse(idlString);

export async function fetchTipHistory(
  connection: Connection
): Promise<TipHistory[]> {
  // Create a provider to read from the network
  const provider = new AnchorProvider(
    connection,
    // We use a dummy wallet since we're only reading data
    {
      publicKey: PublicKey.default,
      signTransaction: async () => { throw new Error('No signing needed') },
      signAllTransactions: async () => { throw new Error('No signing needed') },
    },
    { commitment: 'confirmed' }
  );

  const program = new Program<MintMeAMoment>(idlObject, provider);

  // Fetch all tip history accounts
  // Note: This is a simple implementation. For production, you might want to add pagination
  try {
    const accounts = await program.account.tipHistory.all();
    return accounts.map(account => account.account);
  } catch (error) {
    console.error('Error fetching tip history:', error);
    return [];
  }
}

export function TipHistory() {
  const { connection } = useConnection();
  const [tips, setTips] = useState<TipHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTipHistory() {
      try {
        setLoading(true);
        const tipHistory = await fetchTipHistory(connection);
        // Sort by timestamp, newest first
        tipHistory.sort((a, b) => b.timestamp.toNumber() - a.timestamp.toNumber());
        setTips(tipHistory);
        setError(null);
      } catch (err) {
        console.error('Error loading tip history:', err);
        setError('Failed to load tip history. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTipHistory();
  }, [connection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <div
          key={`${tip.tipper.toString()}-${tip.timestamp.toString()}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                {shortenAddress(tip.tipper.toString())}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Coins size={18} className="text-yellow-500" />
              <span className="font-semibold text-gray-700">
                {(tip.amount.toNumber() / LAMPORTS_PER_SOL).toFixed(2)} SOL
              </span>
            </div>
          </div>
          <p className="text-gray-700 mb-2">{tip.message}</p>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock size={14} />
            <time dateTime={new Date(tip.timestamp.toNumber()).toISOString()}>
              {new Date(tip.timestamp.toNumber()).toLocaleString()}
            </time>
          </div>
        </div>
      ))}
      {tips.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tips yet. Be the first one to send a tip!
        </div>
      )}
    </div>
  );
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}