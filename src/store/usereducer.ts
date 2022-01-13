import { Transaction } from "../Transaction";
import { TransactionAction, TransactionState } from './Type';
import * as actionType from "./Actiontypes";

const initialTransactions: TransactionState = {
    transactions: [
        {
            id: 1,
            name: 'First Transaction',
            amount: 35,
            category: '2',
        },
        {
            id: 2,
            name: 'Second Transaction',
            amount: 35,
            category: '3',
        },
    ]
}

const transactionReducer = (state: TransactionState = initialTransactions, action: TransactionAction): TransactionState => {
    switch (action.type) {
        case actionType.ADD_TRANSACTION:
            const newTransaction: Transaction = {
                id: Math.random(),
                name: action?.transaction?.name,
                amount: action?.transaction?.amount,
                category: action?.transaction?.category
            }
            return {
                ...state,
                transactions: state.transactions.concat(newTransaction)
            }
        
        case actionType.REMOVE_TRANSACTION:
            const updatedTransactionList = state.transactions.filter(item => item.id !== action?.transaction?.id)
            return {
                ...state,
                transactions: updatedTransactionList
            }

        case actionType.UPDATE_TRANSACTION:
            const updatedTransactionsList = state.transactions.map(transaction => {
                if (transaction.id === action.transaction.id) {
                    return { ...transaction, name: action?.transaction?.name, 
                                      amount: action?.transaction?.amount, 
                                      category: action?.transaction?.category };
                }

                return transaction;
            });

            return {
                ...state,
                transactions: updatedTransactionsList
            }
    }

    return state;
}

export default transactionReducer;