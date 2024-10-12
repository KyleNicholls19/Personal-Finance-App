import React from 'react'

function Expense({expense,onDelete}) {
    const formattedDate = new Date(expense.created_at).toISOString().split("T")[0]

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