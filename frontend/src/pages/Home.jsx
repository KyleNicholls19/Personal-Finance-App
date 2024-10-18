import {useState, useEffect} from 'react'
import api from '../api'
import Chart from '../components/Chart'
import Expense from '../components/Expense'
import Summary from '../components/Summary'

function Home() {
    const [expenses, setExpenses] = useState([])
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [frequency, setFrequency] = useState("")
    const [created_at, setCreatedAt] = useState(new Date().toISOString().split("T")[0])

    useEffect(() => {
        getExpenses()
    }, [])

    const getExpenses = () => {
        api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const resetForm = () => {
        setTitle("")
        setAmount(0)
        setFrequency("")
        setCreatedAt(new Date().toISOString().split("T")[0])
    };

    const deleteExpense = (id) => {
        api.delete(`api/expenses/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Deleted!")
            else alert("Failed to delete!")
            setExpenses(expenses.filter((expense) => expense.id !== id))
        }).catch((err) => alert(err))
        
    }

    const createExpense = (e) => {
        e.preventDefault()
        api.post("/api/expenses/", {amount,title,frequency,created_at}).then((res) => {
            if (res.status === 201) alert("Created!")
            else alert("Failed")
            setExpenses([...expenses, res.data])
            resetForm()
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
            <select name="frequency" id="frequency" required onChange={(e) => setFrequency(e.target.value)} value={frequency}>
                <option value="Once a week">Once a Week</option>
                <option value="Twice a week">Twice a Week</option>
                <option value="Once a Month">Once a Month</option>
                <option value="Twice a Month">Twice a Month</option>
            </select>

            <br />
            <label htmlFor="created_at">Start Date:</label>
            <br />
            <input type="date" id="created_at" name="created_at" required onChange={(e) => setCreatedAt(e.target.value)} value={created_at}/>

            <br />
            <button type="submit" value="Submit">Submit</button>
        </form>

        <Summary expenses={expenses}/>

        </>
    )

}

export default Home