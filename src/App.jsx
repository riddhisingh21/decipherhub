import { useState, useEffect } from 'react'
import './App.css'
import { parseFunction, analyzeAST } from '@/components/FunctionParser'
import { generateExplanation } from '@/components/ExplanationGenerator'
import { generateObfuscationExplanation } from '@/components/ObfuscationDetector'

function App() {
  const [code, setCode] = useState('')
  const [explanation, setExplanation] = useState([])
  const [openItems, setOpenItems] = useState({})
  const [error, setError] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mode, setMode] = useState('explain') // 'explain' or 'obfuscation'
  const [animateHeader, setAnimateHeader] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    setAnimateHeader(true)
    document.body.className = 'dark'
  }, [])

  const handleAnalyze = () => {
    try {
      setError('')
      setIsAnalyzing(true)
      
      setTimeout(() => {
        if (mode === 'explain') {
          // Original functionality - explain the code
          const { success, ast, error } = parseFunction(code)
          
          if (!success) {
            setError(error)
            setIsAnalyzing(false)
            return
          }
          
          const analysis = analyzeAST(ast)
          const steps = generateExplanation(analysis, code)
          
          setExplanation(steps)
        } else {
          // New functionality - explain obfuscation
          const steps = generateObfuscationExplanation(code)
          setExplanation(steps)
        }
        
        // Initialize all accordion items as open
        const initialOpenState = {}
        explanation.forEach((_, index) => {
          initialOpenState[index] = true
        })
        setOpenItems(initialOpenState)
        setIsAnalyzing(false)
        
        // Show sparkles animation
        setShowSparkles(true)
        setTimeout(() => setShowSparkles(false), 1500)
      }, 1000) // Simulate processing time
    } catch (err) {
      setError(`Error analyzing code: ${err.message}`)
      setIsAnalyzing(false)
    }
  }

  const toggleAccordion = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="min-h-screen bg-[#020c1b] text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className={`transition-all duration-1000 ease-in-out transform ${animateHeader ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-[#64ffda]">
              Decipher Hub
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#8892b0]">
              Analyze and understand JavaScript code structure and obfuscation techniques
            </p>
          </div>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className="space-y-8">
          {/* Input Card */}
          <div className="rounded-xl overflow-hidden transition-all duration-300 transform hover:shadow-xl bg-[#0a192f] shadow-lg shadow-[#64ffda]/5 hover:shadow-[#64ffda]/10">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-[#112240]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64ffda]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Code Input
                </h2>
                
                {/* Mode Tabs */}
                <div className="flex rounded-lg overflow-hidden shadow-sm bg-[#112240]">
                  <button 
                    onClick={() => setMode('explain')}
                    className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                      mode === 'explain' 
                        ? 'bg-[#233554] text-[#64ffda]' 
                        : 'text-[#8892b0] hover:bg-[#1d2d50]'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Structure
                    </span>
                  </button>
                  <button 
                    onClick={() => setMode('obfuscation')}
                    className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                      mode === 'obfuscation' 
                        ? 'bg-[#233554] text-[#64ffda]' 
                        : 'text-[#8892b0] hover:bg-[#1d2d50]'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Obfuscation
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#ccd6f6]">
                  {mode === 'explain' 
                    ? 'Paste JavaScript function to analyze:' 
                    : 'Paste obfuscated JavaScript code to explain:'}
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300 bg-[#64ffda]/20"></div>
                  <div className="relative">
                    <div className="flex items-center px-3 py-2 text-xs font-mono rounded-t-lg border-x border-t bg-[#112240] text-[#8892b0] border-[#233554]">
                      <div className="flex space-x-1.5 mr-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span>JavaScript</span>
                    </div>
                    <textarea 
                      className="w-full h-64 p-4 border font-mono text-sm resize-none focus:outline-none transition-colors rounded-b-lg rounded-tr-lg bg-[#0a192f] border-[#233554] text-[#ccd6f6] placeholder-[#8892b0]"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={mode === 'explain' 
                        ? 'function example() {\n  // Your code here\n}' 
                        : '// Paste obfuscated code here\nvar _0x1a2b = ["value", "fromCharCode"];'}
                      spellCheck="false"
                    />
                  </div>
                  {code && (
                    <button 
                      onClick={() => setCode('')}
                      className="absolute top-10 right-3 p-1 rounded-full transition-colors text-[#8892b0] hover:text-[#ccd6f6] hover:bg-[#233554]"
                      aria-label="Clear code"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm bg-red-900/30 border border-red-800/50 text-red-300">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}
              
              {/* Action Button */}
              <button
                onClick={handleAnalyze}
                disabled={!code.trim() || isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  !code.trim() || isAnalyzing
                    ? 'bg-[#112240] text-[#4a5568] cursor-not-allowed' 
                    : 'bg-[#233554] hover:bg-[#1d2d50] text-[#64ffda] border border-[#64ffda]/30 hover:border-[#64ffda]/50 shadow-lg hover:shadow-[#64ffda]/10'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#64ffda]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Code'
                )}
              </button>
            </div>
          </div>
          
          {/* Results Section */}
          <div className={`rounded-2xl shadow-xl overflow-hidden bg-[#0a192f] ${explanation.length === 0 ? 'hidden lg:block' : ''}`}>
            <div className="px-6 py-4 border-b border-[#233554] bg-[#0a192f]">
              <h2 className="font-bold text-[#ccd6f6]">
                {explanation.length > 0 ? 'Analysis Results' : 'Results will appear here'}
              </h2>
            </div>
            
            <div className="p-6">
              {explanation.length > 0 ? (
                <div className="space-y-4">
                  {explanation.map((item, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden border-[#233554]">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-3 text-left bg-[#112240] hover:bg-[#1d2d50] text-[#ccd6f6]"
                      >
                        <span className="font-medium flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 bg-[#233554] text-[#64ffda]">
                            {index + 1}
                          </span>
                          {item.title}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-[#8892b0] transition-transform duration-200 ${openItems[index] ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openItems[index] && (
                        <div className="p-6 bg-[#0a192f]">
                          <div 
                            className="explanation-content text-[#8892b0]"
                            dangerouslySetInnerHTML={{ 
                              __html: item.content
                                .replace(/\n/g, '<br>')
                                .replace(/- ([^<]+)/g, '<li class="ml-5 list-disc my-1">$1</li>')
                                .replace(/(Common .+include:)/g, '<strong class="block text-lg mt-3 mb-2 font-medium">$1</strong>')
                                .replace(/(\d+\.\s'[^']+'[^:]+:)/g, '<strong class="block mt-3 mb-1">$1</strong>')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium">$1</strong>')
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-[#8892b0]">Enter code to analyze and click "Analyze Code" to see results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
