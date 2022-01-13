import { Transaction } from "../Transaction";
import { DispatchType, TransactionAction } from "./Type";
import * as actionTypes from "./Actiontypes";

export const addTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.ADD_TRANSACTION,
        transaction
    }
    return performRequest(action);
}

export const removeTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.REMOVE_TRANSACTION,
        transaction
    }

    return performRequest(action);
}

export const updateTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.UPDATE_TRANSACTION,
        transaction
    }

    return performRequest(action);
}

const performRequest = (action: TransactionAction) => {
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}