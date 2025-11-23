import { TransformationConfig, SupportedLanguage } from '../types';

// Helper for unicode abuse
const homoglyphs: { [key: string]: string } = {
  'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о', 'p': 'р', 'x': 'х', 'y': 'у',
  'i': 'і', 'j': 'ј',
  'A': 'А', 'B': 'В', 'E': 'Е', 'H': 'Н', 'K': 'К', 'M': 'М', 'O': 'О', 'P': 'Р', 'C': 'С', 'T': 'Т', 'X': 'Х'
};
const KEYWORDS = new Set(['if', 'else', 'while', 'for', 'return', 'int', 'bool', 'const', 'let', 'var', 'def', 'class', 'public', 'private', 'static', 'void', 'function', 'import', 'from', 'include', 'main', 'true', 'false', 'null', 'new', 'System', 'out', 'println', 'String', 'Object']);

const applyUnicodeAbuse = (code: string): string => {
    return code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
        if (KEYWORDS.has(match) || Math.random() > 0.3) return match;
        const chars = match.split('');
        const indexToReplace = Math.floor(Math.random() * chars.length);
        const charToReplace = chars[indexToReplace];
        if (homoglyphs[charToReplace]) {
            chars[indexToReplace] = homoglyphs[charToReplace];
        }
        return chars.join('');
    });
};

const applyDoubleNegation = (code: string, lang: SupportedLanguage): string => {
    if (lang === SupportedLanguage.PYTHON) {
        return code.replace(/if\s+(.*?):/g, 'if not not ($1):');
    }
    return code.replace(/if\s*\((.+?)\)/g, 'if (!!($1))');
};

const applyAggressiveNumberObfuscation = (code: string): string => {
    const key = Math.floor(Math.random() * 0xFFFFF);
    return code.replace(/\b(\d+)\b/g, (match, numberStr) => {
        const num = parseInt(numberStr, 10);
        if (isNaN(num) || num > 0xFFFF || Math.random() > 0.7) return match;
        const obfuscated = num ^ key;
        return `(${key} ^ ${obfuscated})`;
    });
};

const applyExpressionObfuscation = (code: string): string => {
    let output = code;
    output = output.replace(/(\w+)\s*\+\s*(\w+)/g, '$1 - (-$2)');
    output = output.replace(/(\w+)\s*==\s*(\w+)/g, '(($1 ^ $2) == 0)');
    output = output.replace(/(\w+)\s*\*\s*2/g, '$1 << 1');
    output = output.replace(/(\w+)\s*\/\s*2/g, '$1 >> 1');
    output = output.replace(/(\w+)\s*&&\s*(\w+)/g, '!(!$1 || !$2)');
    return applyAggressiveNumberObfuscation(output);
};

const mangledCache = new Map<string, string>();
const generateMangledName = () => {
    const chars = ['_', 'O', '0'];
    let name = '_';
    for (let i = 0; i < 5 + Math.floor(Math.random() * 5); i++) {
        name += chars[Math.floor(Math.random() * chars.length)];
    }
    if(mangledCache.has(name)) return generateMangledName();
    return name;
};

const applyMangledNaming = (code: string): string => {
    mangledCache.clear();
    const commonVarsRegex = /\b(i|j|k|n|x|y|z|a|b|c|val|res|sum|tmp|flag|user|isAdmin|checkAuth|add|Calculator|is_even|n|message|main|isValid)\b/g;
    return code.replace(commonVarsRegex, (match) => {
        if (KEYWORDS.has(match)) return match;
        if (!mangledCache.has(match)) {
            mangledCache.set(match, generateMangledName());
        }
        return mangledCache.get(match)!;
    });
};


const applyUselessComments = (code: string): string => {
    const comments = [
        '// It works on my machine', '// Please do not touch this code', '// When I wrote this, only God and I understood what I was doing. Now, only God knows.', '// Magic number, do not change', '// As per the requirements', '// TODO: Refactor this later (never)', '// This is a workaround for a bug that does not exist',
    ];
    const lines = code.split('\n');
    if (lines.length > 1) {
        const randomIndex = Math.floor(Math.random() * lines.length);
        if (lines[randomIndex].trim() !== '') {
            const indent = lines[randomIndex].match(/^\s*/)?.[0] || '';
            lines.splice(randomIndex, 0, indent + comments[Math.floor(Math.random() * comments.length)]);
        }
    }
    return lines.join('\n');
};

const applyHtmlAbuse = (code: string): string => {
    let output = code;
    output = output.replace(/<h1>(.*?)<\/h1>/gi, '<center><font size="7" color="red"><b><i><u>$1</u></i></b></font></center>');
    output = output.replace(/<p>(.*?)<\/p>/gi, '<div>&nbsp;&nbsp;&nbsp;&nbsp;<font face="Comic Sans MS" size="3">$1</font></div>');
    output = `<table border="1" cellpadding="10" cellspacing="5" width="100%"><tr><td>\n${output}\n</td></tr></table>`;
    output = output.replace(/<body>/i, '<body><div id="wrapper_one"><div id="wrapper_two">');
    output = output.replace(/<\/body>/i, '</div></div></body>');
    return output;
};

