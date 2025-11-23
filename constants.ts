import { SupportedLanguage, ChaosLevel } from './types';

export const LANGUAGE_OPTIONS = [
  { value: SupportedLanguage.JAVA, label: 'Java' },
  { value: SupportedLanguage.C, label: 'C' },
  { value: SupportedLanguage.PYTHON, label: 'Python' },
  { value: SupportedLanguage.JAVASCRIPT, label: 'JavaScript' },
  { value: SupportedLanguage.CPP, label: 'C++' },
  { value: SupportedLanguage.HTML, label: 'HTML' },
  { value: SupportedLanguage.GO, label: 'Go' },
  { value: SupportedLanguage.RUST, label: 'Rust' },
];

export const CHAOS_LEVELS = [
  { 
    value: ChaosLevel.MILD, 
    description: "Adds redundant comments and slight verbosity." 
  },
  { 
    value: ChaosLevel.MESSY, 
    description: "Logic double-negatives (!!), bad naming, excessive wrappers." 
  },
  { 
    value: ChaosLevel.PURE_EVIL, 
    description: "Ternary nesting, bitwise abuse, obfuscated logic, unreadable." 
  },
];

export const CHAOS_FEATURES = [
  { id: 'double_negation', label: 'Double Negation (!!flag)', default: true },
  { id: 'verbose_naming', label: 'Verbose Variables (int valueOfInteger)', default: true },
  { id: 'redundant_math', label: 'Redundant Math ((x * 1) + 0)', default: true },
  { id: 'useless_comments', label: 'Passive Aggressive Comments', default: false },
  { id: 'wrapper_hell', label: 'Wrapper Classes/Functions', default: false },
  { id: 'spaghetti_logic', label: 'Spaghetti If/Else Logic', default: true },
  { id: 'excessive_ternaries', label: 'Pointless Ternary Nesting', default: false },
  { id: 'bitwise_madness', label: 'Bitwise Operator Abuse', default: false },
  { id: 'unicode_abuse', label: 'Misleading Unicode Variables', default: false },
  { id: 'html_abuse', label: 'HTML-Specific Horrors', default: false },
];

export const DEFAULT_CODE_SNIPPETS: Record<SupportedLanguage, string> = {
  [SupportedLanguage.JAVA]: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}`,
  [SupportedLanguage.C]: `#include <stdio.h>

int main() {
    int flag = 1;
    if (flag) {
        printf("Hello World");
    }
    return 0;
}`,
  [SupportedLanguage.PYTHON]: `def is_even(n):
    return n % 2 == 0

print(is_even(10))`,
  [SupportedLanguage.JAVASCRIPT]: `const checkAuth = (user) => {
  if (user.isAdmin) {
    return true;
  }
  return false;
};`,
  [SupportedLanguage.CPP]: `bool isValid(int n) {
    return n > 0 && n < 100;
}`,
  [SupportedLanguage.HTML]: `<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
  [SupportedLanguage.GO]: `func main() {
    fmt.Println("Start")
}`,
  [SupportedLanguage.RUST]: `fn main() {
    let x = 5;
    println!("x is: {}", x);
}`
};