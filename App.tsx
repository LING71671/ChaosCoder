import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import CodeEditor from './components/CodeEditor';
import { SupportedLanguage, ChaosLevel } from './types';
import { DEFAULT_CODE_SNIPPETS, CHAOS_FEATURES } from './constants';
import { obfuscateCode } from './services/obfuscator';

const App: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>(SupportedLanguage.JAVA);
  const [chaosLevel, setChaosLevel] = useState<ChaosLevel>(ChaosLevel.MESSY);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    CHAOS_FEATURES.filter(f => f.default).map(f => f.id)
  );
  
  const [inputCode, setInputCode] = useState<string>(DEFAULT_CODE_SNIPPETS[SupportedLanguage.JAVA]);
  const [outputCode, setOutputCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Update default snippet when language changes
  useEffect(() => {
    const isDefaultInput = Object.values(DEFAULT_CODE_SNIPPETS).includes(inputCode);
    if (!inputCode || isDefaultInput) {
       setInputCode(DEFAULT_CODE_SNIPPETS[language]);
       setOutputCode(''); // Clear output when language changes
    }
  }, [language, inputCode]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGenerate = useCallback(() => {
    if (!inputCode.trim()) return;
    
    setIsGenerating(true);
    setOutputCode('');

    // Simulate a brief processing time for better UX with the spinner
    setTimeout(() => {
      try {
        const featuresToRun = CHAOS_FEATURES
            .map(f => f.id)
            .filter(id => selectedFeatures.includes(id));

        const result = obfuscateCode(inputCode, {
          language,
          level: chaosLevel,
          features: featuresToRun
        });
        setOutputCode(result);
      } catch (error) {
        setOutputCode(`// System Failure: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsGenerating(false);
      }
    }, 200); // 200ms delay

  }, [inputCode, language, chaosLevel, selectedFeatures]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-chaos-500/30">
      <Header />

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
                labelKey={"cleanInputLabel"}
                value={inputCode}
                onChange={setInputCode}
                language={language}
              />
            </div>
            <div className="h-full relative">
              <CodeEditor 
                labelKey={"chaoticOutputLabel"}
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