const applySpaghettiLogic = (code: string): string => {
    return code.replace(/return\s+(.*?)\s*==\s*(.*?);/g, 'if (($1) == ($2)) { return true; } else { return false; }');
};

const applyExcessiveTernaries = (code: string, lang: SupportedLanguage): string => {
    // Language-specific boolean literals and operators
    const [TRUE, FALSE, AND, OR, TERNARY_BUILDER] = (() => {
        switch(lang) {
            case SupportedLanguage.PYTHON: 
                // Note: Python ternary needs careful parenthesizing for nesting
                return ['True', 'False', ' and ', ' or ', (c, t, f) => `(${t}) if (${c}) else (${f})`];
            case SupportedLanguage.C: 
                return ['1', '0', ' && ', ' || ', (c, t, f) => `(${c}) ? (${t}) : (${f})`];
            default: // JS, Java, C++, etc.
                return ['true', 'false', ' && ', ' || ', (c, t, f) => `(${c}) ? (${t}) : (${f})`];
        }
    })();
    
    let output = code;

    // Rule 1: Convert simple if/else return blocks to a ternary
    if (lang !== SupportedLanguage.PYTHON) {
        const simpleIfElseReturnRegex = /if\s*\((.*?)\)\s*\{\s*return\s+(.*?);\s*\}\s*else\s*\{\s*return\s+(.*?);\s*\}/gs;
        output = output.replace(simpleIfElseReturnRegex, (match, c, t, f) => `return ${TERNARY_BUILDER(c.trim(), t.trim(), f.trim())};`);
    } else {
        const pyIfElseReturnRegex = /if\s+(.*?):\s*return\s+(.*?)\s*else:\s*return\s+(.*)/gs;
        output = output.replace(pyIfElseReturnRegex, (match, c, t, f) => `return ${TERNARY_BUILDER(c.trim(), t.trim(), f.trim())}`);
    }

    // Rule 2: Convert boolean expressions in return statements into nested ternaries
    const returnRegex = /return\s+(.+?);/g;
    const pyReturnRegex = /return\s+(.+)/g;
    
    output = output.replace(lang === SupportedLanguage.PYTHON ? pyReturnRegex : returnRegex, (match, expression) => {
        const expr = expression.trim();

        // Heuristics to avoid breaking complex code:
        // - Already a ternary
        // - Is a function call
        // - Looks like object/struct initialization
        // - Is very long
        if (expr.includes('?') || (lang === SupportedLanguage.PYTHON && expr.includes(' if ')) || /\w+\(.*\)/.test(expr) || expr.includes('{') || expr.length > 80) {
            return match;
        }

        const hasAnd = expr.includes(AND.trim());
        const hasOr = expr.includes(OR.trim());

        let newExpr = expr;

        if (hasAnd && !hasOr) { // Pure AND chain
            const parts = expr.split(AND);
            const last = TERNARY_BUILDER(parts[parts.length - 1], TRUE, FALSE);
            newExpr = parts.slice(0, -1).reduceRight((acc, part) => {
                return TERNARY_BUILDER(part, acc, FALSE);
            }, last);
            return `return ${newExpr}${lang === SupportedLanguage.PYTHON ? '' : ';'}`;
        }

        if (hasOr && !hasAnd) { // Pure OR chain
            const parts = expr.split(OR);
            const last = TERNARY_BUILDER(parts[parts.length - 1], TRUE, FALSE);
            newExpr = parts.slice(0, -1).reduceRight((acc, part) => {
                return TERNARY_BUILDER(part, TRUE, acc);
            }, last);
            return `return ${newExpr}${lang === SupportedLanguage.PYTHON ? '' : ';'}`;
        }
        
        // Rule 3: For very simple boolean expressions, wrap them in a ternary
        // e.g., `return isValid;` -> `return isValid ? true : false;`
        if (!hasAnd && !hasOr) {
             newExpr = TERNARY_BUILDER(expr, TRUE, FALSE);
             return `return ${newExpr}${lang === SupportedLanguage.PYTHON ? '' : ';'}`;
        }

        return match; // Return original if complex (e.g., contains both AND and OR)
    });

    return output;
};


