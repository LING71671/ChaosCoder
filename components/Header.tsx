import React from 'react';
import { Skull, KeyRound } from 'lucide-react';

interface HeaderProps {
  onApiKeyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onApiKeyClick }) => {
  return (
    <header className="border-b border-white/10 bg-dark-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-chaos-500/10 rounded-lg border border-chaos-500/20">
            <Skull className="w-6 h-6 text-chaos-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-chaos-400 to-emerald-200 bg-clip-text text-transparent tracking-tight">
              ChaosCoder
            </h1>
            <p className="text-xs text-neutral-500 font-mono">v1.0.0 // Make it worse</p>
          </div>
        </div>
        
        <button 
          onClick={onApiKeyClick}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-chaos-400 transition-colors p-2 rounded-lg hover:bg-white/5"
          title="Set API Key"
        >
          <KeyRound className="w-4 h-4" />
          <span>API Key</span>
        </button>
      </div>
    </header>
  );
};

export default Header;