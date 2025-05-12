export function generateExplanation(analysis, code) {
  const steps = [];
  
  // Step 1: Identify the overall structure
  steps.push({
    title: "Function Structure",
    content: `This function contains:
      - ${analysis.loops.length} loops
      - ${analysis.conditionals.length} conditional statements
      - ${analysis.assignments.length} assignments
      - ${analysis.functions.length} nested functions
      - ${analysis.variables.length} variable declarations`
  });
  
  // Step 2: Explain variable declarations
  if (analysis.variables.length > 0) {
    steps.push({
      title: "Variable Declarations",
      content: "The function declares variables which may be used for temporary storage or counters."
    });
  }
  
  // Step 3: Explain loops
  if (analysis.loops.length > 0) {
    steps.push({
      title: "Loop Analysis",
      content: "The function contains loops which may indicate iteration over data or repeated operations."
    });
  }
  
  // Step 4: Explain conditionals
  if (analysis.conditionals.length > 0) {
    steps.push({
      title: "Conditional Logic",
      content: "The function contains conditional statements which control the flow based on certain conditions."
    });
  }
  
  // Step 5: Explain assignments
  if (analysis.assignments.length > 0) {
    steps.push({
      title: "Data Manipulation",
      content: "The function manipulates data through assignments, potentially transforming inputs."
    });
  }
  
  // Step 6: Provide a summary
  steps.push({
    title: "Function Purpose",
    content: "Based on the analysis, this function appears to be designed for data transformation or processing."
  });
  
  return steps;
}