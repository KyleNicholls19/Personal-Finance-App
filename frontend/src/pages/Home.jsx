import {useState, useEffect} from 'react'
import api from '../api'

function Home() {
    const [notes, setNotes] = useState([])
    const [content,setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/").then((res) => res.data).then((data) => setNotes(data)).catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Deleted!")
            else alert("Failed to delete!")
        }).catch((err) => alert(err))
        getNotes()
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content,title}).then((res) => {
            if (res.status === 201) alert("Created!")
            else alert("Failed")
        }).catch((err) => alert(err))
        getNotes()
    }

    return (
        <>
        <div>
            <h2>Notes</h2>
        </div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title}/>
        </form>
        </>
    )

}

export default Home