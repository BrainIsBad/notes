import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import NotesList from "../components/NotesList";
import Modal from "../components/Modal";
import {useModal} from "../context/ModalContext";

export default function NotesPages() {
    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [page, setPage] = useState(1)
    const [isOver, setIsOver] = useState(false)
    const {toggle, visible} = useModal()

    const deleteHandler = e => {
        const id = e.target.value

        axios.delete(`/api/notes/${id}`).then(response => {
            if (response.data.success) {
                getNotes()
            }
        }).catch(e => {console.log(e.message)})
    }

    const getNotes = useCallback(() => {
        setLoading(true)
        axios.get(`/api/notes/${page}`).then(response => {
            setNotes(response.data.notes)
            setIsOver(response.data.isOver)
            setLoading(false)
        }).catch(e => {
            console.log(e.message)
        })
    }, [page])

    useEffect(() => {
        getNotes()
    }, [visible, page])

    return (
        <>
            <div className="btn-container">
                <button className="btn btn-primary" onClick={toggle}>Create note</button>
            </div>
            {(loading && <Loader/>) || <NotesList notes={notes} deleteHandler={deleteHandler}/>}
            <div className="pagination">
                <button disabled={(page === 1) || loading} onClick={() => setPage(prev => (prev - 1) > 0? prev - 1 : 1)} className={'btn btn-sm btn-primary'}>Prev</button>
                <button disabled={isOver || loading} onClick={() => setPage(prev => prev + 1)} className={'btn btn-sm btn-primary'}>Next</button>
            </div>
            <Modal/>
        </>
    )
}