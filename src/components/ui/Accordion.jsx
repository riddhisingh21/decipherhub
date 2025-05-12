import * as React from "react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border rounded-lg", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, open, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full justify-between p-4 font-medium transition-all hover:bg-muted/50",
      className
    )}
    {...props}
  >
    {children}
    <span className={`transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      ↓
    </span>
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, open, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden transition-all",
      open ? "max-h-96" : "max-h-0",
      className
    )}
    {...props}
  >
    <div className="p-4 pt-0">{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }