import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import CodeEditor from './components/CodeEditor';
import ApiKeyModal from './components/ApiKeyModal';
import { SupportedLanguage, ChaosLevel } from './types';
import { DEFAULT_CODE_SNIPPETS, CHAOS_FEATURES } from './constants';
import { ruinCode } from './services/gemini';

const App: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>(SupportedLanguage.JAVA);
  const [chaosLevel, setChaosLevel] = useState<ChaosLevel>(ChaosLevel.MESSY);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    CHAOS_FEATURES.filter(f => f.default).map(f => f.id)
  );
  
  const [inputCode, setInputCode] = useState<string>(DEFAULT_CODE_SNIPPETS[SupportedLanguage.JAVA]);
  const [outputCode, setOutputCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('chaoscoder_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiKeyModal(true); // Show modal on first visit if no key is found
    }
  }, []);

  // Update default snippet when language changes
  useEffect(() => {
    const isDefaultInput = Object.values(DEFAULT_CODE_SNIPPETS).includes(inputCode);
    if (!inputCode || isDefaultInput) {
       setInputCode(DEFAULT_CODE_SNIPPETS[language]);
    }
  }, [language, inputCode]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSaveApiKey = (key: string) => {
    const trimmedKey = key.trim();
    if(trimmedKey) {
      setApiKey(trimmedKey);
      localStorage.setItem('chaoscoder_api_key', trimmedKey);
      setShowApiKeyModal(false);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!inputCode.trim()) return;
    
    if (!apiKey) {
      setShowApiKeyModal(true);
      setOutputCode(`// Please set your API Key first by clicking the button in the top-right.`);
      return;
    }

    setIsGenerating(true);
    setOutputCode('');

    try {
      const result = await ruinCode(inputCode, apiKey, {
        language,
        level: chaosLevel,
        features: selectedFeatures
      });
      setOutputCode(result);
    } catch (error) {
      setOutputCode(`// System Failure: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  }, [inputCode, apiKey, language, chaosLevel, selectedFeatures]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-chaos-500/30">
      {showApiKeyModal && (
        <ApiKeyModal 
          initialKey={apiKey}
          onSave={handleSaveApiKey} 
          onClose={() => setShowApiKeyModal(false)} 
        />
      )}
      <Header onApiKeyClick={() => setShowApiKeyModal(true)} />

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          <div className="lg:col-span-3 h-full">
            <ControlPanel 
              language={language}
              setLanguage={setLanguage}
              chaosLevel={chaosLevel}
              setChaosLevel={setChaosLevel}
              selectedFeatures={selectedFeatures}
              toggleFeature={toggleFeature}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6 h-[800px] lg:h-full">
            <div className="h-full">
              <CodeEditor 
                label="Clean Input"
                value={inputCode}
                onChange={setInputCode}
                language={language}
              />
            </div>
            <div className="h-full relative">
              <CodeEditor 
                label="Chaotic Output"
                value={outputCode}
                readOnly={true}
                language={language}
              />
            </div>
          </div>
        </div>
      </main>
      
      <div className="h-10 lg:hidden"></div>
    </div>
  );
};

export default App;