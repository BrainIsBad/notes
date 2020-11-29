import React from 'react'
import Note from "./Note";

export default function NotesList({notes, deleteHandler}) {
    if (!notes.length) return (<div className={'loader'}>Notes not found</div>)

    return (
        <ul className={'notes-list'}>
            { notes.map(note => <Note key={note._id} note={note} deleteHandler={deleteHandler} />) }
        </ul>
    )
}