import { WalletButton } from "./../pages/_app";
import { CoffeeIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CoffeeIcon size={32} className="text-yellow-300" />
          <h1 className="text-2xl font-bold">Mint Me A Moment</h1>
        </div>
        <WalletButton />
      </div>
    </header>
  );
}
