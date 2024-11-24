import { Clock, Coins, User } from 'lucide-react';
import { MintMeAMoment } from './../program/mint_me_a_moment';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { fetchTipHistory } from "@/utils/programUtils";

type TipHistory = MintMeAMoment["accounts"]["tipHistory"];

export function TipHistory({
  tips,
  loading,
  error,
}: {
  tips: any[];
  loading: boolean;
  error: string | null;
}) {
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

  if (tips.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tips yet. Be the first one to send a tip!
      </div>
    )
  }

  return (
    <div className="tip-history-container space-y-4 max-h-[500px] overflow-y-auto">
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
    </div>
  );
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}