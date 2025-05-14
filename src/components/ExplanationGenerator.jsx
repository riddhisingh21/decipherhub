export function generateExplanation(analysis, code) {
  const steps = [];
  
  // Step 1: Identify the overall structure with detailed explanation
  steps.push({
    title: "Function Structure Overview",
    content: `This function's structure consists of:
- ${analysis.loops.length} loops (${analysis.loops.length > 0 ? 'sections of code that repeat multiple times' : 'no repeating code sections'})
- ${analysis.conditionals.length} conditional statements (${analysis.conditionals.length > 0 ? 'decision points where the code chooses different paths' : 'no decision points'})
- ${analysis.assignments.length} assignments (${analysis.assignments.length > 0 ? 'places where values are stored in variables' : 'no value storage operations'})
- ${analysis.functions.length} nested functions (${analysis.functions.length > 0 ? 'smaller functions defined inside this function' : 'no internal function definitions'})
- ${analysis.variables.length} variable declarations (${analysis.variables.length > 0 ? 'containers created to store data' : 'no data containers'})`
  });
  
  // Step 2: Explain variable declarations in detail
  if (analysis.variables.length > 0) {
    steps.push({
      title: "Variable Declarations Explained",
      content: `This function creates ${analysis.variables.length} variables, which are like labeled containers for storing data.

Variables are fundamental building blocks in programming that allow the code to store, track, and manipulate information during execution. Each variable acts as a named container that holds a specific piece of data, which can be changed or referenced throughout the function.

The presence of ${analysis.variables.length} variable${analysis.variables.length > 1 ? 's' : ''} suggests this function needs to keep track of multiple pieces of information as it runs.`
    });
  }
  
  // Step 3: Explain loops in detail
  if (analysis.loops.length > 0) {
    steps.push({
      title: "Loops Explained",
      content: `This function contains ${analysis.loops.length} loop${analysis.loops.length > 1 ? 's' : ''}, which ${analysis.loops.length > 1 ? 'are sections' : 'is a section'} of code that repeat multiple times.

Loops are powerful structures that allow the same block of code to run multiple times, either:
- A fixed number of times (for loops)
- Until a certain condition is met (while loops)
- For each item in a collection (for...of, for...in loops)

The presence of ${analysis.loops.length} loop${analysis.loops.length > 1 ? 's' : ''} indicates this function likely processes collections of data or performs repetitive tasks efficiently.`
    });
  }
  
  // Step 4: Explain conditionals in detail
  if (analysis.conditionals.length > 0) {
    steps.push({
      title: "Conditional Logic Explained",
      content: `This function contains ${analysis.conditionals.length} conditional statement${analysis.conditionals.length > 1 ? 's' : ''}, which ${analysis.conditionals.length > 1 ? 'are decision points' : 'is a decision point'} where the code chooses different paths.

Conditionals (like if/else statements) allow the function to make decisions based on certain conditions:
- They evaluate an expression to determine if it's true or false
- Based on the result, they execute different blocks of code
- This creates branching paths in the program's execution

The presence of ${analysis.conditionals.length} conditional${analysis.conditionals.length > 1 ? 's' : ''} shows this function has decision-making logic that adapts its behavior based on different situations or inputs.`
    });
  }
  
  // Step 5: Explain assignments in detail
  if (analysis.assignments.length > 0) {
    steps.push({
      title: "Assignments Explained",
      content: `This function contains ${analysis.assignments.length} assignment${analysis.assignments.length > 1 ? 's' : ''}, which ${analysis.assignments.length > 1 ? 'are operations' : 'is an operation'} that store values in variables.

Assignments are fundamental operations where values are stored in variables:
- They use the equals sign (=) to put a value into a variable
- They can update existing variables with new values
- They're essential for tracking changing state within a function

The presence of ${analysis.assignments.length} assignment${analysis.assignments.length > 1 ? 's' : ''} indicates this function actively manipulates and transforms data during its execution.`
    });
  }
  
  // Step 6: Explain nested functions in detail
  if (analysis.functions.length > 0) {
    steps.push({
      title: "Nested Functions Explained",
      content: `This function defines ${analysis.functions.length} nested function${analysis.functions.length > 1 ? 's' : ''} within itself.

Nested functions are smaller, specialized functions defined inside another function:
- They help organize code by grouping related operations
- They can access variables from their parent function (closure)
- They're often used for operations that need to be performed multiple times within the parent function

The presence of ${analysis.functions.length} nested function${analysis.functions.length > 1 ? 's' : ''} suggests this function performs complex operations that benefit from being broken down into smaller, reusable pieces of code.`
    });
  }
  
  // Step 7: Provide a detailed summary
  steps.push({
    title: "Function Purpose and Summary",
    content: `Based on the detailed analysis, this function appears to be designed for data transformation or processing.

Let's summarize what we've learned about this function:
1. It has a structure consisting of ${analysis.variables.length} variables, ${analysis.loops.length} loops, ${analysis.conditionals.length} conditionals, ${analysis.assignments.length} assignments, and ${analysis.functions.length} nested functions.
2. The presence of ${analysis.loops.length > 0 ? 'loops suggests it processes multiple items or repeats operations' : 'no loops suggests it performs a single, direct operation'}.
3. The ${analysis.conditionals.length > 0 ? 'conditional statements indicate it makes decisions based on the data it receives' : 'lack of conditionals suggests it performs the same operations regardless of input'}.
4. The ${analysis.assignments.length > 0 ? 'assignments show that it transforms or manipulates data during execution' : 'lack of assignments suggests it may be more focused on calculation than data transformation'}.
5. The ${analysis.functions.length > 0 ? 'nested functions indicate it breaks down complex tasks into smaller, reusable operations' : 'lack of nested functions suggests it has a straightforward, linear execution path'}.

This function likely takes some input, processes it according to certain rules or transformations, and produces an output based on that processing. The specific purpose would depend on the variable names, operation types, and overall context of the code.`
  });
  
  return steps;
}
