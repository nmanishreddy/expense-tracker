// import React from "react";
// import TransactionForm from "./transactionForm";

// import TransactionList1 from "./components/transactionList";
// import { Transaction } from "./Transaction";
// import { useState } from "react";
// import { TransactionState } from "./store/Type";
// import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addTransaction } from "./store/ActionCreator";

// function App() {
//   const dispatch = useDispatch()
//   const transactions = useSelector<
//     TransactionState,
//     TransactionState["transactions"]
//   >((state) => state.transactions);
//   const defaultTransaction: Transaction = {
//     id: 0,
//     name: "",
//     amount: 0,
//     category: "",
//   };

//   const [transaction, setTransaction] =   useState<Transaction>(defaultTransaction);

//   const saveTransactionDetails = (transaction: Transaction) => {
//             dispatch(addTransaction)
//   }
  
//   console.log(transactions);
//   return (
//     <div className="App">
//       <h1>Expense Tracker</h1>
//       <TransactionList1 />
//       <TransactionForm
//         transactionDetails={transaction}
//         callBackTransaction={saveTransactionDetails}
//       />
//     </div>
//   );
// }

// export default App;

import TransactionForm from "./transactionForm";
import { Transaction } from "./Transaction";
import { useCallback, useEffect, useState } from "react";
import TransactionList from "./userList";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TransactionState } from "./store/Type";
import { addTransaction, removeTransaction, updateTransaction } from "./store/ActionCreator";

const Dashboard = () => {
    const defaultTransaction: Transaction = {
        id: 0,
        name: '',
        amount: 0,
        category: '',
    }

    const [transaction, setTransaction] = useState<Transaction>(defaultTransaction);

    /**
     * User add / remove / update operations
     */

    const saveTransactionDetails = (transactionDetails: Transaction) => {
        if (!transactionDetails.name || !transactionDetails.category) {
            return;
        }

        // using react redux
        if (transactionDetails.id !== 0) {
            updateUserInStore(transactionDetails);
        } else {
            addUserToStore(transactionDetails);
        }
    }

    const updateTransactionDetails = (transactionDetails: Transaction) => {
        setTransaction((transaction: Transaction) => transaction = transactionDetails);
    }

    const removeTransactionDetails = (transactionDetails: Transaction) => {
        // using react redux
        deleteUserFromStore(transactionDetails);
    }

    /**
     * Redux implementation
     */
    const transactionsListArray: Transaction[] = useSelector((state: TransactionState) => state.transactions, shallowEqual);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>(transactionsListArray);

    const dispatch: Dispatch<any> = useDispatch();

    // redux operations
    const addUserToStore: any = useCallback(
        (transaction: Transaction) => dispatch(addTransaction),
        [dispatch]
    );

    const updateUserInStore: any = useCallback(
        (transaction: Transaction) => dispatch(updateTransaction),
        [dispatch]
    )

    const deleteUserFromStore: any = useCallback(
        (transaction: Transaction) => dispatch(removeTransaction),
        [dispatch]
    )

    useEffect(() => {
        setTransactionsList(transactionsListArray);
    }, [transactionsListArray])

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col col-md-8">
                        <div className="text-center">Using Redux Store Mechanisam</div>
                        <TransactionForm transactionDetails={transaction} callBackTransaction={saveTransactionDetails}/>
                        <hr></hr>
                        <p className="text-center">User List</p>
                        <TransactionList transactionList={transactionsList} editTransaction={updateTransactionDetails} removeTransaction={removeTransactionDetails}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
