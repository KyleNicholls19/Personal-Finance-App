import React from 'react';
import api from "../api"
import {useState, useEffect} from 'react'

function Summary({expenses}) {
    const [totalAmount,setTotalAmount] = useState(0)


    const totalExpenses = (expenses) => {
        const newAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(newAmount);
    }
    
    useEffect(() => {
        totalExpenses(expenses)
    }, [expenses])

    return (
        <>
            <h1>Summary</h1>
            {totalAmount}           
        </>
    )

}

export default Summary