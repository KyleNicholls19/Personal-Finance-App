import React from 'react';
import api from "../api"
import {useState, useEffect} from 'react'

function Summary() {
    const [expenses, setExpenses] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)

    const getExpenses = () => {
      api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const totalExpenses = () => {
        let newAmount = 0;
        const expenseAmounts = expenses.map((expense) => expense.amount)

        expenseAmounts.forEach((item) => {
            newAmount += item
        })
        setTotalAmount(totalAmount + newAmount)
    }

    useEffect(() => {
        getExpenses()
        totalExpenses()

      }, [])



    return (
        <>
            <h1>Summary</h1>
            {totalAmount}           
        </>
    )

}

export default Summary