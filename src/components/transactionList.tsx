import React, { ChangeEvent } from "react";

import { useSelector , useDispatch} from "react-redux";
import { TransactionState } from "../store/Type";

import { removeTransaction } from "../store/ActionCreator";
import { Transaction } from "../Transaction";


const TransactionList1: React.FC = () => {
    const transactions = useSelector<TransactionState, TransactionState['transactions']>(state => state.transactions) 
    const dispatch = useDispatch()
    
    
    const deleteHandler = (item:Transaction) => {
      dispatch(removeTransaction(item))
    }
  return (
    <div>
      <h2>current balance</h2>
      <h2>Transaction List</h2>
      {transactions.map(item => <div key={item.id}><span>{`${item.name} : ${item.amount}`}</span> </div>)}
      {/* <button onClick={() => setTransactions(prevTransactions => [{
          title: 'Electronics', price: 50, id: 'EC'
      }, ...prevTransactions])}>Add Transaction</button>  */}

    </div>
  );
};

export default TransactionList1;