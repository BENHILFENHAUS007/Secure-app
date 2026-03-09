export type ParsedType = 'income' | 'expense';

export interface ParsedTransaction {
  type: ParsedType;
  amount: number;
  category: string;
  description: string;
}

const CATEGORY_RULES: Record<string, string[]> = {
  Food: ['lunch', 'dinner', 'breakfast', 'coffee', 'groceries', 'restaurant'],
  Travel: ['uber', 'taxi', 'bus', 'fuel', 'metro', 'flight'],
  Bills: ['rent', 'electricity', 'water', 'internet', 'mobile', 'emi'],
  Health: ['hospital', 'medicine', 'doctor', 'pharmacy'],
  Salary: ['salary', 'bonus', 'paycheck', 'stipend'],
  Shopping: ['amazon', 'flipkart', 'shopping', 'clothes'],
};

export function parseWhatsAppMessage(text: string): ParsedTransaction | null {
  const normalized = text.trim().toLowerCase();
  const type: ParsedType | null = /income|received|credit|earned/.test(normalized)
    ? 'income'
    : /spent|paid|expense|debit/.test(normalized)
      ? 'expense'
      : null;

  const amountMatch = normalized.match(/\b\d+(?:\.\d{1,2})?\b/);
  const amount = amountMatch ? Number(amountMatch[0]) : NaN;

  if (!type || Number.isNaN(amount) || amount <= 0) {
    return null;
  }

  const description = normalized
    .replace(/income|received|credit|earned|spent|paid|expense|debit/gi, '')
    .replace(/\b\d+(?:\.\d{1,2})?\b/g, '')
    .replace(/on|for|at|today|yesterday/gi, '')
    .trim() || 'general';

  const category = Object.entries(CATEGORY_RULES).find(([_, keywords]) =>
    keywords.some((word) => description.includes(word)),
  )?.[0] ?? (type === 'income' ? 'Income' : 'General Expense');

  return {
    type,
    amount,
    category,
    description,
  };
}
