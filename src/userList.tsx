import { useEffect, useState } from "react";

import { Transaction } from "./Transaction";


type Props = {
    transactionList: Transaction[] | undefined,
    removeTransaction: (arg: Transaction) => void,
    editTransaction: (arg: Transaction) => void
}

const TransactionList = (props: Props) => {
    
    const [transactionList, setTransactionList] = useState<Transaction[] | undefined>(props.transactionList);

    useEffect(() => {
        setTransactionList(props.transactionList);
    }, [props.transactionList])

    const handleEditUser = (selecteduser: Transaction) => {
        props.editTransaction(selecteduser);
    }

    const handleDeleteUser = (selecteduser: Transaction) => {
        props.removeTransaction(selecteduser);
    }

    return (
        <>
        <ul >
            {transactionList &&
                transactionList.map(transaction => (
                    <li key={transaction.id}>
                        <div >
                            <span>{transaction.name}</span>
                            <span>{transaction.amount}</span>

                            <div >
                                { 
                                    <button onClick={() => handleEditUser(transaction)}>Edit</button>
                                }
                                <button  onClick={() => handleDeleteUser(transaction)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
        </>
    );
}

export default TransactionList;