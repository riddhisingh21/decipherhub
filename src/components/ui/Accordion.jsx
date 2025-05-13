import * as React from "react"

const Accordion = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={className} style={{ marginBottom: '20px' }} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={className} 
    style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }} 
    {...props} 
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, open, ...props }, ref) => (
  <button
    ref={ref}
    className={className}
    style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      padding: '12px 16px',
      fontWeight: '500',
      backgroundColor: open ? '#f5f5f5' : 'white',
      borderBottom: open ? '1px solid #ccc' : 'none',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      cursor: 'pointer'
    }}
    {...props}
  >
    <span style={{ textAlign: 'left' }}>{children}</span>
    <span style={{ 
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </span>
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, open, ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    style={{
      overflow: 'hidden',
      maxHeight: open ? '2000px' : '0',
      opacity: open ? '1' : '0',
      transition: 'all 0.3s ease-in-out'
    }}
    {...props}
  >
    <div style={{ padding: '16px', textAlign: 'left' }}>{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
