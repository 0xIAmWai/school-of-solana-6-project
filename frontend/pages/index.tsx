
// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './../components/Header';
import { Footer } from './../components/Footer';
import { TipForm } from './../components/TipForm';
import { TipHistory } from './../components/TipHistory';
import { fetchTipHistory } from "@/utils/programUtils";
import { useConnection } from "@solana/wallet-adapter-react";
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const { connection } = useConnection();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTipHistory = useCallback(async () => {
    try {
      setLoading(true);
      const history = await fetchTipHistory(connection);
      setTips(history.sort((a, b) => b.timestamp.toNumber() - a.timestamp.toNumber()));
    } catch (err) {
      console.error("Failed to fetch tip history", err);
      setError("Failed to load tip history. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [connection]);

  useEffect(() => {
    loadTipHistory();
  }, [loadTipHistory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 mx-auto max-w-6xl bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-center space-x-2 shadow-sm">
          <AlertCircle size={40} className="text-blue-500" />
          <span className="text-sm font-medium text-blue-700">
          This Solana dApp, <strong>Mint Me a Moment</strong>, is a demonstration app deployed on the <strong>DEVNET</strong>. It functions as a tipping platform, similar to 'Buy Me a Coffee,' allowing users to send Solana to the creator as a gesture of support.
            
            
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Support</h2>
            <TipForm onTipSuccess={loadTipHistory}  />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent supports</h2>
            <TipHistory tips={tips} loading={loading} error={error} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
