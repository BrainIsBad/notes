import React from 'react'

export default function Note({note, deleteHandler}) {
    return (<li key={note._id} className={'note'}>
        <div className="note-image-wrap">
            {
                (note.image && <img src={`/upload/notes/${note.image}`} className={'note-image'} alt="Note image"/>)
                || <div className={'default-image'}>No image</div>
            }
        </div>
        <div className="note-wrap">
            <div className="note-title">{note.title}</div>
            <div className="note-text">{note.text}</div>
        </div>
        <button className={'btn btn-danger btn-sm'} onClick={deleteHandler} value={note._id}>
            &times;
        </button>
    </li>)
}