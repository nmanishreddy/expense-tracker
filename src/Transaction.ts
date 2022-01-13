export interface Transaction {
    id: number;

    name: string | undefined;

    // type: string | undefined;

    amount: number | undefined;

    category: string | undefined;


}

export const  transactionType = [
    {categoryName: 'first', id: '1'},
    {categoryName: 'second', id: '2'},
    {categoryName: 'third', id: '3'},
    {categoryName: 'fourth', id: '4'},
    {categoryName: 'fifth', id: '5'}

]