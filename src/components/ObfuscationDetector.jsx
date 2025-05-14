// Common obfuscation patterns and beginner-friendly explanations
const obfuscationPatterns = [
  {
    name: "String Array",
    pattern: /var\s+(_0x[a-f0-9]+|[a-z]{1,2})\s*=\s*\[(['"][^'"]*['"],?\s*)+\]/,
    explanation: "This is a string array used to hide text values. The developer stored all the text in an array and uses numbers to access them instead of writing the text directly in the code. This makes the code harder to read but doesn't change what it does.",
    example: "var _0x1a2b = ['hello', 'world']; // Later uses _0x1a2b[0] instead of 'hello'"
  },
  {
    name: "Hexadecimal Numbers",
    pattern: /0x[a-fA-F0-9]{1,8}/g,
    explanation: "These strange-looking numbers starting with '0x' are called hexadecimal numbers. They're just regular numbers written in a different format that computers understand. Developers use them to make code harder to read.",
    example: "0x1A is the same as the number 26 in regular counting"
  },
  {
    name: "Eval Function",
    pattern: /eval\s*\(/,
    explanation: "The eval function is used to run code that's stored as text. Obfuscators often use this to hide the real code until the program runs. This is a red flag for potentially harmful code.",
    example: "eval('alert(\"Hidden code running!\");')"
  },
  {
    name: "String Concatenation",
    pattern: /(['"]).*?\1\s*\+\s*(['"]).*?\2/,
    explanation: "This technique breaks up text into smaller pieces and joins them together. This makes it harder to search for specific text in the code and obscures the actual strings being used.",
    example: "'He' + 'll' + 'o' instead of simply 'Hello'"
  },
  {
    name: "Unicode Escape Sequences",
    pattern: /\\u[0-9a-fA-F]{4}/,
    explanation: "These are characters represented by their Unicode code points (\\uXXXX). Instead of using normal letters, the code uses these special codes that represent the same characters but are much harder to read.",
    example: "\\u0048\\u0065\\u006C\\u006C\\u006F instead of 'Hello'"
  },
  {
    name: "Function Wrappers",
    pattern: /function\s*\(\s*\)\s*{\s*return\s*function\s*\(/,
    explanation: "This technique wraps functions inside other functions, creating multiple layers that make the code structure more complex and harder to follow. It's like putting boxes inside boxes.",
    example: "function() { return function(x) { return x+1; }; }"
  },
  {
    name: "Variable Name Obfuscation",
    pattern: /var\s+(_0x[a-f0-9]{4,}|[a-z_]{1,2})\s*=/,
    explanation: "This technique uses meaningless or confusing variable names instead of descriptive ones. This makes it very difficult to understand what the code is doing because the names give no hints about their purpose.",
    example: "var _0x1a2b = 'username' instead of var username = 'username'"
  }
];

export function detectObfuscation(code) {
  const findings = [];
  
  // Check each pattern
  obfuscationPatterns.forEach(pattern => {
    const matches = code.match(pattern.pattern);
    if (matches) {
      // Get the context around the match (a few characters before and after)
      const matchIndex = code.indexOf(matches[0]);
      const start = Math.max(0, matchIndex - 20);
      const end = Math.min(code.length, matchIndex + matches[0].length + 20);
      const context = code.substring(start, end);
      
      // Highlight the matched part
      const highlightedContext = context.replace(
        matches[0], 
        `<span style="background-color: #ffff00; font-weight: bold;">${matches[0]}</span>`
      );
      
      findings.push({
        type: pattern.name,
        explanation: pattern.explanation,
        example: pattern.example,
        context: highlightedContext,
        original: matches[0]
      });
    }
  });
  
  return findings;
}

// Generate explanation steps for the UI
export function generateObfuscationExplanation(code) {
  const findings = detectObfuscation(code);
  
  if (findings.length === 0) {
    return [{
      title: "No Obfuscation Detected",
      content: "This code doesn't appear to use common obfuscation techniques. It might be regular code or use unusual obfuscation methods not in our detection patterns."
    }];
  }
  
  // Group findings by type to avoid repetition
  const groupedFindings = {};
  findings.forEach(finding => {
    if (!groupedFindings[finding.type]) {
      groupedFindings[finding.type] = {
        type: finding.type,
        explanation: finding.explanation,
        example: finding.example,
        instances: []
      };
    }
    groupedFindings[finding.type].instances.push({
      context: finding.context,
      original: finding.original
    });
  });
  
  // Create explanation steps
  const steps = [
    {
      title: "Obfuscation Techniques Found",
      content: `This code uses ${Object.keys(groupedFindings).length} obfuscation technique${Object.keys(groupedFindings).length > 1 ? 's' : ''} to hide its true purpose. Obfuscation makes code deliberately difficult to understand, but we can break it down step by step.`
    }
  ];
  
  // Add a step for each type of obfuscation
  Object.values(groupedFindings).forEach(group => {
    steps.push({
      title: `${group.type} Obfuscation`,
      content: `${group.explanation}

Example: ${group.example}

Found in your code (${group.instances.length} instance${group.instances.length > 1 ? 's' : ''}):

${group.instances.map((instance, i) => `Instance ${i+1}:\n${instance.original}`).join('\n\n')}`
    });
  });
  
  // Add a summary step
  steps.push({
    title: "Obfuscation Summary and Security Implications",
    content: `This code contains ${findings.length} total instance${findings.length > 1 ? 's' : ''} of obfuscation across ${Object.keys(groupedFindings).length} different technique${Object.keys(groupedFindings).length > 1 ? 's' : ''}.

Security Implications:
- Obfuscated code is often used to hide malicious intent
- The presence of ${findings.some(f => f.type === "Eval Function") ? 'eval functions is particularly concerning as they can execute arbitrary code' : 'certain obfuscation techniques may indicate an attempt to hide functionality'}
- Code that deliberately hides its purpose should be treated with caution
- Consider using a sandbox environment if you need to run this code

While obfuscation can sometimes be used for legitimate purposes like protecting intellectual property, it's also commonly used to disguise malicious code. Exercise caution when working with heavily obfuscated code from untrusted sources.`
  });
  
  return steps;
}
