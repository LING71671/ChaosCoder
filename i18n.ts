export const translations = {
  en: {
    header: {
      subtitle: 'v2.3.0 // Structural Chaos',
    },
    controls: {
      languageLabel: 'Target Language',
      chaosLevelLabel: 'Toxicity Level',
      featuresLabel: 'Applied Annoyances',
      buttonIdle: 'Ruinate Code',
      buttonGenerating: 'Ruining...',
    },
    levels: {
      'Mildly Annoying': {
        title: 'Mildly Annoying',
        description: 'Adds redundant comments and slight verbosity.',
      },
      'Disgusting': {
        title: 'Disgusting',
        description: 'Logic double-negatives (!!), bad naming, excessive wrappers.',
      },
      'Anti-Human': {
        title: 'Anti-Human',
        description: 'Ternary nesting, bitwise abuse, obfuscated logic, unreadable.',
      },
    },
    features: {
      mangled_naming: 'Mangled Naming (_O0_O_)',
      string_obfuscation: 'String Literal Obfuscation',
      recursive_insanity: 'Recursive Insanity (anti-loop)',
      unicode_abuse: 'Misleading Unicode Variables',
      wrapper_hell: 'Wrapper Hell (pointless objects/arrays)',
      pointless_control_flow: 'Pointless Loops & Blocks',
      spaghetti_logic: 'Spaghetti If/Else Logic',
      excessive_ternaries: 'Unnecessary Ternary Expressions',
      double_negation: 'Double Negation (!!flag)',
      expression_obfuscation: 'Expression Obfuscation (Bitwise/Math)',
      dead_code_injection: 'Dead Code Injection',
      useless_comments: 'Passive Aggressive Comments',
      gibberish_comments: 'Gibberish Comments (Adds Noise)',
      html_abuse: 'HTML-Specific Horrors',
      property_obfuscation: 'Property Obfuscation (obj["prop"])',
      prototype_mangling: 'Prototype Mangling (anti-class)',
      control_flow_flattening: 'Control Flow Flattening (while/switch)',
    },
    editor: {
      cleanInputLabel: 'Clean Input',
      chaoticOutputLabel: 'Chaotic Output',
      inputPlaceholder: 'Paste your clean code here...',
      outputPlaceholder: 'Waiting for chaos...',
    },
  },
  zh: {
    header: {
      subtitle: 'v2.3.0 // 结构性混乱',
    },
    controls: {
      languageLabel: '目标语言',
      chaosLevelLabel: '混乱等级',
      featuresLabel: '启用的恶心功能',
      buttonIdle: '代码毁灭',
      buttonGenerating: '毁灭中...',
    },
    levels: {
      'Mildly Annoying': {
        title: '轻度恶心',
        description: '添加多余的注释和轻微的冗长代码。',
      },
      'Disgusting': {
        title: '令人作呕',
        description: '逻辑双重否定(!!), 糟糕命名, 过度包装。',
      },
      'Anti-Human': {
        title: '反人类',
        description: '三元运算符嵌套, 滥用位运算, 逻辑混淆, 难以阅读。',
      },
    },
    features: {
      mangled_naming: '混乱命名 (_O0_O_)',
      string_obfuscation: '字符串字面量混淆',
      recursive_insanity: '递归疯狂 (反循环)',
      unicode_abuse: '误导性Unicode变量',
      wrapper_hell: '包装地狱 (无意义的对象/数组)',
      pointless_control_flow: '无意义的循环和代码块',
      spaghetti_logic: '面条式 If/Else 逻辑',
      excessive_ternaries: '不必要的三元表达式',
      double_negation: '双重否定 (!!flag)',
      expression_obfuscation: '表达式混淆 (位运算/数学)',
      dead_code_injection: '注入无用代码',
      useless_comments: '阴阳怪气的注释',
      gibberish_comments: '废话注释 (增加噪音)',
      html_abuse: 'HTML 特有的恐怖操作',
      property_obfuscation: '属性混淆 (obj["prop"])',
      prototype_mangling: '原型混淆 (反-class)',
      control_flow_flattening: '控制流扁平化 (while/switch)',
    },
    editor: {
      cleanInputLabel: '清晰输入',
      chaoticOutputLabel: '混乱输出',
      inputPlaceholder: '在此处粘贴您的干净代码...',
      outputPlaceholder: '等待混乱降临...',
    },
  },
};

export type Language = keyof typeof translations;