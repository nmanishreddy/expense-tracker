import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Transaction, transactionType } from './Transaction';

type Props = {
    transactionDetails: Transaction,
    callBackTransaction: (arg: Transaction) => void
}

const TransactionForm = (props: Props) => {

    const useFormField = (transaction: Transaction) => {
        const [formFields, setFormFields] = useState<Transaction>(transaction);

        const createChangeHandler = (key: keyof Transaction) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const value = e.target.value;
            setFormFields((prev: Transaction) => ({ ...prev, [key]: value }));
        }

        const resetFormHandler = () => {
            for (const [key] of Object.entries(transaction)) {
                setFormFields((prev: Transaction) => ({ ...prev, [key]: (key !== 'id') ? '' : 0 }));
            }
        }

        if (transaction.id !== 0) {
            
        }

        return { formFields, setFormFields, createChangeHandler, resetFormHandler };
    }

    const initialUser: Transaction | undefined = props.transactionDetails;
    let { formFields, setFormFields, createChangeHandler, resetFormHandler } = useFormField(initialUser);

    useEffect(() => {
        if (props.transactionDetails.id) {
            setFormFields(props.transactionDetails);
        }
    }, [props.transactionDetails])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formFields.category) {
            formFields.category =  transactionType[0].id ?? formFields.category;
        }

        props.callBackTransaction(formFields);
        resetFormHandler();
    }

    const handleReset = (e: FormEvent) => {
        e.preventDefault();
        resetFormHandler();
    }

    return (
        <div  >
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="row">
                    <label className="col-3" htmlFor='name' >Name</label>
                    <input className="col-6" type="text" value={formFields.name} onChange={createChangeHandler("name")}></input>
                </div>

                <div className="row">
                    <label className="col-3" htmlFor='role'>Role</label>
                    <select className="col-6" value={formFields.category} onChange={createChangeHandler("category")}>
                        {
                            transactionType.map(item => (
                                <option value={item.id} key={item.id}>{item.categoryName}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label className="col-3" htmlFor='amount'>Amount</label>
                    <input className="col-6" type="text" value={formFields.amount} onChange={createChangeHandler("amount")}></input>
                </div>

                <div className="text-center">
                    <button type="reset" className="btn btn-danger">Reset</button>
                    <input type="submit" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
    );
}

export default TransactionForm;