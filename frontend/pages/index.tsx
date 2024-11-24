import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './../components/Header';
import { Footer } from './../components/Footer';
import { TipForm } from './../components/TipForm';
import { TipHistory } from './../components/TipHistory';

interface Tip {
  id: number;
  publicKey: string;
  amount: number;
  message: string;
  timestamp: string;
}

export default function Home() {
  const [tips, setTips] = useState<Tip[]>([]);

  const handleTipSuccess = (newTip: Tip) => {
    setTips((prevTips) => [newTip, ...prevTips]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Tip</h2>
            <TipForm onTipSuccess={handleTipSuccess} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Tips</h2>
            <TipHistory tips={tips} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
