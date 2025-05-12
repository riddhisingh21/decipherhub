import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Decipher</h1>
      <div className="space-y-4">
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
      </div>
    </div>
  )
}

export default App

