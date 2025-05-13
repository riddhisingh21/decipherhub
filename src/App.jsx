import { useState } from 'react'
import './App.css'
import { parseFunction, analyzeAST } from '@/components/FunctionParser'
import { generateExplanation } from '@/components/ExplanationGenerator'
import { generateObfuscationExplanation } from '@/components/ObfuscationDetector'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import TailwindTest from '@/components/TailwindTest'

function App() {
  const [code, setCode] = useState('')
  const [explanation, setExplanation] = useState([])
  const [openItems, setOpenItems] = useState({})
  const [error, setError] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mode, setMode] = useState('explain') // 'explain' or 'obfuscation'

  const handleAnalyze = () => {
    try {
      setError('')
      setIsAnalyzing(true)
      
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

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px'
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  }

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333'
  }

  const subheadingStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px'
  }

  const textareaStyle = {
    width: '100%',
    height: '180px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    marginBottom: '16px'
  }

  const buttonStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '24px'
  }

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#999',
    cursor: 'not-allowed'
  }

  const errorStyle = {
    padding: '16px',
    marginBottom: '24px',
    backgroundColor: '#fee2e2',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#b91c1c'
  }

  const tabStyle = {
    display: 'flex',
    marginBottom: '20px'
  }

  const tabButtonStyle = {
    padding: '10px 16px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    cursor: 'pointer',
    flex: 1,
    transition: 'all 0.2s ease'
  }

  const activeTabButtonStyle = {
    ...tabButtonStyle,
    backgroundColor: '#333',
    color: 'white',
    borderColor: '#333'
  }

  return (
    <div>
      <TailwindTest />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 className="text-3xl font-bold mb-2">Decipher</h1>
          <p style={subheadingStyle}>JavaScript Code Analyzer & Obfuscation Explainer</p>
        
          <div style={tabStyle}>
            <button 
              onClick={() => setMode('explain')}
              style={{
                ...tabButtonStyle,
                ...(mode === 'explain' ? activeTabButtonStyle : {}),
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                borderRight: 'none'
              }}
            >
              Explain Code Structure
            </button>
            <button 
              onClick={() => setMode('obfuscation')}
              style={{
                ...tabButtonStyle,
                ...(mode === 'obfuscation' ? activeTabButtonStyle : {}),
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                borderLeft: 'none'
              }}
            >
              Explain Obfuscation
            </button>
          </div>
        
          <div>
            <label style={labelStyle}>
              {mode === 'explain' 
                ? 'Paste JavaScript function to analyze:' 
                : 'Paste obfuscated JavaScript code to explain:'}
            </label>
            <textarea 
              style={textareaStyle}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={mode === 'explain' 
                ? "function a(b,c){return b.split('').map(function(d){return String.fromCharCode(d.charCodeAt(0)^c)}).join('')}"
                : "var _0x1a2b=['value','fromCharCode','charCodeAt','join','split','map'];function _0x2c3d(_0x4e5f,_0x6g7h){return _0x4e5f[_0x1a2b[4]]('')[_0x1a2b[5]](function(_0x8i9j){return String[_0x1a2b[1]](_0x8i9j[_0x1a2b[2]](0)^_0x6g7h)})[_0x1a2b[3]]('')}"}
            />
          </div>
        
          <button 
            onClick={handleAnalyze} 
            style={isAnalyzing || !code.trim() ? disabledButtonStyle : buttonStyle}
            disabled={isAnalyzing || !code.trim()}
          >
            {isAnalyzing 
              ? 'Analyzing...' 
              : mode === 'explain' 
                ? 'Analyze Function' 
                : 'Explain Obfuscation'}
          </button>
        </div>
        
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
        
        {explanation.length > 0 && (
          <div style={cardStyle}>
            <h2 style={headingStyle}>
              {mode === 'explain' ? 'Function Explanation' : 'Obfuscation Explanation'}
            </h2>
            
            <Accordion>
              {explanation.map((step, index) => (
                <AccordionItem key={index}>
                  <AccordionTrigger 
                    open={openItems[index]} 
                    onClick={() => toggleAccordion(index)}
                  >
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent open={openItems[index]}>
                    <div 
                      style={{ lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{ __html: step.content.replace(/\n/g, '<br>') }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  )
}

export default App


