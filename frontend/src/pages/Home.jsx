import {useState, useEffect} from 'react'
import api from '../api'
import Chart from '../components/Chart'
import Expense from '../components/Expense'
import Summary from '../components/Summary'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

function Home() {
    const [expenses, setExpenses] = useState([])
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [dates, setDates] = useState([new Date().toISOString().split("T")[0]])

    useEffect(() => {
        getExpenses()
    }, [])

    const getExpenses = () => {
        api.get("/api/expenses/").then((res) => res.data).then((data) => {setExpenses(data); console.log(data)}).catch((err) => alert(err))
    }

    const resetForm = () => {
        setTitle("")
        setAmount(0)
        setDates(new Date().toISOString().split("T")[0])
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
        api.post("/api/expenses/", {amount,title,dates}).then((res) => {
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


            <label htmlFor="created_at">Start Date:</label>
            <br />
            <DatePicker 
            value={dates} 
            multiple 
            onChange={setDates} 
            format="YYYY-MM-DD" 
            plugins={[
            <DatePanel />
            ]}/>

            

            <br />
            <button type="submit" value="Submit">Submit</button>
        </form>

        <Summary expenses={expenses}/>

        </>
    )

}

export default Home