
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/ActionCreator";
import { Transaction } from "../Transaction";


const TransactionForm: React.FC = () => {

    const dispatch = useDispatch()

    const [transaction, setTransaction] = useState<Transaction>({
        id:0,
        name:'',
        amount:0,
        category:''
    })
    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setTransaction(prev => {
        (prev as any)[name]= value;
        const newValue = {...prev}
        return newValue
    })
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addTransaction(transaction))
        console.log(transaction)
    }
    return(
        <>
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="Title" name='title' value={transaction.name} onChange={handleChange}/>
            <input type='number' placeholder="Amount" name='price'  value={transaction.amount} onChange={handleChange}/>
            <input type='text' placeholder="id" name='id'  value={transaction.id} onChange={handleChange}/>
            <button>Add Transaction</button>
        </form>
        </>
    )
}

export default TransactionForm;