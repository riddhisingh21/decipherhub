import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { parseFunction, analyzeAST } from '@/components/FunctionParser'
import { generateExplanation } from '@/components/ExplanationGenerator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'

function App() {
  const [code, setCode] = useState('')
  const [explanation, setExplanation] = useState([])
  const [openItems, setOpenItems] = useState({})
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    try {
      setError('')
      const { success, ast, error } = parseFunction(code)
      
      if (!success) {
        setError(error)
        return
      }
      
      const analysis = analyzeAST(ast)
      const steps = generateExplanation(analysis, code)
      
      setExplanation(steps)
      
      // Initialize all accordion items as open
      const initialOpenState = {}
      steps.forEach((_, index) => {
        initialOpenState[index] = true
      })
      setOpenItems(initialOpenState)
    } catch (err) {
      setError(`Error analyzing code: ${err.message}`)
    }
  }

  const toggleAccordion = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Decipher - Obfuscated Function Explainer</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Paste obfuscated JavaScript function:
        </label>
        <textarea 
          className="w-full h-40 p-3 border rounded-md font-mono text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function a(b,c){return b.split('').map(function(d){return String.fromCharCode(d.charCodeAt(0)^c)}).join('')}"
        />
      </div>
      
      <Button onClick={handleAnalyze} className="mb-6">
        Analyze Function
      </Button>
      
      {error && (
        <div className="p-4 mb-6 bg-destructive/10 border border-destructive rounded-md text-destructive">
          {error}
        </div>
      )}
      
      {explanation.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Function Explanation</h2>
          
          <Accordion>
            {explanation.map((step, index) => (
              <AccordionItem key={index} className="mb-2">
                <AccordionTrigger 
                  open={openItems[index]} 
                  onClick={() => toggleAccordion(index)}
                >
                  {step.title}
                </AccordionTrigger>
                <AccordionContent open={openItems[index]}>
                  <div className="whitespace-pre-line">{step.content}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}

export default App


