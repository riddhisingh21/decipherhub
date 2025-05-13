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
    pattern: /0x[a-f0-9]{1,4}/i,
    explanation: "These strange-looking numbers starting with '0x' are called hexadecimal numbers. They're just regular numbers written in a different format that computers understand. Developers use them to make code harder to read.",
    example: "0x1A is the same as the number 26 in regular counting"
  },
  {
    name: "Meaningless Variable Names",
    pattern: /var\s+(_0x[a-f0-9]+|[a-z]{1,2})\s*=/,
    explanation: "The code uses short, meaningless variable names like '_0x123abc' or single letters. Normal code uses descriptive names like 'userName' or 'totalPrice'. These random names make it hard to understand what the variables are used for.",
    example: "var _0x1a2b = 'username'; // Instead of var userName = 'username';"
  },
  {
    name: "String Concatenation",
    pattern: /(['"])[^'"]*\1\s*\+\s*(['"])[^'"]*\2/,
    explanation: "The code breaks text into smaller pieces and joins them together with '+' signs. This is done to hide the complete text and make it harder to search for specific phrases in the code.",
    example: "'He' + 'llo' is the same as 'Hello'"
  },
  {
    name: "Eval Function",
    pattern: /eval\s*\(/,
    explanation: "The 'eval' function is a powerful but dangerous JavaScript feature that runs code contained in text. Obfuscated code often uses eval to hide its real purpose until it runs. Security experts consider eval to be risky because it can execute hidden, malicious code.",
    example: "eval('alert(\"Hello\")') runs the code alert(\"Hello\")"
  },
  {
    name: "Self-Executing Function",
    pattern: /^\(function\s*\([^)]*\)\s*{/,
    explanation: "This code is wrapped in what's called a 'self-executing function' - a function that runs immediately when the page loads. This technique hides the code's variables from the rest of the program and makes it harder to understand how it connects to other code.",
    example: "(function() { alert('Hi'); })() runs immediately when loaded"
  },
  {
    name: "String.fromCharCode",
    pattern: /String\.fromCharCode\(/,
    explanation: "String.fromCharCode converts numbers into text characters. Obfuscated code often uses this to hide text by storing it as numbers instead of readable text. Each number represents a single letter or symbol.",
    example: "String.fromCharCode(72, 105) creates the text 'Hi'"
  },
  {
    name: "Encoded Unicode",
    pattern: /\\x[0-9a-f]{2}/i,
    explanation: "These strange codes like \\x41 are called 'escape sequences' and represent text characters. Developers use them to hide readable text in the code. Each code represents a single letter or symbol.",
    example: "\\x48\\x69 is the same as 'Hi'"
  },
  {
    name: "Array Access with Bracket Notation",
    pattern: /\[['"]\w+['"]\]/,
    explanation: "The code uses brackets with text inside ['property'] to access object properties instead of the simpler dot notation (object.property). This makes the code harder to read but doesn't change what it does.",
    example: "user['name'] is the same as user.name"
  }
];

// Analyze code and identify obfuscated parts
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
      content: `
${group.explanation}

Example: ${group.example}

Found in your code (${group.instances.length} instance${group.instances.length > 1 ? 's' : ''}):
${group.instances.map((instance, i) => `
Instance ${i+1}:
${instance.context}
`).join('\n')}
      `
    });
  });
  
  // Add a summary step
  steps.push({
    title: "What This Means",
    content: `
This code uses obfuscation techniques that make it deliberately hard to read. This could be for several reasons:

1. To protect intellectual property (hiding how the code works)
2. To make the file size smaller (some obfuscation techniques reduce file size)
3. To prevent tampering with the code
4. In some cases, to hide malicious intent

While obfuscated code runs exactly the same as normal code, its purpose is hidden behind these techniques. If you didn't write this code yourself or get it from a trusted source, be cautious about running it, especially if it uses eval() or similar functions that can execute hidden code.
    `
  });
  
  return steps;
}