const applyWrapperHell = (code: string, lang: SupportedLanguage): string => {
    if (lang === SupportedLanguage.JAVA || lang === SupportedLanguage.CPP) {
        return code.replace(/return\s+(.*?);/g, (match, returnValue) => {
            if (returnValue.includes('new') || returnValue.includes('?') || returnValue.length > 50) return match;
            if (lang === SupportedLanguage.JAVA)
                return `Object[] tempWrapper = new Object[]{(Object)(${returnValue})};\n        return (${returnValue}).getClass().cast(tempWrapper[0]);`;
            return `auto tempWrapper = new std::vector<decltype(${returnValue})>({${returnValue}});\n auto val = (*tempWrapper)[0]; delete tempWrapper; return val;`;
        });
    }
     if (lang === SupportedLanguage.JAVASCRIPT) {
        return code.replace(/return\s+(.*?);/g, 'return [($1)][0];');
    }
    return code;
};

const applyPointlessControlFlow = (code: string, lang: SupportedLanguage): string => {
    if (lang === SupportedLanguage.PYTHON) return code;
    const firstBrace = code.indexOf('{');
    const lastBrace = code.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
        const body = code.substring(firstBrace + 1, lastBrace);
        if (body.length > 1000 || body.match(/\b(class|public|private|static)\b/)) return code;
        const indent = '    ';
        let newBody = body.split('\n').map(line => indent + line).join('\n');
        const wrappedBody = `\n${indent}do {\n${newBody}\n${indent}} while ((1 - 1) != 0);\n`;
        return code.substring(0, firstBrace + 1) + wrappedBody + code.substring(lastBrace);
    }
    return code;
};

const applyStringObfuscation = (code: string, lang: SupportedLanguage): string => {
    const replacer = (match: string, strContent: string): string => {
        const charCodes = strContent.split('').map(c => c.charCodeAt(0)).join(', ');
        switch (lang) {
            case SupportedLanguage.JAVASCRIPT:
                return `String.fromCharCode(${charCodes})`;
            case SupportedLanguage.JAVA:
                 return `new String(new int[] {${charCodes}}, 0, ${strContent.length})`;
            case SupportedLanguage.PYTHON:
                return `"".join(map(chr, [${charCodes}]))`;
            case SupportedLanguage.C:
            case SupportedLanguage.CPP:
                 return `(char[]){${charCodes}, 0}`; // Compound literal
            default:
                return match;
        }
    };
    return code.replace(/"((?:\\.|[^"\\])*?)"/g, replacer);
};

const applyDeadCodeInjection = (code: string, lang: SupportedLanguage): string => {
    const lines = code.split('\n');
    if (lines.length < 2) return code;

    const injectionIndex = Math.floor(Math.random() * (lines.length - 1)) + 1;
    const originalLine = lines[injectionIndex-1]
    if (!originalLine || originalLine.trim() === '') return code;

    const indent = originalLine.match(/^\s*/)?.[0] || '';
    let deadCode = '';
    switch(lang) {
        case SupportedLanguage.JAVA:
        case SupportedLanguage.C:
        case SupportedLanguage.CPP:
             deadCode = `if((System.currentTimeMillis() * 0) != 0) { int x = 5; x++; }`;
             if (lang === SupportedLanguage.C || lang === SupportedLanguage.CPP) {
                deadCode = `if(0) { volatile int _dead = 1; }`;
             }
             break;
        case SupportedLanguage.JAVASCRIPT:
            deadCode = `let _dead${Date.now()} = 0; if (!!_dead${Date.now()} && _dead${Date.now()} > 1) { console.log("unreachable"); }`
            break;
        case SupportedLanguage.PYTHON:
            deadCode = `if False:\n${indent}    pass`;
            break;
    }
    if (deadCode) {
        lines.splice(injectionIndex, 0, indent + deadCode);
    }
    return lines.join('\n');
};

export const obfuscateCode = (
  code: string,
  config: TransformationConfig
): string => {
  let output = code;

  if (config.language === SupportedLanguage.HTML) {
      if (config.features.includes('html_abuse')) output = applyHtmlAbuse(output);
      if (config.features.includes('useless_comments')) output = applyUselessComments(output);
      return output;
  }

  const pipeline: { id: string, func: (code: string, lang: SupportedLanguage) => string }[] = [
      { id: 'mangled_naming', func: applyMangledNaming },
      { id: 'string_obfuscation', func: applyStringObfuscation },
      { id: 'unicode_abuse', func: applyUnicodeAbuse },
      { id: 'wrapper_hell', func: applyWrapperHell },
      { id: 'pointless_control_flow', func: applyPointlessControlFlow },
      { id: 'spaghetti_logic', func: applySpaghettiLogic },
      { id: 'excessive_ternaries', func: applyExcessiveTernaries },
      { id: 'double_negation', func: applyDoubleNegation },
      { id: 'expression_obfuscation', func: applyExpressionObfuscation },
      { id: 'dead_code_injection', func: applyDeadCodeInjection },
      { id: 'useless_comments', func: applyUselessComments },
  ];

  for (const step of pipeline) {
      if (config.features.includes(step.id)) {
          output = step.func(output, config.language);
      }
  }
  
  return output;
};
