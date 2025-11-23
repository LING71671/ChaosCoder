import React, { useState } from 'react';
import { KeyRound, X } from 'lucide-react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
  onClose: () => void;
  initialKey?: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onClose, initialKey = '' }) => {
  const [key, setKey] = useState(initialKey);

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-800 border border-white/10 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-opacity">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <KeyRound className="w-6 h-6 text-chaos-400" />
          <h2 className="text-xl font-bold text-white">Provide Your API Key</h2>
        </div>
        <p className="text-sm text-neutral-400 mb-6">
          ChaosCoder requires an API key to function. Your key is stored only in your browser's local storage and is never sent to our servers.
        </p>
        <div className="space-y-2">
          <label htmlFor="api-key-input" className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            API Key
          </label>
          <input
            id="api-key-input"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Enter your API key here"
            className="w-full bg-dark-900 border border-white/10 text-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-chaos-500 focus:ring-1 focus:ring-chaos-500 transition-all font-mono text-sm"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full py-3 rounded-lg font-bold text-base bg-chaos-600 hover:bg-chaos-500 text-white transition-all shadow-lg shadow-chaos-500/20 active:translate-y-0.5"
        >
          Save and Continue
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ApiKeyModal;