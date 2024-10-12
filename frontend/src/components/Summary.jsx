import React from 'react';
import api from "../api"
import {useState, useEffect} from 'react'

function Summary() {
    const [expenses, setExpenses] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)

    const getExpenses = () => {
      api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const totalExpenses = (expenses) => {
        const newAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(newAmount);
    }

    useEffect(() => {
        getExpenses()
        
    }, [])
    
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