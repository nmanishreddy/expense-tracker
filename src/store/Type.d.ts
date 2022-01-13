import {Transaction} from '../Transaction'

type TransactionState = {
    transactions: Transaction[]
}

type TransactionAction = {
    type: string;
    transaction : Transaction;
}

type DispatchType = (args: TransactionAction) => TransactionAction