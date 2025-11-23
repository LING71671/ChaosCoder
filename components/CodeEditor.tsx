import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  labelKey: 'cleanInputLabel' | 'chaoticOutputLabel';
  readOnly?: boolean;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, labelKey, readOnly = false, language }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const placeholderText = readOnly ? t('editor.outputPlaceholder') : t('editor.inputPlaceholder');

  return (
    <div className="flex flex-col h-full bg-dark-800 border border-white/10 rounded-xl overflow-hidden shadow-xl">
      <div className="bg-dark-900/50 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${readOnly ? 'bg-chaos-500' : 'bg-blue-500'}`}></span>
          {t(`editor.${labelKey}`)}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-neutral-600 font-mono px-2 py-1 rounded bg-white/5 border border-white/5">
            {language}
          </span>
          {readOnly && (
            <button 
              onClick={handleCopy}
              className="text-neutral-500 hover:text-chaos-400 transition-colors"
              title="Copy Code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow relative group">
        <textarea
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className={`w-full h-full bg-dark-900 p-4 font-mono text-sm resize-none focus:outline-none leading-6 ${
            readOnly 
              ? 'text-chaos-100 selection:bg-chaos-500/30 cursor-text' 
              : 'text-neutral-300 selection:bg-blue-500/30'
          }`}
          placeholder={placeholderText}
        />
        {!readOnly && value.length === 0 && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-neutral-700 font-mono text-sm">
            {/* Empty state hint */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
