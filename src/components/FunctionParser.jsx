import { parse } from '@babel/parser';

export function parseFunction(code) {
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx']
    });
    return { success: true, ast };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function analyzeAST(ast) {
  // Basic structure analysis
  const analysis = {
    loops: [],
    conditionals: [],
    assignments: [],
    functions: [],
    variables: []
  };
  
  // Traverse the AST to find patterns
  traverseAST(ast, analysis);
  
  return analysis;
}

function traverseAST(node, analysis, path = []) {
  if (!node || typeof node !== 'object') return;
  
  // Check node type and collect information
  if (node.type === 'ForStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement') {
    analysis.loops.push({ type: node.type, path: [...path] });
  } else if (node.type === 'IfStatement' || node.type === 'ConditionalExpression') {
    analysis.conditionals.push({ type: node.type, path: [...path] });
  } else if (node.type === 'AssignmentExpression') {
    analysis.assignments.push({ type: node.type, path: [...path] });
  } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
    analysis.functions.push({ type: node.type, path: [...path] });
  } else if (node.type === 'VariableDeclaration') {
    analysis.variables.push({ type: node.type, path: [...path] });
  }
  
  // Recursively traverse child nodes
  for (const key in node) {
    if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
      traverseAST(node[key], analysis, [...path, key]);
    }
  }
}