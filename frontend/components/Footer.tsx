import { GithubIcon, TwitterIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 Mint Me A Moment. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://x.com/0xIAmWai"
              className="hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={20} />
            </a>
            <a
              href="https://github.com/0xIAmWai"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
