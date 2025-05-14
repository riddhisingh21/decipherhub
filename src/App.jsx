import React, { useState } from 'react';
import { parseFunction } from './components/FunctionParser';
import { analyzeAST } from './components/FunctionParser';
import { generateExplanation } from './components/ExplanationGenerator';
import { generateObfuscationExplanation } from './components/ObfuscationDetector';

function App() {
  const [code, setCode] = useState(`function example() {\n  // Your code here\n}`);
  const [activeTab, setActiveTab] = useState('structure');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = () => {
    setIsAnalyzing(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      const parseResult = parseFunction(code);
      if (parseResult.success) {
        const codeAnalysis = analyzeAST(parseResult.ast);
        setAnalysis(codeAnalysis);
      } else {
        console.error("Failed to parse code:", parseResult.error);
        // Show error message
        setAnalysis({ error: parseResult.error });
      }
      setIsAnalyzing(false);
    }, 500);
  };

  const renderExplanation = () => {
    if (!analysis) return null;
    
    if (analysis.error) {
      return (
        <div className="mt-8">
          <div className="analysis-card bg-red-900/30">
            <h3 className="analysis-title text-red-400">Error Parsing Code</h3>
            <p className="analysis-content text-red-200">{analysis.error}</p>
            <p className="mt-4 text-slate-light">Please check your code syntax and try again.</p>
          </div>
        </div>
      );
    }
    
    const steps = activeTab === 'structure' 
      ? generateExplanation(analysis, code)
      : generateObfuscationExplanation(code);
    
    return (
      <div className="mt-8 space-y-6 fade-in">
        {steps.map((step, index) => (
          <div key={index} className="analysis-card">
            <h3 className="analysis-title">{step.title}</h3>
            <p className="analysis-content">{step.content}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-navy-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-teal mb-2">Decipher Hub</h1>
          <p className="text-slate text-lg">Analyze and understand JavaScript code structure and obfuscation techniques</p>
        </div>
        
        <div className="bg-navy rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-teal flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Input
              </h2>
              
              <div className="flex space-x-2">
                <button 
                  className={`tab ${activeTab === 'structure' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('structure')}
                >
                  Structure
                </button>
                <button 
                  className={`tab ${activeTab === 'obfuscation' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('obfuscation')}
                >
                  Obfuscation
                </button>
              </div>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 p-2 flex space-x-1 z-10">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="code-block p-1 pt-8">
                <p className="text-center text-slate-dark mb-2">Paste JavaScript function to analyze:</p>
                <textarea
                  className="code-editor h-64"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                />
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                className="btn-teal font-medium"
                onClick={analyzeCode}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Code'
                )}
              </button>
            </div>
          </div>
          
          {renderExplanation()}
        </div>
        
        <div className="text-center text-slate-dark mt-8 text-sm">
          <p>Decipher Hub - Understand complex code at a glance</p>
        </div>
      </div>
    </div>
  );
}

export default App
