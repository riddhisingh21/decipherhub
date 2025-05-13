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
      
Variables are fundamental building blocks in programming. When you see a variable declaration like 'let x = 5' or 'const name = "John"', the program is:
1. Creating a named container in memory
2. Optionally assigning an initial value to it
3. Making that container available for later use

Variables can store numbers, text (strings), lists (arrays), objects, or even references to other functions. They allow the function to remember and manipulate data throughout its execution.

In JavaScript, variables are typically declared using 'let', 'const', or 'var':
- 'const' creates variables that cannot be reassigned (their value is constant)
- 'let' creates variables that can be changed later
- 'var' is an older way to declare variables with different scoping rules`
    });
  }
  
  // Step 3: Explain loops in detail
  if (analysis.loops.length > 0) {
    steps.push({
      title: "Loop Structures Explained",
      content: `This function contains ${analysis.loops.length} loops, which are structures that repeat a block of code multiple times.

Loops are essential for processing collections of data or performing repetitive tasks without duplicating code. When you see a loop, the code inside it will run multiple times based on a condition.

Common types of loops include:
1. 'for' loops: Usually used when you know exactly how many times you want to repeat (e.g., 'for (let i = 0; i < 10; i++)').
2. 'while' loops: Continue as long as a condition remains true (e.g., 'while (isRunning)').
3. 'do-while' loops: Similar to while loops but always execute at least once.
4. 'for...of' loops: Iterate over items in an array or other iterable object.
5. 'for...in' loops: Iterate over the properties of an object.

Loops often use counter variables, array indices, or condition checks to determine when to stop repeating.`
    });
  }
  
  // Step 4: Explain conditionals in detail
  if (analysis.conditionals.length > 0) {
    steps.push({
      title: "Conditional Logic Explained",
      content: `This function contains ${analysis.conditionals.length} conditional statements, which are decision points where the code chooses different paths based on certain conditions.

Conditionals are like forks in the road that allow a program to make decisions. They evaluate expressions as either true or false, then execute different code blocks accordingly.

Common conditional structures include:
1. 'if' statements: Execute code only if a condition is true (e.g., 'if (age >= 18)').
2. 'if-else' statements: Choose between two code blocks based on a condition.
3. 'else if' chains: Check multiple conditions in sequence.
4. Ternary operators: Compact form for simple conditions (e.g., 'isAdult ? "Yes" : "No"').
5. 'switch' statements: Choose between multiple code blocks based on a value.

Conditionals often use comparison operators (==, ===, >, <, >=, <=) and logical operators (&&, ||, !) to form complex conditions.`
    });
  }
  
  // Step 5: Explain assignments in detail
  if (analysis.assignments.length > 0) {
    steps.push({
      title: "Data Manipulation Through Assignments",
      content: `This function contains ${analysis.assignments.length} assignments, which are operations that store or update values in variables.

Assignments are how a program changes data during execution. When you see an equals sign (=) that's not part of a variable declaration or comparison, it's usually an assignment.

For example:
- 'count = 0' sets a variable to a specific value
- 'total += price' adds a value to an existing variable
- 'name = firstName + " " + lastName' combines values and stores the result
- 'arr[i] = newValue' changes a specific element in an array

Assignments can involve:
1. Simple value assignment (x = 5)
2. Arithmetic operations (sum += value)
3. String manipulation (message = "Hello " + userName)
4. Array or object property updates (user.status = "active")

Each assignment changes the program's state by updating the data stored in memory.`
    });
  }
  
  // Step 6: Explain nested functions in detail
  if (analysis.functions.length > 0) {
    steps.push({
      title: "Nested Functions Explained",
      content: `This function contains ${analysis.functions.length} nested functions, which are smaller, specialized functions defined inside the main function.

Nested functions (also called inner functions) are functions defined inside another function. They have several important characteristics:
1. They can access variables from their parent function (closure)
2. They're typically used for tasks specific to the parent function
3. They help organize code by breaking complex operations into smaller steps
4. They're not accessible outside the parent function unless explicitly returned or passed elsewhere

Common uses for nested functions include:
- Helper functions that perform calculations needed by the parent
- Callback functions for array methods like map(), filter(), or reduce()
- Event handlers in UI code
- Functions that need access to the parent function's variables

Nested functions make code more modular and often more readable by separating concerns.`
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

This function likely takes some input, processes it according to certain rules or transformations, and produces an output based on that processing. The specific purpose would depend on the variable names, operation types, and overall context of the code.`
  });
  
  return steps;
}
