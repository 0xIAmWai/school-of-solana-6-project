import { useState } from 'react';
import { SendIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { useAnchorProvider } from "@/utils/anchorProvider";
import { createProgram, creatorAddress, fetchTipHistory } from "@/utils/programUtils";

export function TipForm({ onTipSuccess }: { onTipSuccess: () => void }) {
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      toast.error('Please connect your wallet first!');
      return;
    }

    setIsSubmitting(true);

    try {         
      const program = createProgram(provider);
      
      const timestamp = Math.floor(Date.now() / 1000);
      const amountLamports = Math.floor(parseFloat(amount) * anchor.web3.LAMPORTS_PER_SOL);

      const [tipHistoryPda] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from("tip_history"),
          publicKey.toBuffer(),
          new anchor.BN(timestamp).toArrayLike(Buffer, "be", 8),
        ],
        program.programId
      );

      const tx = await program.methods
        .tip(
          new anchor.BN(amountLamports),
          message,
          new anchor.BN(timestamp),
        )
        .accounts({
          tipper: publicKey,
          creator: creatorAddress,
          tipHistory: tipHistoryPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      
      onTipSuccess();
      toast.success('Thank you for your tip! 🎉');
      
      setMessage('');
      setAmount('');      
    } catch (error) {
      toast.error('Failed to send tip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount (SOL)
        </label>
        <input
          type="number"
          id="amount"
          min="0.01"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !publicKey}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? (
          'Processing...'
        ) : !publicKey ? (
          'Connect Wallet to Tip'
        ) : (
          <>
            <span>Send Tip</span>
            <SendIcon size={20} />
          </>
        )}
      </button>
    </form>
  );
}
