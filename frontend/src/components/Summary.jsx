import React from 'react';
import api from "../api"
import {useState, useEffect} from 'react'

function Summary() {
    const [expenses, setExpenses] = useState([])
    let totalAmount = 0

    const getExpenses = () => {
      api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const totalExpenses = () => {
        const expenseAmounts = expenses.map((expense) => expense.amount)

        expenseAmounts.forEach((item) => {
            totalAmount += item
        })
    }

    useEffect(() => {
        getExpenses()
        totalExpenses()
      }, [])

    console.log(totalAmount)

    return (
        <>
            <h1>Summary</h1>
            {totalAmount}           
        </>
    )

}

export default Summary