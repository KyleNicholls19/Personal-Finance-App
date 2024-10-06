import React from 'react'

function Expense({expense,onDelete}) {
    const formattedDate = new Date(expense.created_at).toLocaleDateString("en-US")

    return (
        <div>
            <p>{expense.title}</p>
            <p>{expense.amount}</p>
            <p>{expense.frequency}</p>
            <p>{formattedDate}</p>
            <button onClick={() => onDelete(expense.id)}>Delete</button>
        </div>
    )
}

export default Expense