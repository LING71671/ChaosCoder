import React from 'react';
import { Settings2, Flame, Skull } from 'lucide-react';
import { LANGUAGE_OPTIONS, CHAOS_LEVELS, CHAOS_FEATURES } from '../constants';
import { SupportedLanguage, ChaosLevel } from '../types';

interface ControlPanelProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  chaosLevel: ChaosLevel;
  setChaosLevel: (level: ChaosLevel) => void;
  selectedFeatures: string[];
  toggleFeature: (featureId: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  language,
  setLanguage,
  chaosLevel,
  setChaosLevel,
  selectedFeatures,
  toggleFeature,
  isGenerating,
  onGenerate
}) => {
  return (
    <div className="bg-dark-800 border border-white/10 rounded-xl p-5 flex flex-col gap-6 h-full overflow-y-auto">
      
      {/* Language Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <Settings2 className="w-3 h-3" /> Target Language
        </label>
        <div className="relative">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="w-full bg-dark-900 border border-white/10 text-neutral-200 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-chaos-500 focus:ring-1 focus:ring-chaos-500 transition-all font-mono text-sm"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Chaos Level */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-3 h-3" /> Toxicity Level
        </label>
        <div className="grid gap-2">
          {CHAOS_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setChaosLevel(level.value)}
              className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                chaosLevel === level.value 
                  ? 'bg-chaos-900/20 border-chaos-500/50 text-chaos-100 shadow-[0_0_15px_-5px_rgba(74,222,128,0.3)]' 
                  : 'bg-dark-900 border-transparent hover:border-white/10 text-neutral-400'
              }`}
            >
              <div className="font-medium text-sm mb-0.5">{level.value}</div>
              <div className="text-[10px] opacity-70 leading-tight">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Toggles */}
      <div className="space-y-3 flex-grow">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Applied Annoyances
        </label>
        <div className="space-y-1">
          {CHAOS_FEATURES.map((feature) => (
            <label 
              key={feature.id} 
              className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer group"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                selectedFeatures.includes(feature.id)
                  ? 'bg-chaos-500 border-chaos-500'
                  : 'bg-transparent border-neutral-600 group-hover:border-neutral-500'
              }`}>
                 {selectedFeatures.includes(feature.id) && (
                   <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                 )}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
              />
              <span className={`text-sm ${selectedFeatures.includes(feature.id) ? 'text-neutral-200' : 'text-neutral-500'}`}>
                {feature.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
          isGenerating 
            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            : 'bg-chaos-600 hover:bg-chaos-500 text-white shadow-chaos-500/20 hover:shadow-chaos-500/40 active:translate-y-0.5'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin"></div>
            Ruining...
          </>
        ) : (
          <>
            <Skull className="w-5 h-5" />
            Ruinate Code
          </>
        )}
      </button>
    </div>
  );
};

export default ControlPanel;