import {useState, useEffect} from 'react'
import api from '../api'
import Chart from '../components/Chart'
import Expense from '../components/Expense'

function Home() {
    const [expenses, setExpenses] = useState([])
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [frequency, setFrequency] = useState("")

    useEffect(() => {
        getExpenses()
    }, [])

    const getExpenses = () => {
        api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const deleteExpense = (id) => {
        api.delete(`api/expenses/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Deleted!")
            else alert("Failed to delete!")
            getExpenses()
        }).catch((err) => alert(err))
        
    }

    const createExpense = (e) => {
        e.preventDefault()
        api.post("/api/expenses/", {amount,title,frequency}).then((res) => {
            if (res.status === 201) alert("Created!")
            else alert("Failed")
            getExpenses()
        }).catch((err) => alert(err))
    }

    return (
        <>
        <div>
            <h2>Expenses</h2>
            {expenses.map((expense) => <Expense expense = {expense} onDelete={deleteExpense} key={expense.id}></Expense>)}
        </div>
        <h2>Create Expense</h2>
        <form onSubmit={createExpense}>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title}/>
            <br />

            <label htmlFor="value">Value:</label>
            <br />
            <input type="text" id="value" name="value" required onChange={(e) => setAmount(e.target.value)} value={amount}/>
            <br />

            <label htmlFor="frequency">Frequency:</label>
            <br />
            <input type="text" id="frequency" name="frequency" required onChange={(e) => setFrequency(e.target.value)} value={frequency}/>

            <br />
            <input type="submit" value="Submit"/>
        </form>

        </>
    )

}

export default Home