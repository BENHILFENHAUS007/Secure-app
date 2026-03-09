import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface CreateTransactionInput {
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  source: 'whatsapp' | 'manual';
}

@Injectable()
export class TransactionsService {
  private readonly transactions: Array<CreateTransactionInput & { id: string; createdAt: string }> = [];

  async create(input: CreateTransactionInput) {
    const transaction = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
    this.transactions.push(transaction);
    return transaction;
  }

  async findAll(userId: string, query: Record<string, string>) {
    return this.transactions.filter((t) => t.userId === userId).filter((t) => {
      if (query.type && t.type !== query.type) return false;
      if (query.category && t.category !== query.category) return false;
      return true;
    });
  }

  async update(id: string, update: Partial<CreateTransactionInput>) {
    const txn = this.transactions.find((t) => t.id === id);
    if (!txn) return null;
    Object.assign(txn, update);
    return txn;
  }

  async remove(id: string) {
    const idx = this.transactions.findIndex((t) => t.id === id);
    if (idx >= 0) this.transactions.splice(idx, 1);
    return { deleted: idx >= 0 };
  }
}
