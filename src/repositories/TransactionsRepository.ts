import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (!this.transactions.length) {
      return { income: 0, outcome: 0, total: 0 };
    }

    const { income, outcome } = this.transactions.reduce(
      (accumulator, currentValue: Transaction) => {
        switch (currentValue.type) {
          case 'income':
            accumulator.income += currentValue.value;
            break;

          case 'outcome':
            accumulator.outcome += currentValue.value;
            break;

          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
