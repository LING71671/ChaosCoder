import { SupportedLanguage, ChaosLevel } from './types';

export const LANGUAGE_OPTIONS = [
  { value: SupportedLanguage.JAVA, label: 'Java' },
  { value: SupportedLanguage.JAVASCRIPT, label: 'JavaScript' },
  { value: SupportedLanguage.TYPESCRIPT, label: 'TypeScript' },
  { value: SupportedLanguage.PYTHON, label: 'Python' },
  { value: SupportedLanguage.C, label: 'C' },
  { value: SupportedLanguage.CPP, label: 'C++' },
  { value: SupportedLanguage.CSHARP, label: 'C#' },
  { value: SupportedLanguage.PHP, label: 'PHP' },
  { value: SupportedLanguage.SWIFT, label: 'Swift' },
  { value: SupportedLanguage.GO, label: 'Go' },
  { value: SupportedLanguage.RUST, label: 'Rust' },
  { value: SupportedLanguage.HTML, label: 'HTML' },
];

export const CHAOS_LEVELS = [
  { value: ChaosLevel.MILD },
  { value: ChaosLevel.MESSY },
  { value: ChaosLevel.PURE_EVIL },
];

export const CHAOS_FEATURES = [
  { id: 'mangled_naming', default: true },
  { id: 'string_obfuscation', default: true },
  { id: 'recursive_insanity', default: false },
  { id: 'unicode_abuse', default: false },
  { id: 'wrapper_hell', default: true },
  { id: 'pointless_control_flow', default: true },
  { id: 'spaghetti_logic', default: true },
  { id: 'excessive_ternaries', default: true },
  { id: 'double_negation', default: true },
  { id: 'expression_obfuscation', default: true },
  { id: 'dead_code_injection', default: true },
  { id: 'useless_comments', default: true },
  { id: 'gibberish_comments', default: false },
  { id: 'html_abuse', default: true },
];

export const DEFAULT_CODE_SNIPPETS: Record<SupportedLanguage, string> = {
  [SupportedLanguage.JAVA]: `public class Calculator {
    public int add(int a, int b) {
        String message = "Calculating...";
        for (int i = 0; i < 5; i++) {
           System.out.println(i);
        }
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
  [SupportedLanguage.PYTHON]: `def count_to_five():
    for i in range(5):
        print(i)

count_to_five()`,
  [SupportedLanguage.JAVASCRIPT]: `const checkAuth = (user) => {
  if (user.isAdmin) {
    for (let i = 0; i < 3; i++) {
        console.log("Admin check passed");
    }
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
}`,
 [SupportedLanguage.CSHARP]: `public class Greeter
{
    public void SayHello(string name)
    {
        Console.WriteLine($"Hello, {name}!");
    }
}`,
 [SupportedLanguage.PHP]: `<?php
function check_user($username) {
  if ($username == "admin") {
    return true;
  } else {
    return false;
  }
}
?>`,
 [SupportedLanguage.SWIFT]: `func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}`,
 [SupportedLanguage.TYPESCRIPT]: `interface User {
  name: string;
  id: number;
}

function getUserName(user: User): string {
  return user.name;
}`
};