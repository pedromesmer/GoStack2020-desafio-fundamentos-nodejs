import { response } from 'express';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllData {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllData {
    // TODO
    const transactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactions;
  }

  public getBalance(): Balance {
    // TODO

    let income = 0;
    let outcome = 0;

    this.transactions.filter(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    // TODO

    const transaction = new Transaction({ type, value, title });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
