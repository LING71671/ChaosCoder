import React from 'react';
import { Skull } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

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
            <p className="text-xs text-neutral-500 font-mono">{t('header.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs px-3 py-1.5 rounded-md border border-neutral-700 bg-dark-800 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
